// The single source of truth for all app state, plus persistence.
// Swift: OddForm/Models/AppData.swift
//
// No DOM in here: `createStore` takes its storage and its clock as arguments,
// so the whole thing runs (and is tested) under plain Node.

import { BUILT_IN_EXERCISES, builtInPlans } from './builtin.js';
import { normalizePlan, normalizeSession } from './backup.js';
import { addDays, dayKey, daysBetween, isSameDay, startOfDay, toISO } from './dates.js';
import {
  CATEGORIES, defaultSettings, newBlock, newExercise, newPlanDay, newQuickSession, newSession, newSlot,
} from './models.js';
import { completionPercent, planDayFor, weekNumber } from './planResolver.js';
import { monthsElapsed } from './progression.js';

export const STORAGE_KEY = 'oddform.v1';
export const MAX_QUICK_SESSIONS = 4;

const clone = value => JSON.parse(JSON.stringify(value));

export function createStore({ storage, now = () => new Date() } = {}) {
  const listeners = new Set();

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
    try {
      saved = JSON.parse(storage?.getItem(STORAGE_KEY) ?? 'null');
    } catch {
      saved = null; // unreadable data: start clean rather than crash on launch
    }
    if (!saved) return false;
    state.settings = { ...defaultSettings(), ...saved.settings };
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

    planDayOn(date) {
      const plan = store.activePlan, start = state.settings.activePlanStartDate;
      if (!plan || !start) return null;
      return planDayFor(date, plan, start, now());
    },

    get todayPlanDay() {
      return store.planDayOn(now());
    },

    sessionOn(date) {
      return state.sessions.find(s => isSameDay(s.date, date)) ?? null;
    },

    get todaySession() {
      return store.sessionOn(now());
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
      return store.todaySession?.feelModifiers ?? [];
    },

    /// One status per calendar day from `fromOffset` to `toOffset` days around
    /// today — what the week strip and the timeline draw.
    dailyStatuses(fromOffset = -60, toOffset = 14) {
      const today = startOfDay(now());
      const firstSessionByDay = new Map();
      for (const session of state.sessions) {
        const key = dayKey(session.date);
        if (!firstSessionByDay.has(key)) firstSessionByDay.set(key, session);
      }

      const statuses = [];
      for (let offset = fromOffset; offset <= toOffset; offset++) {
        const date = addDays(today, offset);
        const session = firstSessionByDay.get(dayKey(date)) ?? null;
        const planDay = store.planDayOn(date);
        const isRestOrUnplanned = !planDay || planDay.dayType === 'rest';

        let completion = 0;
        if (session) {
          completion = isRestOrUnplanned
            ? (session.completedAt ? 1 : 0)
            : completionPercent(session, planDay);
        }

        statuses.push({
          key: dayKey(date),
          date,
          sessionLogID: session?.id ?? null,
          completionPercent: completion,
          didBackup: session?.didBackup ?? false,
          // A session logged on a rest day shows as what was actually done.
          dayType: session && isRestOrUnplanned ? session.dayType : (planDay?.dayType ?? 'rest'),
          feelModifiers: session?.feelModifiers ?? [],
        });
      }
      return statuses;
    },

    /// The plan day a session is being logged against. Not always today's:
    /// a session can be a retroactive log of a past day, or a quick session
    /// with its own one-exercise day.
    planDayForSession(session) {
      if (state.activeSessionDay && state.activeSession?.id === session.id) {
        return state.activeSessionDay;
      }
      return store.planDayOn(session.date);
    },

    // MARK: - Plans

    setActivePlan(plan) {
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

    /// Toggles a modifier on today's session log, creating an empty log to
    /// hold it if today has none yet.
    toggleModifier(modifier) {
      const today = startOfDay(now());
      const session = store.sessionOn(today);
      if (session) {
        session.feelModifiers = session.feelModifiers.includes(modifier)
          ? session.feelModifiers.filter(m => m !== modifier)
          : [...session.feelModifiers, modifier];
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

    /// Starts a session for `date`. A past day reuses the session already
    /// logged for it, so logging it twice picks up where you left off.
    /// Today always starts fresh; resuming is `resumeSession`.
    startSession(planDay, date = now(), { quick = false } = {}) {
      const isToday = isSameDay(date, now());
      const existing = isToday ? null : store.sessionOn(date);
      state.activeSessionDay = quick ? planDay : null;
      state.activeSession = existing ? clone(existing) : newSession({
        date: toISO(startOfDay(date)),
        planTemplateID: store.activePlan?.id ?? null,
        planDayTemplateID: planDay?.id ?? null,
        dayType: planDay?.dayType ?? 'strength',
        startedAt: isToday ? toISO(now()) : null,
      });
      commit();
      return state.activeSession;
    },

    /// Starts a quick session: just this one exercise, for `quick.minutes`.
    startQuickSession(quick) {
      const exercise = store.exerciseByID(quick.exerciseID);
      if (!exercise) return null;
      const slot = newSlot({
        exerciseID: exercise.id, targetSets: 1, targetDurationSeconds: quick.minutes * 60,
      });
      const day = newPlanDay({
        dayType: CATEGORIES[exercise.category].dayType,
        blocks: [newBlock({ exercises: [slot] })],
      });
      return store.startSession(day, now(), { quick: true });
    },

    resumeSession(session) {
      state.activeSession = clone(session);
      state.activeSessionDay = null;
      commit();
    },

    cancelSession() {
      state.activeSession = null;
      state.activeSessionDay = null;
      commit();
    },

    completeSession() {
      const session = state.activeSession;
      if (!session) return;
      session.completedAt = isSameDay(session.date, now()) ? toISO(now()) : session.date;
      const index = state.sessions.findIndex(s => s.id === session.id);
      if (index === -1) state.sessions.push(session); else state.sessions[index] = session;
      state.activeSession = null;
      state.activeSessionDay = null;
      commit();
    },

    /// Records one set in the active session (same exercise + set number
    /// replaces the earlier entry).
    logSet(setLog) {
      const session = state.activeSession;
      if (!session) return;
      const index = session.sets.findIndex(
        s => s.exerciseID === setLog.exerciseID && s.setNumber === setLog.setNumber,
      );
      if (index === -1) session.sets.push(setLog);
      else session.sets[index] = { ...setLog, id: session.sets[index].id };
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
      state.settings = backup.settings;
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
    // The web app is the design prototype, so it starts with Pro unlocked.
    // Settings has a switch for looking at the free tier.
    state.settings.isPro = true;
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
