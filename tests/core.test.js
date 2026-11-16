// Run with: npm test   (plain Node, no dependencies)
import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { test } from 'node:test';

import { BackupError, makeBackup, parseBackup, serializeBackup } from '../js/core/backup.js';
import { BUILT_IN_EXERCISES, ICON_MAP, builtInPlans } from '../js/core/builtin.js';
import { daysBetween, isoWeekday, monthsBetween, startOfWeek, toISO } from '../js/core/dates.js';
import {
  CATEGORIES, EQUIPMENT, MUSCLE_GROUPS, newPlan, newPlanDay, newBlock, newSlot, newSetLog, slotsOf,
} from '../js/core/models.js';
import { daysPerWeek, recommendPlans } from '../js/core/recommend.js';
import { completionPercent, planDayFor, plannedSetCount, programProgress, weekNumber } from '../js/core/planResolver.js';
import { adjustedSlot, effectiveMonths, metricKind, targetValueAt } from '../js/core/progression.js';
import {
  changeSinceFirst, chartableExercises, deltaVsTarget, overallSeries, seriesFor, trackableExercises,
} from '../js/core/progressStats.js';
import { CONTENT_VERSION, STORAGE_KEY, UNREADABLE_KEY, createStore, isQuickSession } from '../js/core/store.js';
import {
  defaultQuickTarget, defaultTargets, estimatedMinutes, formatWeight, intervalSteps, isInvalid, parseDecimal,
  parseWhole, quickTargetLabel, secondsToUnit, setCount, timeUnit, tracksCount, tracksWeight, unitToSeconds,
  weightToKg,
} from '../js/core/units.js';

const local = (y, m, d, h = 12) => new Date(y, m - 1, d, h);
const named = name => BUILT_IN_EXERCISES.find(e => e.name === name);
const squat = named('Squat');
const PLAN_COUNT = builtInPlans().length;

function memoryStorage(initial = {}) {
  const data = { ...initial };
  return { getItem: k => data[k] ?? null, setItem: (k, v) => { data[k] = String(v); }, data };
}

/// A store whose clock the test controls.
function storeAt(date, storage = memoryStorage()) {
  const clock = { now: date };
  const store = createStore({ storage, now: () => clock.now });
  return { store, clock, storage };
}

// MARK: - Dates

test('months are counted like Calendar.dateComponents([.month])', () => {
  assert.equal(monthsBetween(local(2026, 1, 15), local(2026, 2, 14)), 0);
  assert.equal(monthsBetween(local(2026, 1, 15), local(2026, 2, 15)), 1);
  assert.equal(monthsBetween(local(2026, 1, 31), local(2026, 2, 28)), 1); // clamped month end
  assert.equal(monthsBetween(local(2025, 11, 15), local(2026, 11, 15)), 12);
  assert.equal(monthsBetween(local(2026, 5, 1), local(2026, 4, 1)), 0);   // never negative
});

test('days are calendar days, across a DST change too', () => {
  assert.equal(daysBetween(local(2026, 3, 28, 23), local(2026, 3, 30, 1)), 2);
  assert.equal(daysBetween(local(2026, 11, 15), local(2026, 11, 10)), -5);
});

test('weeks start on Monday', () => {
  assert.equal(isoWeekday(local(2026, 11, 15)), 7);                 // a Sunday
  assert.equal(startOfWeek(local(2026, 11, 15)).getDate(), 9);      // Monday 9 Nov
  assert.equal(startOfWeek(local(2026, 11, 9)).getDate(), 9);
});

test('ISO dates carry no milliseconds (Swift .iso8601 rejects them)', () => {
  assert.match(toISO(new Date(1_800_000_000_123)), /^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\dZ$/);
});

// MARK: - Built-in content

test('built-in content is complete and consistent', () => {
  const count = BUILT_IN_EXERCISES.length;
  assert.ok(count >= 250, `${count} exercises`);
  assert.equal(new Set(BUILT_IN_EXERCISES.map(e => e.id)).size, count);
  assert.equal(new Set(BUILT_IN_EXERCISES.map(e => e.name.toLowerCase())).size, count);
  // The ids of the original exercises are shared with the iOS app and never change.
  assert.equal(squat.id, '4F1E3A0E-B38C-5DA8-BA5A-068F76754CCF');

  for (const e of BUILT_IN_EXERCISES) {
    assert.ok(CATEGORIES[e.category], `${e.name}: category ${e.category}`);
    assert.ok(EQUIPMENT[e.equipment], `${e.name}: equipment ${e.equipment}`);
    assert.ok(e.muscleGroups.length > 0 && e.muscleGroups.every(m => MUSCLE_GROUPS[m]), `${e.name}: muscle groups`);
    assert.ok(['reps', 'time', 'distance'].includes(e.tracking), `${e.name}: tracking`);
    assert.ok([1, 2, 3].includes(e.level) && ['free', 'pro'].includes(e.tier), `${e.name}: level/tier`);
    assert.ok(e.instructions.length >= 3 && e.tips.length >= 2, `${e.name}: instructions and tips`);
  }
  // Every category has a library worth browsing.
  for (const id of Object.keys(CATEGORIES)) {
    assert.ok(BUILT_IN_EXERCISES.filter(e => e.category === id).length >= 15, `too few in ${id}`);
  }

  // An exercise has a drawing of its own or none at all, and every drawing
  // that is mapped is on disk. (Not all are drawn yet: tools/make-icons.py.)
  assert.equal(new Set(Object.values(ICON_MAP)).size, Object.keys(ICON_MAP).length);
  assert.ok(Object.keys(ICON_MAP).length >= 140);
  for (const name of ['Squat', 'Push-up', 'Plank', 'Running', 'Burpee', 'Downward-Facing Dog']) {
    assert.ok(ICON_MAP[name], `no pictogram for ${name}`);
  }
  for (const [name, icon] of Object.entries(ICON_MAP)) {
    assert.ok(named(name), `icon mapped for unknown exercise ${name}`);
    assert.ok(existsSync(new URL(`../img/exercises/${icon}.png`, import.meta.url)), `missing ${icon}.png`);
  }
  const [home, beginner, mobility] = builtInPlans();
  assert.equal(home.days.length, 7);
  assert.equal(beginner.days.length, 28);
  assert.equal(beginner.days.filter(d => d.dayType !== 'rest').length, 12);
  assert.equal(mobility.days.filter(d => d.dayType !== 'rest').length, 2);
  for (const plan of [home, beginner, mobility]) {
    for (const slot of plan.days.flatMap(d => d.blocks).flatMap(b => b.exercises)) {
      assert.ok(BUILT_IN_EXERCISES.some(e => e.id === slot.exerciseID));
    }
  }
  // "Home" means no bar, bench or pull-up bar.
  const homeNames = home.days.flatMap(d => d.blocks).flatMap(b => b.exercises)
    .map(slot => BUILT_IN_EXERCISES.find(e => e.id === slot.exerciseID).name);
  for (const gym of ['Bench Press', 'Deadlift', 'Pull-up']) assert.ok(!homeNames.includes(gym));

  // Every template: seven days for a weekly plan, each slot a known exercise
  // with something to do, and a plan marked "no equipment" needing none.
  const plans = builtInPlans();
  assert.ok(plans.length >= 15);
  assert.equal(new Set(plans.map(p => p.name)).size, plans.length);
  for (const plan of plans) {
    assert.ok(plan.summary && plan.focus && [1, 2, 3].includes(plan.level), `${plan.name}: description`);
    if (plan.planMode === 'weeklyCycle') assert.equal(plan.days.length, 7, plan.name);
    for (const slot of plan.days.flatMap(slotsOf)) {
      const exercise = BUILT_IN_EXERCISES.find(e => e.id === slot.exerciseID);
      assert.ok(exercise, `${plan.name}: unknown exercise`);
      assert.ok(slot.targetReps != null || slot.targetDurationSeconds != null, `${plan.name}: ${exercise.name} has no target`);
      if (plan.equipment === 'none') {
        assert.ok(['none', 'mat', 'wall'].includes(exercise.equipment), `${plan.name}: ${exercise.name} needs ${exercise.equipment}`);
      }
    }
  }
});

