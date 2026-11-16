// Turns logged sessions into target-vs-actual chart series.
// Swift: OddForm/Services/ProgressStats.swift
//
// The target on the chart is the same number the session screen showed that
// day (see progression.js), so a set that met its target is never drawn as a
// miss.

import { toDate } from './dates.js';
import { slotsOf } from './models.js';
import { baseValue, bestActualValue, metricKind, targetValueAt } from './progression.js';

// A series is { kind, points: [{ date, target, actual }], currentTarget }.
// `kind` is 'weight' | 'reps' | 'duration' | 'score'; values are in the
// stored unit (kg, reps, seconds). An exercise the plan sets no target for —
// one done in quick sessions, say — has `target` and `currentTarget` null:
// its chart is simply what was done.

/// First slot per exercise that has a progressable target, in plan order.
function baseSlots(plan) {
  const slots = new Map();
  for (const day of plan.days) {
    for (const slot of slotsOf(day)) {
      if (!slots.has(slot.exerciseID) && metricKind(slot)) slots.set(slot.exerciseID, slot);
    }
  }
  return slots;
}

/// Exercises the plan sets a target for, in plan order.
export function trackableExercises(plan, exercises) {
  return [...baseSlots(plan).keys()]
    .map(id => exercises.find(e => e.id === id))
    .filter(Boolean);
}

/// Every exercise with something to chart: the plan's, then any other that
/// has numbers logged (most recently trained first). Progress is shown for
/// what you do, whether or not a plan asked for it.
export function chartableExercises(plan, exercises, sessions) {
  const planned = plan ? trackableExercises(plan, exercises) : [];
  const seen = new Set(planned.map(e => e.id));
  const others = [];
  const newestFirst = sessions.filter(s => s.completedAt).sort((a, b) => toDate(b.date) - toDate(a.date));
  for (const session of newestFirst) {
    for (const set of session.sets) {
      if (!set.isCompleted || seen.has(set.exerciseID)) continue;
      if (set.repsCompleted == null && set.weightKg == null && set.durationSeconds == null) continue;
      seen.add(set.exerciseID);
      const exercise = exercises.find(e => e.id === set.exerciseID);
      if (exercise) others.push(exercise);
    }
  }
  return [...planned, ...others];
}

const completedSetsFor = (session, exerciseID) =>
  session.sets.filter(s => s.exerciseID === exerciseID && s.isCompleted);

const byDate = (a, b) => toDate(a.date) - toDate(b.date);

/// What was done, for an exercise no plan target applies to. The metric is
/// read off the log: weight if any was entered, else reps, else time.
function loggedSeries(exercise, sessions) {
  const logs = sessions
    .filter(s => s.completedAt)
    .map(session => ({ date: session.date, sets: completedSetsFor(session, exercise.id) }))
    .filter(log => log.sets.length > 0);
  const all = logs.flatMap(log => log.sets);
  const field = all.some(s => s.weightKg > 0) ? 'weightKg'
    : all.some(s => s.repsCompleted != null) ? 'repsCompleted'
    : all.some(s => s.durationSeconds != null) ? 'durationSeconds'
    : null;
  if (!field) return null;
  const kind = { weightKg: 'weight', repsCompleted: 'reps', durationSeconds: 'duration' }[field];
  const points = logs
    .map(log => {
      const values = log.sets.map(s => s[field]).filter(v => v != null);
      return values.length ? { date: log.date, target: null, actual: Math.max(...values) } : null;
    })
    .filter(Boolean)
    .sort(byDate);
  return { kind, points, currentTarget: null };
}

export function seriesFor(exercise, plan, startDate, sessions, now = new Date()) {
  const slot = plan && startDate ? baseSlots(plan).get(exercise.id) : null;
  if (!slot) return loggedSeries(exercise, sessions);

  const points = sessions
    .filter(s => s.completedAt)
    .map(session => {
      const actual = bestActualValue(completedSetsFor(session, exercise.id), slot);
      if (actual == null) return null;
      return { date: session.date, target: targetValueAt(slot, plan, startDate, session.date), actual };
    })
    .filter(Boolean)
    .sort(byDate);

  return { kind: metricKind(slot), points, currentTarget: targetValueAt(slot, plan, startDate, now) };
}

/// "Progress Score": 100 = the original plan. Each session's score is the
/// average of actual / original target across the exercises logged in it;
/// its target is the same average taken over that day's targets.
export function overallSeries(plan, startDate, sessions, now = new Date()) {
  if (!plan.progressionEnabled) return null;
  const slots = [...baseSlots(plan)].filter(([, slot]) => baseValue(slot) > 0);
  if (slots.length === 0) return null;

  const average = values => values.reduce((a, b) => a + b, 0) / values.length;
  const targetScore = (slot, date) => targetValueAt(slot, plan, startDate, date) / baseValue(slot) * 100;

  const points = sessions
    .filter(s => s.completedAt)
    .map(session => {
      const actuals = [], targets = [], logged = [];
      for (const [exerciseID, slot] of slots) {
        const actual = bestActualValue(completedSetsFor(session, exerciseID), slot);
        if (actual == null) continue;
        actuals.push(actual / baseValue(slot) * 100);
        targets.push(targetScore(slot, session.date));
        logged.push(slot);
      }
      if (!actuals.length) return null;
      return { date: session.date, target: average(targets), actual: average(actuals), logged };
    })
    .filter(Boolean)
    .sort(byDate);

  if (!points.length) return null;
  // Today's target for the same exercises the latest session held, so the
  // "vs target" figure compares like with like.
  const latest = points[points.length - 1].logged;
  return { kind: 'score', points, currentTarget: average(latest.map(slot => targetScore(slot, now))) };
}

/// How far the latest actual value sits from today's target, in percent.
/// null when there is no target to compare with.
export function deltaVsTarget(series) {
  const last = series.points[series.points.length - 1];
  if (!last || series.currentTarget == null || series.currentTarget === 0) return null;
  return (last.actual - series.currentTarget) / series.currentTarget * 100;
}

/// How far the latest value sits from the first one logged, in percent.
/// null with fewer than two points.
export function changeSinceFirst(series) {
  const first = series.points[0], last = series.points[series.points.length - 1];
  if (!first || first === last || first.actual === 0) return null;
  return (last.actual - first.actual) / first.actual * 100;
}
