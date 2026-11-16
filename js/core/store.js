// The single source of truth for all app state, plus persistence.
// Swift: OddForm/Models/AppData.swift
//
// No DOM in here: `createStore` takes its storage and its clock as arguments,
// so the whole thing runs (and is tested) under plain Node.

import { BUILT_IN_EXERCISES, builtInPlans } from './builtin.js';
import { normalizePlan, normalizeSession } from './backup.js';
import { addDays, dayKey, daysBetween, isSameDay, startOfDay, toISO } from './dates.js';
import {
  CATEGORIES, DAY_TYPES, defaultSettings, newBlock, newExercise, newPlanDay, newQuickSession, newSession,
  newSlot, slotsOf,
} from './models.js';
import { completionPercent, planDayFor, plannedSetCount, programProgress, weekNumber } from './planResolver.js';
import { monthsElapsed } from './progression.js';

export const STORAGE_KEY = 'oddform.v1';
/// Where stored data that could not be read is kept, untouched.
export const UNREADABLE_KEY = 'oddform.v1.unreadable';
export const MAX_QUICK_SESSIONS = 4;

const clone = value => JSON.parse(JSON.stringify(value));

/// A quick session is not the day's planned workout: it has no plan day.
export const isQuickSession = session => session.planDayTemplateID == null;

/// A log that exists only to hold the day's feel modifiers.
const isEmptyHolder = session => !session.completedAt && session.sets.length === 0;

/// A plan day rebuilt from what a session logged: one slot per exercise,
/// with a field for every kind of number that was entered.
function dayFromLog(session) {
  const slots = new Map();
  for (const set of session.sets) {
    const slot = slots.get(set.exerciseID)
      ?? newSlot({ exerciseID: set.exerciseID, targetSets: 0 });
    slot.targetSets = Math.max(slot.targetSets, set.setNumber);
    if (set.repsCompleted != null) slot.targetReps ??= set.repsCompleted;
    if (set.weightKg != null) slot.targetWeightKg ??= set.weightKg;
    if (set.durationSeconds != null && slot.targetDurationSeconds == null) {
      slot.targetDurationSeconds = set.durationSeconds;
      // Whole minutes read as minutes: a "5 min" quick session, not "300 sec".
      if (set.durationSeconds >= 120 && set.durationSeconds % 60 === 0) slot.unit2 = 'Min';
    }
    slots.set(set.exerciseID, slot);
  }
  return newPlanDay({ dayType: session.dayType, blocks: [newBlock({ exercises: [...slots.values()] })] });
}