// MARK: - Plan resolver

test('a weekly cycle resolves by weekday', () => {
  const [home] = builtInPlans();
  const start = local(2026, 11, 2);
  assert.equal(planDayFor(local(2026, 11, 16), home, start).blocks[0].blockName, 'Full Body A'); // Mon
  assert.equal(planDayFor(local(2026, 11, 18), home, start).dayType, 'cardio');                  // Wed
  assert.equal(planDayFor(local(2026, 11, 15), home, start).dayType, 'rest');                    // Sun
});

test('a finite program resolves by day offset and ends', () => {
  const beginner = builtInPlans()[1];
  const start = local(2026, 11, 10);
  assert.equal(planDayFor(local(2026, 11, 10), beginner, start).blocks[0].blockName, 'Week 1 · Workout A');
  assert.equal(planDayFor(local(2026, 11, 26), beginner, start).blocks[0].blockName, 'Week 3 · Workout B');
  assert.equal(planDayFor(local(2026, 11, 9), beginner, start), null);    // before the start
  assert.equal(planDayFor(local(2026, 12, 8), beginner, start), null);    // day 28: over
  assert.equal(weekNumber(local(2026, 11, 26), start), 3);
  assert.equal(weekNumber(local(2026, 11, 1), start), 1);
});

test('completion is completed sets over planned sets', () => {
  const day = builtInPlans()[0].days[0]; // 3 exercises x 3 sets
  const sets = n => Array.from({ length: n }, (_, i) => newSetLog({ exerciseID: squat.id, setNumber: i + 1, isCompleted: true }));
  assert.equal(completionPercent({ sets: sets(3) }, day), 3 / 9);
  assert.equal(completionPercent({ sets: sets(12) }, day), 1);
  assert.equal(completionPercent({ sets: sets(3) }, newPlanDay({})), 0);

  // A finished session carries what was planned that day; the plan as it is
  // now no longer matters.
  assert.equal(completionPercent({ sets: sets(3), plannedSets: 6 }, day), 0.5);
  // With nothing planned, having trained at all is the whole of it.
  assert.equal(completionPercent({ sets: [], completedAt: 'x' }, null), 1);
  // A slot whose exercise was deleted does not count against the day.
  assert.equal(plannedSetCount(day, id => id !== squat.id), 6);
  // A slot without sets (a run) is one thing to tick off.
  assert.equal(plannedSetCount(builtInPlans()[0].days[2]), 1);
});

test('a finite program knows its week and when it is over', () => {
  const beginner = builtInPlans()[1];
  const start = local(2026, 11, 10);
  assert.deepEqual(programProgress(beginner, start, local(2026, 11, 10)), { week: 1, weeks: 4, finished: false });
  assert.deepEqual(programProgress(beginner, start, local(2026, 11, 26)), { week: 3, weeks: 4, finished: false });
  assert.deepEqual(programProgress(beginner, start, local(2026, 12, 8)), { week: 4, weeks: 4, finished: true });
  assert.equal(programProgress(builtInPlans()[0], start, start), null); // a weekly cycle never ends
});

// MARK: - Progression

test('targets climb 2.5% of the original per month, not compounded', () => {
  const plan = newPlan({ progressionEnabled: true });
  const start = local(2026, 1, 10);
  const weighted = newSlot({ exerciseID: squat.id, targetSets: 3, targetReps: 8, targetWeightKg: 100 });
  assert.equal(metricKind(weighted), 'weight');
  assert.equal(adjustedSlot(weighted, plan, start, local(2026, 2, 9)).targetWeightKg, 100);
  assert.equal(adjustedSlot(weighted, plan, start, local(2026, 5, 10)).targetWeightKg, 110);
  assert.equal(adjustedSlot(weighted, plan, start, local(2026, 5, 10)).targetReps, 8); // reps untouched

  const bodyweight = newSlot({ exerciseID: squat.id, targetSets: 3, targetReps: 20 });
  assert.equal(adjustedSlot(bodyweight, plan, start, local(2026, 5, 10)).targetReps, 22);

  const hold = newSlot({ exerciseID: squat.id, targetDurationSeconds: 45 });
  assert.equal(adjustedSlot(hold, plan, start, local(2026, 9, 10)).targetDurationSeconds, 54);

  // Weight moves in half kilos, so one month already shows on a light lift.
  const light = newSlot({ exerciseID: squat.id, targetReps: 8, targetWeightKg: 20 });
  assert.equal(targetValueAt(light, plan, start, local(2026, 2, 10)), 20.5);
  assert.equal(targetValueAt(light, plan, start, local(2026, 3, 10)), 21);
});

