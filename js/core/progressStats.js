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
// stored unit (kg, reps, seconds).

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

/// Exercises that get their own tab in the progress drawer.
export function trackableExercises(plan, exercises) {
  return [...baseSlots(plan).keys()]
    .map(id => exercises.find(e => e.id === id))
    .filter(Boolean);
}

const completedSetsFor = (session, exerciseID) =>
  session.sets.filter(s => s.exerciseID === exerciseID && s.isCompleted);

const byDate = (a, b) => toDate(a.date) - toDate(b.date);

export function seriesFor(exercise, plan, startDate, sessions, now = new Date()) {
  const slot = baseSlots(plan).get(exercise.id);
  if (!slot) return null;

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
export function deltaVsTarget(series) {
  const last = series.points[series.points.length - 1];
  if (!last || series.currentTarget === 0) return null;
  return (last.actual - series.currentTarget) / series.currentTarget * 100;
}
