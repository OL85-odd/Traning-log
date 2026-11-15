// Run with: npm test   (plain Node, no dependencies)
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { BackupError, makeBackup, parseBackup, serializeBackup } from '../js/core/backup.js';
import { BUILT_IN_EXERCISES, ICON_MAP, builtInPlans } from '../js/core/builtin.js';
import { daysBetween, isoWeekday, monthsBetween, startOfWeek, toISO } from '../js/core/dates.js';
import { newPlan, newPlanDay, newBlock, newSlot, newSetLog } from '../js/core/models.js';
import { completionPercent, planDayFor, weekNumber } from '../js/core/planResolver.js';
import { adjustedSlot, effectiveMonths, metricKind } from '../js/core/progression.js';
import { deltaVsTarget, overallSeries, seriesFor, trackableExercises } from '../js/core/progressStats.js';
import { STORAGE_KEY, createStore } from '../js/core/store.js';

const local = (y, m, d, h = 12) => new Date(y, m - 1, d, h);
const squat = BUILT_IN_EXERCISES.find(e => e.name === 'Squat');

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
  assert.equal(BUILT_IN_EXERCISES.length, 33);
  assert.equal(new Set(BUILT_IN_EXERCISES.map(e => e.id)).size, 33);
  for (const e of BUILT_IN_EXERCISES) assert.ok(ICON_MAP[e.name], `icon for ${e.name}`);
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
  assert.equal(series.unit, 'kg');
  assert.deepEqual(series.points.map(p => p.actual), [100, 105]); // chronological, best set
  assert.ok(series.points[0].target < series.points[1].target);
  assert.ok(Math.abs(series.currentTarget - 100 * (1 + 0.025 * 90 / 30.44)) < 1e-9);

  const overall = overallSeries(plan, start, sessions, now);
  assert.deepEqual(overall.points.map(p => Math.round(p.actual)), [100, 105]);
  assert.ok(deltaVsTarget(overall) < 0); // 105 against a target of ~107.4

  assert.equal(overallSeries(newPlan({}), start, sessions, now), null);
});

// MARK: - Store

test('first launch seeds plans, an active plan and quick sessions — and they stay stable', () => {
  const { store, storage } = storeAt(local(2026, 11, 15));
  assert.equal(store.state.plans.length, 3);
  assert.equal(store.activePlan.name, 'Home Maintenance');
  assert.equal(store.state.quickSessions.length, 3);

  const again = createStore({ storage, now: () => local(2026, 11, 16) });
  assert.deepEqual(again.state.plans.map(p => p.id), store.state.plans.map(p => p.id));
  assert.equal(again.state.exercises.length, 33);
});

test('a session is logged, finished and shows up in the daily statuses', () => {
  const { store, clock } = storeAt(local(2026, 11, 16, 9)); // Monday: Full Body A
  const day = store.todayPlanDay;
  store.startSession(day);
  assert.equal(store.state.sessions.length, 0); // nothing saved until finished

  for (const setNumber of [1, 2, 3]) {
    store.logSet(newSetLog({ exerciseID: squat.id, setNumber, repsCompleted: 8, isCompleted: true }));
  }
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 3, repsCompleted: 6, isCompleted: true }));
  assert.equal(store.state.activeSession.sets.length, 3); // same set number replaces

  clock.now = local(2026, 11, 16, 10);
  store.completeSession();
  assert.equal(store.state.activeSession, null);
  assert.equal(store.todaySession.sets[2].repsCompleted, 6);

  const today = store.dailyStatuses().find(s => s.key === '2026-11-16');
  assert.equal(today.completionPercent, 3 / 9);
  assert.equal(today.dayType, 'strength');
  assert.equal(store.dailyStatuses().length, 75);
});

test('logging a past day twice reuses the same session', () => {
  const { store } = storeAt(local(2026, 11, 20, 9));
  const monday = local(2026, 11, 16);
  store.startSession(store.planDayOn(monday), monday);
  assert.equal(store.state.activeSession.startedAt, null);
  store.completeSession();
  const first = store.sessionOn(monday);
  assert.equal(first.completedAt, first.date);

  store.startSession(store.planDayOn(monday), monday);
  assert.equal(store.state.activeSession.id, first.id);
  store.completeSession();
  assert.equal(store.state.sessions.length, 1);
});

test('a quick session is logged against its own exercise, also on a training day', () => {
  const { store } = storeAt(local(2026, 11, 16, 9)); // Monday has a plan day of its own
  const session = store.startQuickSession(store.state.quickSessions[0]); // Squat, 5 min
  const day = store.planDayForSession(session);
  assert.equal(day.blocks.length, 1);
  assert.equal(day.blocks[0].exercises[0].exerciseID, squat.id);
  assert.equal(day.blocks[0].exercises[0].targetDurationSeconds, 300);
  assert.equal(session.dayType, 'strength');
});

test('an active session survives a reload', () => {
  const { store, storage } = storeAt(local(2026, 11, 16, 9));
  store.startSession(store.todayPlanDay);
  store.logSet(newSetLog({ exerciseID: squat.id, setNumber: 1, repsCompleted: 8, isCompleted: true }));
  const reloaded = createStore({ storage, now: () => local(2026, 11, 16, 9) });
  assert.equal(reloaded.state.activeSession.sets.length, 1);
});

test('feel modifiers toggle on today, creating a holder log on a day without one', () => {
  const { store } = storeAt(local(2026, 11, 15, 9)); // Sunday, rest
  store.toggleModifier('sick');
  store.toggleModifier('fasting');
  assert.deepEqual(store.todayModifiers, ['sick', 'fasting']);
  assert.equal(store.todaySession.dayType, 'rest');
  store.toggleModifier('sick');
  assert.deepEqual(store.todayModifiers, ['fasting']);
  assert.equal(store.state.sessions.length, 1);
});

test('quick sessions cap at four; deleting the active plan clears it', () => {
  const { store } = storeAt(local(2026, 11, 15));
  store.addQuickSession({ id: 'a', exerciseID: squat.id, minutes: 5 });
  store.addQuickSession({ id: 'b', exerciseID: squat.id, minutes: 5 });
  assert.equal(store.state.quickSessions.length, 4);

  store.deletePlan(store.activePlan.id);
  assert.equal(store.activePlan, null);
  assert.equal(store.todayPlanDay, null);
  assert.equal(store.state.plans.length, 2);
});

test('corrupt stored data starts clean instead of crashing', () => {
  const storage = memoryStorage({ [STORAGE_KEY]: '{not json' });
  const store = createStore({ storage, now: () => local(2026, 11, 15) });
  assert.equal(store.state.plans.length, 3);
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
  has(file.sessions[0].sets[0], ['id', 'exerciseID', 'setNumber', 'isCompleted', 'notes']);

  // Import into a fresh device.
  const target = storeAt(local(2026, 12, 1)).store;
  target.applyBackup(parseBackup(text));
  assert.equal(target.state.sessions[0].sets[0].weightKg, 42.5);
  assert.deepEqual(target.state.sessions[0].feelModifiers, ['lowEnergy']);
  assert.equal(target.activePlan.id, store.activePlan.id);
  assert.equal(target.state.exercises.length, 34);
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
});

test('unusable files are refused with a readable reason', () => {
  assert.throws(() => parseBackup('nope'), BackupError);
  assert.throws(() => parseBackup('{"hello":1}'), BackupError);
  assert.throws(() => parseBackup(JSON.stringify({ version: 2, plans: [], sessions: [] })), /newer than this app/);
});