test('a plan day carries the target of its own date, not of today', () => {
  const slot = newSlot({ exerciseID: squat.id, targetSets: 3, targetReps: 8, targetWeightKg: 100 });
  const plan = newPlan({ progressionEnabled: true, days: [1, 2, 3, 4, 5, 6, 7].map(dayOfWeek =>
    newPlanDay({ dayOfWeek, dayType: 'strength', blocks: [newBlock({ exercises: [slot] })] })) });
  const start = local(2026, 1, 10);
  const weightOn = date => planDayFor(date, plan, start).blocks[0].exercises[0].targetWeightKg;
  assert.equal(weightOn(local(2026, 1, 20)), 100);
  assert.equal(weightOn(local(2026, 3, 20)), 105);
});

test('progression off or paused holds the target back', () => {
  const start = local(2026, 1, 10), now = local(2026, 5, 10);
  const slot = newSlot({ exerciseID: squat.id, targetReps: 8, targetWeightKg: 100 });
  assert.equal(adjustedSlot(slot, newPlan({}), start, now).targetWeightKg, 100);
  const paused = newPlan({ progressionEnabled: true, progressionPauseCount: 2 });
  assert.equal(effectiveMonths(paused, start, now), 2);
  assert.equal(adjustedSlot(slot, paused, start, now).targetWeightKg, 105);
});

test('the pause toggle skips one month once, and undoes itself', () => {
  const { store, clock } = storeAt(local(2026, 1, 10));
  const plan = store.activePlan;
  plan.progressionEnabled = true;
  clock.now = local(2026, 4, 12);
  store.toggleProgressionPauseThisMonth();
  assert.equal(plan.progressionPauseCount, 1);
  assert.equal(plan.progressionLastPausedMonth, 3);
  store.toggleProgressionPauseThisMonth();
  assert.equal(plan.progressionPauseCount, 0);
  assert.equal(plan.progressionLastPausedMonth, null);
});

// MARK: - Progress stats

test('series chart the best logged value against a rising target', () => {
  const slot = newSlot({ exerciseID: squat.id, targetSets: 3, targetReps: 8, targetWeightKg: 100 });
  const plan = newPlan({ progressionEnabled: true, days: [newPlanDay({ dayOfWeek: 1, dayType: 'strength', blocks: [newBlock({ exercises: [slot] })] })] });
  const start = local(2026, 1, 1);
  const session = (date, weights, completed = true) => ({
    date: toISO(date), completedAt: completed ? toISO(date) : null,
    sets: weights.map((w, i) => newSetLog({ exerciseID: squat.id, setNumber: i + 1, weightKg: w, isCompleted: true })),
  });
  const sessions = [
    session(local(2026, 3, 2), [100, 105, 102]),
    session(local(2026, 1, 5), [95, 100]),
    session(local(2026, 2, 2), [120], false),          // never finished: ignored
    { date: toISO(local(2026, 2, 9)), completedAt: toISO(local(2026, 2, 9)),
      sets: [newSetLog({ exerciseID: squat.id, isCompleted: true })] }, // ticked off, no numbers: ignored
  ];
  const now = local(2026, 4, 1);

  assert.deepEqual(trackableExercises(plan, BUILT_IN_EXERCISES).map(e => e.name), ['Squat']);

  const series = seriesFor(squat, plan, start, sessions, now);
  assert.equal(series.kind, 'weight');
  assert.deepEqual(series.points.map(p => p.actual), [100, 105]); // chronological, best set
  // The chart's target is the target the session showed that day: 100 kg in
  // the first month, 105 after two. Lifting it is never drawn as a miss.
  assert.deepEqual(series.points.map(p => p.target), [100, 105]);
  assert.ok(series.points.every(p => p.actual >= p.target));
  assert.equal(series.currentTarget, 107.5);

  const overall = overallSeries(plan, start, sessions, now);
  assert.deepEqual(overall.points.map(p => Math.round(p.actual)), [100, 105]);
  assert.deepEqual(overall.points.map(p => p.target), [100, 105]);
  assert.ok(deltaVsTarget(overall) < 0); // 105 against today's 107.5

  assert.equal(overallSeries(newPlan({}), start, sessions, now), null);
});

// MARK: - Store

test('first launch seeds plans, an active plan and quick sessions — and they stay stable', () => {
  const { store, storage } = storeAt(local(2026, 11, 15));
  assert.equal(store.state.plans.length, PLAN_COUNT);
  assert.equal(store.activePlan.name, 'Home Maintenance');
  assert.equal(store.state.quickSessions.length, 3);

  const again = createStore({ storage, now: () => local(2026, 11, 16) });
  assert.deepEqual(again.state.plans.map(p => p.id), store.state.plans.map(p => p.id));
  assert.equal(again.state.exercises.length, BUILT_IN_EXERCISES.length);
});