export function createStore({ storage, now = () => new Date() } = {}) {
  const listeners = new Set();

  /// "Full Body A", "Cardio" — or the exercise's name for a quick session.
  function sessionTitle(session, planDay) {
    if (isQuickSession(session)) {
      const first = slotsOf(planDay)[0];
      return state.exercises.find(e => e.id === first?.exerciseID)?.name ?? 'Quick session';
    }
    return planDay?.blocks[0]?.blockName || DAY_TYPES[planDay?.dayType ?? session.dayType].name;
  }

  const state = {
    settings: defaultSettings(),
    exercises: [...BUILT_IN_EXERCISES],
    plans: [],
    sessions: [],
    quickSessions: [],
    /// The session being logged right now — a working copy, written into
    /// `sessions` only when it is finished.
    activeSession: null,
    /// For a quick session: the one-exercise "day" it was started with.
    activeSessionDay: null,
  };

  // MARK: - Persistence

  function load() {
    let saved = null;
    const raw = storage?.getItem(STORAGE_KEY) ?? null;
    try {
      saved = JSON.parse(raw ?? 'null');
    } catch {
      // Unreadable data: start clean rather than crash on launch — but the
      // next save writes over it, so put the original aside first.
      saved = null;
      try { storage.setItem(UNREADABLE_KEY, raw); } catch { /* nothing more to do */ }
    }
    if (!saved) return false;
    // The web app has no paid tier; `isPro` only exists so the settings
    // match the iOS struct field for field.
    state.settings = { ...defaultSettings(), ...saved.settings, isPro: false };
    // Built-ins always come from the app itself; only custom exercises are stored.
    state.exercises = [...BUILT_IN_EXERCISES, ...(saved.customExercises ?? []).map(e => newExercise(e))];
    state.plans = (saved.plans ?? []).map(normalizePlan);
    state.sessions = (saved.sessions ?? []).map(normalizeSession);
    state.quickSessions = (saved.quickSessions ?? []).map(q => newQuickSession(q));
    state.activeSession = saved.activeSession ? normalizeSession(saved.activeSession) : null;
    state.activeSessionDay = saved.activeSessionDay ?? null;
    return true;
  }

  function persist() {
    try {
      storage?.setItem(STORAGE_KEY, JSON.stringify({
        settings: state.settings,
        customExercises: state.exercises.filter(e => e.isCustom),
        plans: state.plans,
        sessions: state.sessions,
        quickSessions: state.quickSessions,
        activeSession: state.activeSession,
        activeSessionDay: state.activeSessionDay,
      }));
      store.saveError = null;
    } catch (error) {
      store.saveError = error;
    }
  }

  /// Save, then tell the UI to redraw.
  function commit() {
    persist();
    listeners.forEach(listener => listener());
  }

  const store = {
    state,
    saveError: null,

    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },

    // MARK: - Derived

    get activePlan() {
      return state.plans.find(p => p.id === state.settings.activePlanID) ?? null;
    },

    /// The plan day for `date` under the active plan — also for dates before
    /// the plan was started (a weekly cycle has an answer for any weekday).
    planDayOn(date) {
      const plan = store.activePlan, start = state.settings.activePlanStartDate;
      if (!plan || !start) return null;
      return planDayFor(date, plan, start);
    },

    get todayPlanDay() {
      return store.planDayOn(now());
    },

    /// Where a finite program stands today, or null for a weekly cycle.
    get programProgress() {
      const plan = store.activePlan, start = state.settings.activePlanStartDate;
      return plan && start ? programProgress(plan, start, now()) : null;
    },

    hasExercise(id) {
      return state.exercises.some(e => e.id === id);
    },

    /// Every log for `date`, the planned workout first.
    sessionsOn(date) {
      return state.sessions
        .filter(s => isSameDay(s.date, date))
        .sort((a, b) => Number(isQuickSession(a)) - Number(isQuickSession(b)));
    },

    /// The log of the day's planned workout (finished or not), if there is one.
    planSessionOn(date) {
      return state.sessions.find(s => isSameDay(s.date, date) && !isQuickSession(s)) ?? null;
    },

    /// Today's planned workout, once it has been finished.
    get todaySession() {
      const session = store.planSessionOn(now());
      return session?.completedAt ? session : null;
    },

    get currentWeekNumber() {
      const start = state.settings.activePlanStartDate;
      return start ? weekNumber(now(), start) : 1;
    },

    get daysSinceLastBackup() {
      const last = state.settings.lastBackupDate;
      return last ? daysBetween(last, now()) : null;
    },

    get todayModifiers() {
      return [...new Set(store.sessionsOn(now()).flatMap(s => s.feelModifiers))];
    },

    /// How many days back there is anything to show: the plan's start or the
    /// oldest log, whichever is earlier. The timeline does not invent
    /// history before that.
    get historyDays() {
      const dates = state.sessions.map(s => s.date);
      if (state.settings.activePlanStartDate) dates.push(state.settings.activePlanStartDate);
      return Math.max(0, ...dates.map(d => daysBetween(d, now())));
    },

    /// One status per calendar day from `fromOffset` to `toOffset` days around
    /// today — what the week strip and the timeline draw.
    ///
    /// A day shows what was done on it. The active plan only speaks for days
    /// from its own start date on: switching plans does not rewrite the past.
    dailyStatuses(fromOffset = -30, toOffset = 14) {
      const today = startOfDay(now());
      const start = state.settings.activePlanStartDate ? startOfDay(state.settings.activePlanStartDate) : null;
      const sessionsByDay = new Map();
      for (const session of state.sessions) {
        const key = dayKey(session.date);
        if (!sessionsByDay.has(key)) sessionsByDay.set(key, []);
        sessionsByDay.get(key).push(session);
      }

      const statuses = [];
      for (let offset = fromOffset; offset <= toOffset; offset++) {
        const date = addDays(today, offset);
        const logs = sessionsByDay.get(dayKey(date)) ?? [];
        const planLog = logs.find(s => !isQuickSession(s) && s.completedAt) ?? null;
        const quickLog = logs.find(s => isQuickSession(s) && s.completedAt) ?? null;

        const beforePlan = !start || date < start;
        const planDay = beforePlan ? null : store.planDayOn(date);
        const isPlanned = planDay != null && planDay.dayType !== 'rest';

        let completion = 0;
        let dayType = planDay?.dayType ?? 'rest';
        if (planLog) {
          completion = completionPercent(planLog, isPlanned ? planDay : null, store.hasExercise);
          dayType = planLog.dayType;
        } else if (quickLog && !isPlanned) {
          // Nothing was planned, but something was done: show that.
          completion = 1;
          dayType = quickLog.dayType;
        }

        statuses.push({
          key: dayKey(date),
          date,
          sessionLogID: (planLog ?? quickLog)?.id ?? null,
          hasLog: planLog != null || quickLog != null,
          completionPercent: completion,
          didBackup: logs.some(s => s.didBackup),
          dayType,
          /// No plan covered this day and nothing was logged on it.
          isBlank: beforePlan && !planLog && !quickLog,
          feelModifiers: [...new Set(logs.flatMap(s => s.feelModifiers))],
        });
      }
      return statuses;
    },

    /// The plan day a session is logged against. Not always today's plan:
    /// a session can be a retroactive log of a past day, a quick session
    /// with its own one-exercise day, or an old log from a plan that has
    /// since been edited or replaced — that one is rebuilt from what was
    /// logged, so editing it shows what was actually done.
    planDayForSession(session) {
      if (state.activeSessionDay && state.activeSession?.id === session.id) {
        return state.activeSessionDay;
      }
      if (isQuickSession(session)) return dayFromLog(session);
      const planDay = store.planDayOn(session.date);
      if (planDay?.id === session.planDayTemplateID || session.sets.length === 0) return planDay;
      return dayFromLog(session);
    },

    /// The most recent finished session, other than `exceptSessionID`, in
    /// which `exerciseID` has completed sets: { date, sets } or null.
    lastPerformance(exerciseID, exceptSessionID = null) {
      const candidates = state.sessions
        .filter(s => s.completedAt && s.id !== exceptSessionID)
        .sort((a, b) => new Date(b.date) - new Date(a.date));
      for (const session of candidates) {
        const sets = session.sets.filter(s => s.exerciseID === exerciseID && s.isCompleted);
        if (sets.length) return { date: session.date, sets };
      }
      return null;
    },

    // MARK: - Plans

    /// Makes `plan` the active one, starting today. Choosing the plan that
    /// is already active changes nothing — its start date, and with it the
    /// week count and the progression, stay put. `restart` starts it over.
    setActivePlan(plan, { restart = false } = {}) {
      const alreadyActive = state.settings.activePlanID === plan.id && state.settings.activePlanStartDate;
      if (alreadyActive && !restart) return;
      state.settings.activePlanID = plan.id;
      state.settings.activePlanStartDate = toISO(startOfDay(now()));
      commit();
    },

    addPlan(plan) {
      state.plans.push(plan);
      commit();
    },

    updatePlan(plan) {
      const index = state.plans.findIndex(p => p.id === plan.id);
      if (index === -1) return;
      state.plans[index] = plan;
      commit();
    },

    deletePlan(planID) {
      if (state.settings.activePlanID === planID) {
        state.settings.activePlanID = null;
        state.settings.activePlanStartDate = null;
      }
      state.plans = state.plans.filter(p => p.id !== planID);
      commit();
    },

    /// Skip (or un-skip) this month's increase for the active plan.
    toggleProgressionPauseThisMonth() {
      const plan = store.activePlan, start = state.settings.activePlanStartDate;
      if (!plan || !start || !plan.progressionEnabled) return;
      const month = monthsElapsed(start, now());
      if (plan.progressionLastPausedMonth === month) {
        plan.progressionPauseCount = Math.max(0, plan.progressionPauseCount - 1);
        plan.progressionLastPausedMonth = null;
      } else {
        plan.progressionPauseCount += 1;
        plan.progressionLastPausedMonth = month;
      }
      commit();
    },

    // MARK: - Exercises

    addCustomExercise(exercise) {
      state.exercises.push(exercise);
      commit();
    },

    updateExercise(exercise) {
      const index = state.exercises.findIndex(e => e.id === exercise.id);
      if (index === -1) return;
      state.exercises[index] = exercise;
      commit();
    },

    deleteCustomExercise(exercise) {
      if (!exercise.isCustom) return;
      state.exercises = state.exercises.filter(e => e.id !== exercise.id);
      commit();
    },

    exerciseByID(id) {
      return state.exercises.find(e => e.id === id) ?? null;
    },

    // MARK: - Quick sessions

    addQuickSession(quick) {
      if (state.quickSessions.length >= MAX_QUICK_SESSIONS) return;
      state.quickSessions.push(quick);
      commit();
    },

    removeQuickSession(quick) {
      state.quickSessions = state.quickSessions.filter(q => q.id !== quick.id);
      commit();
    },

    // MARK: - Feel modifiers

    /// Toggles a modifier for today. It is kept on today's log; when there is
    /// none yet, an empty log is created just to hold it (and removed again
    /// when its last modifier is switched off).
    toggleModifier(modifier) {
      const today = startOfDay(now());
      const logs = store.sessionsOn(today);
      if (store.todayModifiers.includes(modifier)) {
        // Switch it off wherever it sits, and drop a log left with nothing in it.
        for (const log of logs) log.feelModifiers = log.feelModifiers.filter(m => m !== modifier);
        const emptied = new Set(logs.filter(l => isEmptyHolder(l) && l.feelModifiers.length === 0).map(l => l.id));
        state.sessions = state.sessions.filter(s => !emptied.has(s.id));
      } else if (logs[0]) {
        logs[0].feelModifiers = [...logs[0].feelModifiers, modifier];
      } else {
        const planDay = store.todayPlanDay;
        state.sessions.push(newSession({
          date: toISO(today),
          planTemplateID: store.activePlan?.id ?? null,
          planDayTemplateID: planDay?.id ?? null,
          dayType: planDay?.dayType ?? 'rest',
          feelModifiers: [modifier],
        }));
      }
      commit();
    },

    // MARK: - Session actions

    /// Opens the planned workout for `date`. There is one such log per day:
    /// if the day already has one — finished, or just holding feel
    /// modifiers — it is reopened instead of starting a second.
    startSession(planDay, date = now()) {
      const isToday = isSameDay(date, now());
      const existing = store.planSessionOn(date);
      state.activeSessionDay = null;
      if (existing) {
        const session = clone(existing);
        if (!existing.completedAt) {
          // A log that so far only held feel modifiers becomes this plan
          // day's session, whatever the plan was when it was made.
          if (planDay) {
            session.planTemplateID = store.activePlan?.id ?? null;
            session.planDayTemplateID = planDay.id;
            session.dayType = planDay.dayType;
          }
          if (isToday && !existing.startedAt) session.startedAt = toISO(now());
        }
        state.activeSession = session;
      } else {
        state.activeSession = newSession({
          date: toISO(startOfDay(date)),
          planTemplateID: store.activePlan?.id ?? null,
          planDayTemplateID: planDay?.id ?? null,
          dayType: planDay?.dayType ?? 'strength',
          startedAt: isToday ? toISO(now()) : null,
        });
      }
      commit();
      return state.activeSession;
    },

    /// Starts a quick session: just this one exercise, for `quick.minutes`.
    /// It is its own log, separate from the day's planned workout.
    startQuickSession(quick) {
      const exercise = store.exerciseByID(quick.exerciseID);
      if (!exercise) return null;
      const dayType = CATEGORIES[exercise.category].dayType;
      state.activeSessionDay = newPlanDay({
        dayType,
        blocks: [newBlock({ exercises: [newSlot({
          exerciseID: exercise.id, targetSets: 1, targetDurationSeconds: quick.minutes * 60, unit2: 'Min',
        })] })],
      });
      state.activeSession = newSession({
        date: toISO(startOfDay(now())),
        dayType,
        startedAt: toISO(now()),
      });
      commit();
      return state.activeSession;
    },

    /// Reopens a saved session to correct it.
    resumeSession(session) {
      state.activeSession = clone(session);
      state.activeSessionDay = null;
      // A quick session, or a log from a plan that has since changed, is
      // shown as a day rebuilt from what was logged. Build it once and keep
      // it: rebuilding on every redraw would give its rows new identities
      // each time, dropping the keyboard after every keystroke.
      const day = store.planDayForSession(state.activeSession);
      if (isQuickSession(session) || day?.id !== session.planDayTemplateID) state.activeSessionDay = day;
      commit();
    },

    /// Whether closing the active session now would lose something.
    get activeSessionHasChanges() {
      const session = state.activeSession;
      if (!session) return false;
      const saved = state.sessions.find(s => s.id === session.id);
      return saved ? JSON.stringify(saved.sets) !== JSON.stringify(session.sets) : session.sets.length > 0;
    },

    cancelSession() {
      state.activeSession = null;
      state.activeSessionDay = null;
      commit();
    },

    completeSession() {
      const session = state.activeSession;
      if (!session) return;
      const planDay = store.planDayForSession(session);
      const isOwnDay = isQuickSession(session) || planDay?.id === session.planDayTemplateID;

      // Editing a finished session keeps the time it was first finished.
      session.completedAt ??= isSameDay(session.date, now()) ? toISO(now()) : (session.startedAt ?? session.date);
      // Snapshot what the plan asked for, so later plan edits leave this log alone.
      if (isOwnDay || session.plannedSets == null) {
        session.plannedSets = plannedSetCount(planDay, store.hasExercise);
        session.title = sessionTitle(session, planDay);
      }

      const index = state.sessions.findIndex(s => s.id === session.id);
      if (index === -1) state.sessions.push(session); else state.sessions[index] = session;
      state.activeSession = null;
      state.activeSessionDay = null;
      commit();
    },

    deleteSession(sessionID) {
      state.sessions = state.sessions.filter(s => s.id !== sessionID);
      commit();
    },

    /// Records one set in the active session (same exercise + set number
    /// replaces the earlier entry). A set with nothing in it — not done, no
    /// numbers — is not kept.
    logSet(setLog) {
      const session = state.activeSession;
      if (!session) return;
      const index = session.sets.findIndex(
        s => s.exerciseID === setLog.exerciseID && s.setNumber === setLog.setNumber,
      );
      const isEmpty = !setLog.isCompleted
        && setLog.repsCompleted == null && setLog.weightKg == null && setLog.durationSeconds == null;
      if (isEmpty) {
        if (index !== -1) session.sets.splice(index, 1);
      } else if (index === -1) {
        session.sets.push(setLog);
      } else {
        session.sets[index] = { ...setLog, id: session.sets[index].id };
      }
      commit();
    },

    // MARK: - Settings and backup

    updateSettings(patch) {
      Object.assign(state.settings, patch);
      commit();
    },

    markBackedUp() {
      store.updateSettings({ lastBackupDate: toISO(now()) });
    },

    /// Replaces everything on this device with the contents of a backup.
    applyBackup(backup) {
      state.exercises = [...BUILT_IN_EXERCISES, ...backup.exercises.filter(e => e.isCustom)];
      state.plans = backup.plans;
      state.sessions = backup.sessions;
      state.settings = { ...backup.settings, isPro: false };
      if (backup.quickSessions) state.quickSessions = backup.quickSessions;
      state.activeSession = null;
      state.activeSessionDay = null;
      commit();
    },
  };

  // MARK: - Init

  const hadSavedState = load();

  if (!hadSavedState) {
    // First launch: save the built-in plans straight away so their IDs stay
    // stable from now on, and seed the default quick sessions.
    state.plans = builtInPlans();
    for (const [name, minutes] of [['Squat', 5], ['Plank', 3], ['Hip Flexor Stretch', 10]]) {
      const exercise = state.exercises.find(e => e.name === name);
      if (exercise) state.quickSessions.push(newQuickSession({ exerciseID: exercise.id, minutes }));
    }
  }
  if (!state.settings.activePlanID && state.plans[0]) {
    state.settings.activePlanID = state.plans[0].id;
    state.settings.activePlanStartDate = toISO(startOfDay(now()));
  }
  persist();

  return store;
}