test('a session is logged, finished and shows up in the daily statuses', () => {
  const { store, clock } = storeAt(local(2026, 11, 16, 9)); // Monday: Full Body A
  const day = store.todayPlanDay;
  store.startSession(day);
  assert.equal(store.state.sessions.length, 0); // nothing saved until finished
  assert.equal(store.todaySession, null);

  for (const setNumber of [1, 2, 3]) {
    store.logSet(newSetLog({ exerciseID: squat.id, setNumber, repsCompleted: 8, isCompleted: true }));
  }
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 3, repsCompleted: 6, isCompleted: true }));
  assert.equal(store.state.activeSession.sets.length, 3); // same set number replaces

  clock.now = local(2026, 11, 16, 10);
  store.completeSession();
  assert.equal(store.state.activeSession, null);
  assert.equal(store.todaySession.sets[2].repsCompleted, 6);
  assert.equal(store.todaySession.plannedSets, 9);
  assert.equal(store.todaySession.title, 'Full Body A');

  const today = store.dailyStatuses().find(s => s.key === '2026-11-16');
  assert.equal(today.completionPercent, 3 / 9);
  assert.equal(today.dayType, 'strength');
  assert.equal(today.hasLog, true);
  assert.equal(store.dailyStatuses().length, 45);
});

test('typed numbers are kept without a tick, and an empty set is not', () => {
  const { store } = storeAt(local(2026, 11, 16, 9));
  store.startSession(store.todayPlanDay);
  assert.equal(store.activeSessionHasChanges, false);

  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1, repsCompleted: 8 })); // typed, not ticked
  assert.equal(store.state.activeSession.sets.length, 1);
  assert.equal(store.activeSessionHasChanges, true);

  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1 })); // field cleared again
  assert.equal(store.state.activeSession.sets.length, 0);
  assert.equal(store.activeSessionHasChanges, false);
});

test('a day has one planned workout: starting it again reopens it', () => {
  const { store, clock } = storeAt(local(2026, 11, 16, 9));
  store.startSession(store.todayPlanDay);
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1, repsCompleted: 8, isCompleted: true }));
  clock.now = local(2026, 11, 16, 10);
  store.completeSession();
  const first = store.todaySession;

  clock.now = local(2026, 11, 16, 20);
  store.startSession(store.todayPlanDay); // e.g. from the timeline
  assert.equal(store.state.activeSession.id, first.id);
  assert.equal(store.state.activeSession.sets.length, 1);
  assert.equal(store.activeSessionHasChanges, false);
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 2, repsCompleted: 8, isCompleted: true }));
  store.completeSession();

  assert.equal(store.state.sessions.length, 1);
  assert.equal(store.todaySession.sets.length, 2);
  assert.equal(store.todaySession.completedAt, first.completedAt); // the first finish time stays

  store.deleteSession(first.id);
  assert.equal(store.todaySession, null);
});

test('logging a past day twice reuses the same session', () => {
  const { store } = storeAt(local(2026, 11, 20, 9));
  const monday = local(2026, 11, 16);
  store.startSession(store.planDayOn(monday), monday);
  assert.equal(store.state.activeSession.startedAt, null);
  store.completeSession();
  const first = store.planSessionOn(monday);
  assert.equal(first.completedAt, first.date);

  store.startSession(store.planDayOn(monday), monday);
  assert.equal(store.state.activeSession.id, first.id);
  store.completeSession();
  assert.equal(store.state.sessions.length, 1);
});

test('a quick session is its own log, apart from the planned workout', () => {
  const { store, clock } = storeAt(local(2026, 11, 16, 9)); // Monday has a plan day of its own
  const session = store.startQuickSession({ exerciseID: squat.id, minutes: 5 }); // a timed one
  const day = store.planDayForSession(session);
  assert.equal(day.blocks.length, 1);
  assert.equal(day.blocks[0].exercises[0].exerciseID, squat.id);
  assert.equal(day.blocks[0].exercises[0].targetDurationSeconds, 300);
  assert.equal(session.dayType, 'strength');
  assert.ok(isQuickSession(session));

  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1, durationSeconds: 300, isCompleted: true }));
  store.completeSession();
  assert.equal(store.state.sessions[0].title, 'Squat');
  assert.equal(store.state.sessions[0].plannedSets, 1);

  // The planned workout is still to do, and the quick squat is not its first set.
  assert.equal(store.todaySession, null);
  assert.equal(store.planSessionOn(clock.now), null);
  assert.equal(store.startSession(store.todayPlanDay).sets.length, 0);
  store.cancelSession();
  const monday = store.dailyStatuses().find(s => s.key === '2026-11-16');
  assert.equal(monday.completionPercent, 0);
  assert.equal(monday.hasLog, true);

  // Reopened later, it shows what was logged — not Monday's plan — in minutes.
  store.resumeSession(store.state.sessions[0]);
  const reopened = store.planDayForSession(store.state.activeSession);
  assert.deepEqual(reopened.blocks[0].exercises.map(s => s.exerciseID), [squat.id]);
  assert.equal(timeUnit(reopened.blocks[0].exercises[0]), 'Min');
  // The rebuilt day is the same object on every redraw (its rows keep their
  // identity while typing), and a cleared field does not take its row away.
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1 }));
  const afterTyping = store.planDayForSession(store.state.activeSession);
  assert.equal(afterTyping.blocks[0].exercises[0].id, reopened.blocks[0].exercises[0].id);
  assert.equal(afterTyping.blocks[0].exercises[0].targetDurationSeconds, 300);
  store.cancelSession();

  // On a rest day, a quick session is what the day shows.
  clock.now = local(2026, 11, 17, 9); // Tuesday, rest
  store.startQuickSession(store.state.quickSessions[2]); // Hip Flexor Stretch
  store.completeSession();
  const tuesday = store.dailyStatuses().find(s => s.key === '2026-11-17');
  assert.equal(tuesday.completionPercent, 1);
  assert.equal(tuesday.dayType, 'yogaStretch');
});

test('an active session survives a reload', () => {
  const { store, storage } = storeAt(local(2026, 11, 16, 9));
  store.startSession(store.todayPlanDay);
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1, repsCompleted: 8, isCompleted: true }));
  const reloaded = createStore({ storage, now: () => local(2026, 11, 16, 9) });
  assert.equal(reloaded.state.activeSession.sets.length, 1);
});

test('feel modifiers are held for today without pretending a session was started', () => {
  const { store, clock } = storeAt(local(2026, 11, 16, 9)); // Monday, training day
  store.toggleModifier('sick');
  store.toggleModifier('fasting');
  assert.deepEqual(store.todayModifiers, ['sick', 'fasting']);
  assert.equal(store.todaySession, null); // a mood is not a workout
  assert.equal(store.dailyStatuses().find(s => s.key === '2026-11-16').hasLog, false);

  store.toggleModifier('sick');
  assert.deepEqual(store.todayModifiers, ['fasting']);
  assert.equal(store.state.sessions.length, 1);

  // Starting the workout picks the holder up: one log, modifiers kept, timer started.
  const session = store.startSession(store.todayPlanDay);
  assert.equal(session.id, store.state.sessions[0].id);
  assert.ok(session.startedAt);
  clock.now = local(2026, 11, 16, 10);
  store.completeSession();
  assert.equal(store.state.sessions.length, 1);
  assert.deepEqual(store.todaySession.feelModifiers, ['fasting']);

  // On a day with nothing else, switching the last one off leaves no empty log behind.
  clock.now = local(2026, 11, 17, 9);
  store.toggleModifier('lowEnergy');
  assert.equal(store.state.sessions.length, 2);
  store.toggleModifier('lowEnergy');
  assert.equal(store.state.sessions.length, 1);
});

test('a modifier set before a plan switch still becomes that day\'s session', () => {
  const { store } = storeAt(local(2026, 11, 16, 9)); // Monday
  store.toggleModifier('lowEnergy');                  // held against Home Maintenance's Monday
  store.setActivePlan(store.state.plans[1]);          // Beginner Strength starts today
  const planDay = store.todayPlanDay;
  const session = store.startSession(planDay);
  assert.equal(session.planDayTemplateID, planDay.id);
  assert.equal(session.planTemplateID, store.activePlan.id);
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1, repsCompleted: 5, isCompleted: true }));
  // Still the plan's own day after the first set — not a day rebuilt from the log.
  assert.equal(store.planDayForSession(store.state.activeSession).id, planDay.id);
  store.completeSession();
  assert.deepEqual(store.todaySession.feelModifiers, ['lowEnergy']);

  // A modifier can be switched off whichever of the day's logs holds it.
  store.startQuickSession(store.state.quickSessions[0]);
  store.completeSession();
  store.toggleModifier('lowEnergy');
  assert.deepEqual(store.todayModifiers, []);
});

test('a session finished on a later day does not end before it started', () => {
  const { store, clock } = storeAt(local(2026, 11, 16, 21));
  store.startSession(store.todayPlanDay);
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1, repsCompleted: 10, isCompleted: true }));
  clock.now = local(2026, 11, 17, 7); // the app was left open overnight
  store.completeSession();
  const saved = store.state.sessions[0];
  assert.ok(new Date(saved.completedAt) >= new Date(saved.startedAt));
});

test('choosing the active plan again keeps its start date; restarting resets it', () => {
  const { store, clock } = storeAt(local(2026, 6, 1));
  const plan = store.activePlan;
  const started = store.state.settings.activePlanStartDate;
  clock.now = local(2026, 9, 1);
  store.setActivePlan(plan);
  assert.equal(store.state.settings.activePlanStartDate, started);
  store.setActivePlan(plan, { restart: true });
  assert.notEqual(store.state.settings.activePlanStartDate, started);
});

test('history shows what was done, whatever the plan says now', () => {
  const { store, clock } = storeAt(local(2026, 11, 16, 9)); // Monday, Home Maintenance
  store.startSession(store.todayPlanDay);
  for (const setNumber of [1, 2, 3]) {
    store.logSet(newSetLog({ exerciseID: squat.id, setNumber, repsCompleted: 10, isCompleted: true }));
  }
  store.completeSession();
  const mondayBefore = store.dailyStatuses().find(s => s.key === '2026-11-16');

  // Editing the plan afterwards does not change Monday's result …
  const plan = JSON.parse(JSON.stringify(store.activePlan));
  plan.days[0].blocks[0].exercises.pop();
  store.updatePlan(plan);
  assert.equal(store.dailyStatuses().find(s => s.key === '2026-11-16').completionPercent, mondayBefore.completionPercent);

  // … and neither does switching to another plan two days later.
  clock.now = local(2026, 11, 18, 9);
  store.setActivePlan(store.state.plans[1]); // Beginner Strength, a program starting today
  const statuses = store.dailyStatuses();
  const monday = statuses.find(s => s.key === '2026-11-16');
  assert.equal(monday.dayType, 'strength');
  assert.equal(monday.completionPercent, 3 / 9);
  // Tuesday was before the new plan and has no log: it is blank, not a missed day.
  assert.equal(statuses.find(s => s.key === '2026-11-17').isBlank, true);
  // The timeline reaches back to the oldest log and no further.
  assert.equal(store.historyDays, 2);
});

test('the last performance of an exercise is found for "Last time"', () => {
  const { store, clock } = storeAt(local(2026, 11, 16, 9));
  assert.equal(store.lastPerformance(squat.id), null);
  store.startSession(store.todayPlanDay);
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1, repsCompleted: 10, weightKg: 20, isCompleted: true }));
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 2, repsCompleted: 9 })); // typed, not ticked
  store.completeSession();
  const saved = store.todaySession;

  clock.now = local(2026, 11, 23, 9);
  const next = store.startSession(store.todayPlanDay);
  const last = store.lastPerformance(squat.id, next.id);
  assert.equal(last.sets.length, 1);
  assert.equal(last.sets[0].weightKg, 20);
  assert.equal(store.lastPerformance(squat.id, saved.id), null);
});

test('quick sessions cap at four; deleting the active plan clears it', () => {
  const { store } = storeAt(local(2026, 11, 15));
  store.addQuickSession({ id: 'a', exerciseID: squat.id, minutes: 5 });
  store.addQuickSession({ id: 'b', exerciseID: squat.id, minutes: 5 });
  assert.equal(store.state.quickSessions.length, 4);

  store.deletePlan(store.activePlan.id);
  assert.equal(store.activePlan, null);
  assert.equal(store.todayPlanDay, null);
  assert.equal(store.state.plans.length, PLAN_COUNT - 1);
});

test('corrupt stored data starts clean instead of crashing — and is kept aside', () => {
  const storage = memoryStorage({ [STORAGE_KEY]: '{not json' });
  const store = createStore({ storage, now: () => local(2026, 11, 15) });
  assert.equal(store.state.plans.length, PLAN_COUNT);
  assert.equal(storage.data[UNREADABLE_KEY], '{not json'); // not destroyed by the save that follows
});

// MARK: - Units

test('weight is stored in kilos and shown in the chosen unit', () => {
  assert.equal(formatWeight(20, 'kg'), '20');
  assert.equal(formatWeight(42.5, 'kg'), '42.5');
  assert.equal(formatWeight(weightToKg(45, 'lbs'), 'lbs'), '45');
  assert.ok(Math.abs(weightToKg(45, 'lbs') - 20.41) < 0.01);
});

test('typed numbers: comma decimals, limits, and what counts as invalid', () => {
  assert.equal(parseDecimal('42,5'), 42.5);
  assert.equal(parseDecimal(' 42.5 '), 42.5);
  assert.equal(parseDecimal('-5'), null);
  assert.equal(parseDecimal('abc'), null);
  assert.equal(parseWhole('8'), 8);
  assert.equal(parseWhole('8.5'), null);
  assert.equal(parseWhole('99999'), null); // over the limit
  assert.equal(isInvalid('', null), false);  // empty is simply empty
  assert.equal(isInvalid('abc', null), true);
});

test('time reads in the unit that suits it', () => {
  assert.equal(timeUnit(newSlot({ targetDurationSeconds: 45 })), 'Sek');
  assert.equal(timeUnit(newSlot({ targetDurationSeconds: 1800 })), 'Min'); // nobody types 1800
  assert.equal(timeUnit(newSlot({ targetDurationSeconds: 90, unit2: 'Min' })), 'Min');
  assert.equal(secondsToUnit(1800, 'Min'), 30);
  assert.equal(unitToSeconds(2.5, 'Min'), 150);
});

test('a slot asks for what makes sense for its exercise', () => {
  const run = newSlot({ exerciseID: named('Running').id, targetDurationSeconds: 1800 });
  const plank = newSlot({ exerciseID: named('Plank').id, targetSets: 3, targetDurationSeconds: 45 });
  const lift = newSlot({ exerciseID: squat.id, targetSets: 3, targetReps: 8 });
  assert.equal(setCount(run), 1);   // one run, not three
  assert.equal(setCount(plank), 3);
  assert.equal(tracksWeight(run, named('Running')), false);
  assert.equal(tracksWeight(plank, named('Plank')), false);
  // Weight is asked for when there is a load: a barbell lift, or a target
  // weight set in the plan. A bodyweight squat or push-up has no kg field.
  assert.equal(tracksWeight(lift, squat), false);
  assert.equal(tracksWeight(lift, named('Back Squat')), true);
  assert.equal(tracksWeight({ ...lift, targetWeightKg: 10 }, squat), true);
  assert.equal(tracksWeight(lift, named('Goblet Squat')), true);
  // Interval work is counted afterwards, so it always offers a reps field.
  assert.equal(tracksCount(newSlot({ targetDurationSeconds: 30 }), named('Burpee')), true);
  assert.equal(tracksCount(plank, named('Plank')), false);

  assert.deepEqual(defaultTargets(named('Running')), { targetDurationSeconds: 1200, unit2: 'Min' });
  assert.deepEqual(defaultTargets(squat), { targetSets: 3, targetReps: 10 });

  const [home] = builtInPlans();
  assert.equal(estimatedMinutes(home.days[2]), 30);           // the 30 minute run
  assert.ok(estimatedMinutes(home.days[0]) <= 20);            // three short exercises
});

// MARK: - Backup

test('a backup round-trips and matches what the iOS decoder requires', () => {
  const { store, clock } = storeAt(local(2026, 11, 16, 9));
  store.startSession(store.todayPlanDay);
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1, repsCompleted: 8, weightKg: 42.5, isCompleted: true }));
  clock.now = local(2026, 11, 16, 10);
  store.completeSession();
  store.toggleModifier('lowEnergy');
  store.addCustomExercise({ ...BUILT_IN_EXERCISES[0], id: 'CUSTOM-1', name: 'Sled push', isCustom: true });

  const text = serializeBackup(makeBackup(store.state, clock.now));
  const file = JSON.parse(text);

  // No nulls and no milliseconds anywhere in the file.
  assert.doesNotMatch(text, /\bnull\b/);
  assert.doesNotMatch(text, /\d\.\d{3}Z"/);
  assert.equal(file.version, 1);

  // Every non-optional property of the Swift structs is present.
  const has = (object, keys) => keys.forEach(k => assert.ok(k in object, `missing ${k}`));
  has(file, ['version', 'exportedAt', 'settings', 'exercises', 'plans', 'sessions']);
  has(file.settings, ['isPro', 'preferredUnit', 'reminderEnabled', 'reminderTime', 'onboardingCompleted']);
  has(file.exercises[0], ['id', 'name', 'category', 'muscleGroups', 'isCustom', 'notes', 'instructions', 'tips']);
  has(file.plans[0], ['id', 'name', 'planMode', 'days', 'isCustom', 'notes', 'progressionEnabled', 'progressionPauseCount']);
  has(file.plans[0].days[0], ['id', 'dayType', 'blocks', 'notes']);
  has(file.plans[0].days[0].blocks[0], ['id', 'blockName', 'exercises']);
  has(file.plans[0].days[0].blocks[0].exercises[0], ['id', 'exerciseID', 'restSeconds', 'notes', 'unit1', 'unit2']);
  has(file.sessions[0], ['id', 'date', 'dayType', 'sets', 'notes', 'didBackup', 'feelModifiers']);
  // The snapshot of the plan travels too (optional on iOS).
  assert.equal(file.sessions[0].plannedSets, 9);
  assert.equal(file.sessions[0].title, 'Full Body A');
  // A backup never switches the paid tier on in the iPhone app.
  assert.equal(file.settings.isPro, false);
  has(file.sessions[0].sets[0], ['id', 'exerciseID', 'setNumber', 'isCompleted', 'notes']);

  // Import into a fresh device.
  const target = storeAt(local(2026, 12, 1)).store;
  target.applyBackup(parseBackup(text));
  assert.equal(target.state.sessions[0].sets[0].weightKg, 42.5);
  assert.deepEqual(target.state.sessions[0].feelModifiers, ['lowEnergy']);
  assert.equal(target.activePlan.id, store.activePlan.id);
  assert.equal(target.state.exercises.length, BUILT_IN_EXERCISES.length + 1);
  assert.equal(target.state.exercises.filter(e => e.name === 'Squat').length, 1); // built-ins not duplicated
});

test('an iOS-style file with missing optionals imports with defaults filled in', () => {
  const backup = parseBackup(JSON.stringify({
    version: 1, exportedAt: '2026-11-01T10:00:00Z',
    settings: { isPro: true, preferredUnit: 'kg', reminderEnabled: false, reminderTime: '2026-01-01T07:00:00Z', onboardingCompleted: false },
    exercises: [],
    plans: [{ id: 'P', name: 'Mine', planMode: 'weeklyCycle', days: [{ id: 'D', dayOfWeek: 1, dayType: 'strength', blocks: [{ id: 'B', blockName: '', exercises: [{ id: 'S', exerciseID: squat.id, targetSets: 3 }] }] }] }],
    sessions: [{ id: 'L', date: '2026-10-30T23:00:00Z', dayType: 'strength', sets: [] }],
  }));
  assert.equal(backup.plans[0].days[0].blocks[0].exercises[0].unit1, 'Reps');
  assert.equal(backup.plans[0].progressionPauseCount, 0);
  assert.deepEqual(backup.sessions[0].feelModifiers, []);
  assert.equal(backup.quickSessions, null); // iOS files have none: keep what the device has
  assert.equal(backup.sessions[0].plannedSets, null);

  const { store } = storeAt(local(2026, 11, 16));
  store.applyBackup(backup);
  assert.equal(store.state.settings.isPro, false); // the web app has no paid tier
});

test('unusable files are refused with a readable reason', () => {
  assert.throws(() => parseBackup('nope'), BackupError);
  assert.throws(() => parseBackup('{"hello":1}'), BackupError);
  assert.throws(() => parseBackup(JSON.stringify({ version: 2, plans: [], sessions: [] })), /newer than this app/);
});

// MARK: - Quick sessions, skipping, intervals, first run

test('a quick session logs what it says: reps are counted, minutes are timed', () => {
  const { store } = storeAt(local(2026, 11, 16, 9));
  const pushUp = named('Push-up');

  // The defaults: one counted, two timed.
  assert.deepEqual(store.state.quickSessions.map(quickTargetLabel), ['12 reps', '2 min', '5 min']);
  assert.deepEqual(defaultQuickTarget(pushUp), { reps: 12, sets: 1, minutes: 5 });
  assert.equal(defaultQuickTarget(named('Burpee')).reps, null);
  assert.equal(quickTargetLabel({ reps: 8, sets: 3, minutes: 5 }), '3 × 8 reps');

  // "12 push-ups": one set of 12 reps, no clock.
  const session = store.startQuickSession(store.state.quickSessions[0]);
  const slot = slotsOf(store.planDayForSession(session))[0];
  assert.equal(slot.exerciseID, pushUp.id);
  assert.equal(slot.targetReps, 12);
  assert.equal(slot.targetDurationSeconds, null);
  store.logSet(newSetLog({ exerciseID: pushUp.id, setNumber: 1, repsCompleted: 14, isCompleted: true }));
  store.completeSession();
  assert.equal(store.state.sessions[0].sets[0].repsCompleted, 14);
  assert.equal(store.state.sessions[0].title, 'Push-up');

  // An exercise can be logged once without keeping a card for it.
  store.startQuickSession({ exerciseID: named('Burpee').id, minutes: 5, reps: null });
  assert.equal(slotsOf(store.planDayForSession(store.state.activeSession))[0].targetDurationSeconds, 300);
  store.cancelSession();
  assert.equal(store.state.quickSessions.length, 3);

  // A card's target can be changed.
  store.updateQuickSession({ ...store.state.quickSessions[0], reps: 20, sets: 2 });
  assert.equal(quickTargetLabel(store.state.quickSessions[0]), '2 × 20 reps');
});

test('progress is charted for whatever was logged, plan or not', () => {
  const { store, clock } = storeAt(local(2026, 11, 16, 9));
  const pushUp = named('Push-up'), burpee = named('Burpee');
  for (const [day, reps] of [[16, 12], [18, 14], [20, 15]]) {
    clock.now = local(2026, 11, day, 9);
    store.startQuickSession({ exerciseID: burpee.id, minutes: 5, reps: 10, sets: 1 });
    store.logSet(newSetLog({ exerciseID: burpee.id, setNumber: 1, repsCompleted: reps, isCompleted: true }));
    store.completeSession();
  }
  const plan = store.activePlan, start = store.state.settings.activePlanStartDate;
  assert.equal(plan.progressionEnabled, false);

  // Burpee is in no plan: its chart is what was done, with no target line.
  const charted = chartableExercises(plan, store.state.exercises, store.state.sessions);
  assert.ok(charted.includes(burpee));
  const series = seriesFor(burpee, plan, start, store.state.sessions, clock.now);
  assert.equal(series.kind, 'reps');
  assert.deepEqual(series.points.map(p => p.actual), [12, 14, 15]);
  assert.equal(series.currentTarget, null);
  assert.equal(deltaVsTarget(series), null);
  assert.equal(changeSinceFirst(series), 25);

  // A plan exercise is chartable without automatic progression: its target is flat.
  assert.ok(charted.includes(pushUp));
  assert.equal(seriesFor(pushUp, plan, start, [], clock.now).currentTarget, 8);
  // With no plan at all, logged exercises still chart.
  assert.deepEqual(chartableExercises(null, store.state.exercises, store.state.sessions), [burpee]);
  assert.equal(seriesFor(burpee, null, null, store.state.sessions).points.length, 3);
});

test('a planned session can be skipped with a reason, and the record says why', () => {
  const { store, clock } = storeAt(local(2026, 11, 16, 9)); // Monday, training day
  store.skipSession('sick');
  assert.equal(store.todaySkipReason, 'sick');
  assert.equal(store.todaySession, null);
  let monday = store.dailyStatuses().find(s => s.key === '2026-11-16');
  assert.equal(monday.skipReason, 'sick');
  assert.equal(monday.hasLog, false);

  // Undo leaves nothing behind.
  store.unskipSession();
  assert.equal(store.todaySkipReason, null);
  assert.equal(store.state.sessions.length, 0);

  // Training after all clears the skip.
  store.skipSession('tired');
  store.startSession(store.todayPlanDay);
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1, repsCompleted: 10, isCompleted: true }));
  store.completeSession();
  assert.equal(store.todaySession.skipReason, null);
  assert.equal(store.state.sessions.length, 1);

  // A past day can be marked too, and four weeks add up.
  clock.now = local(2026, 11, 23, 9);                 // the next Monday
  store.skipSession('shortOnTime', local(2026, 11, 18)); // Wednesday's run
  // Friday was neither done nor skipped.
  assert.deepEqual(store.adherence(28), { planned: 3, done: 1, skipped: { shortOnTime: 1 }, missed: 1 });

  // A feel modifier on a skipped day keeps the reason when it is switched off again.
  store.skipSession('away');
  store.toggleModifier('lowEnergy');
  store.toggleModifier('lowEnergy');
  assert.equal(store.todaySkipReason, 'away');
});

test('an interval day is a circuit: each round goes through every exercise', () => {
  const tabata = builtInPlans().find(p => p.name === 'Tabata Starter');
  const day = tabata.days.find(d => d.dayType === 'hiit');
  const slots = slotsOf(day);
  const steps = intervalSteps(day);

  assert.equal(steps.filter(s => s.kind === 'work').length, slots.reduce((sum, slot) => sum + setCount(slot), 0));
  assert.equal(steps[0].kind, 'work');
  assert.equal(steps[1].kind, 'rest');
  assert.equal(steps.at(-1).kind, 'work'); // no rest after the last interval
  // Round 1 visits every exercise before round 2 starts.
  const firstRound = steps.filter(s => s.kind === 'work').slice(0, slots.length);
  assert.deepEqual(firstRound.map(s => s.slot.id), slots.map(s => s.id));
  assert.ok(firstRound.every(s => s.round === 1));
  // 20 seconds on, 10 off.
  assert.equal(steps[0].seconds, 20);
  assert.equal(steps[1].seconds, 10);
  // A strength day has nothing timed in it but the plank.
  assert.equal(intervalSteps(builtInPlans()[0].days[0]).filter(s => s.kind === 'work').length, 3);
});

test('the first-run guide suggests a plan that fits the answers', () => {
  const plans = builtInPlans();
  const first = answers => recommendPlans(answers, plans)[0];
  const allowed = (answers, kit) => recommendPlans(answers, plans).every(p => kit.includes(p.equipment));

  assert.equal(first({ focus: 'calisthenics', equipment: [], days: 3 }).name, 'Calisthenics Basics');
  assert.equal(first({ focus: 'hiit', equipment: [], days: 2 }).name, 'Tabata Starter');
  assert.equal(first({ focus: 'strength', equipment: ['dumbbells'], days: 3 }).name, 'Dumbbell Full Body');
  assert.equal(first({ focus: 'strength', equipment: ['kettlebell'], days: 3 }).name, 'Kettlebell Basics');
  assert.equal(first({ focus: 'yoga', equipment: [], days: 3 }).focus, 'yoga');
  assert.equal(first({ focus: 'mix', equipment: [], days: 3 }).name, 'Home Maintenance');
  // Nothing that needs kit you do not have — and strength without weights is calisthenics.
  assert.ok(allowed({ focus: 'strength', equipment: [], days: 4 }, ['none', 'wall', 'bike']));
  assert.equal(first({ focus: 'strength', equipment: [], days: 3 }).name, 'Calisthenics Basics');
  assert.equal(first({ focus: 'cardio', equipment: [], days: 3 }).name, 'Cardio Base');
  // A gym opens everything up.
  assert.ok(recommendPlans({ focus: 'strength', equipment: ['gym'], days: 4 }, plans).some(p => p.name === 'Upper / Lower Split'));
  assert.equal(daysPerWeek(plans[1]), 3); // the four-week program trains three days a week
});

test('a device from an earlier version gets the new templates and skips the guide', () => {
  // First launch: the guide is due, and the content is current.
  const fresh = storeAt(local(2026, 11, 16));
  assert.equal(fresh.store.state.settings.onboardingCompleted, false);
  assert.equal(fresh.store.state.settings.contentVersion, CONTENT_VERSION);

  // A stored state from before: three plans, no content version.
  const old = JSON.parse(fresh.storage.data[STORAGE_KEY]);
  old.plans = old.plans.slice(0, 3);
  delete old.settings.contentVersion;
  old.settings.isPro = true;
  const storage = memoryStorage({ [STORAGE_KEY]: JSON.stringify(old) });
  const store = createStore({ storage, now: () => local(2026, 11, 17) });

  assert.equal(store.state.plans.length, PLAN_COUNT);
  assert.deepEqual(store.state.plans.slice(0, 3).map(p => p.id), old.plans.map(p => p.id)); // theirs are untouched
  assert.equal(store.state.settings.onboardingCompleted, true);
  assert.equal(store.activePlan.id, old.settings.activePlanID);

  // And only once: a plan deleted afterwards stays deleted.
  store.deletePlan(store.state.plans.at(-1).id);
  const again = createStore({ storage, now: () => local(2026, 11, 18) });
  assert.equal(again.state.plans.length, PLAN_COUNT - 1);
});
