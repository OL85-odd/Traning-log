// Turns logged sessions into target-vs-actual chart series.
// Swift: OddForm/Services/ProgressStats.swift

import { toDate } from './dates.js';
import { slotsOf } from './models.js';
import {
  MONTHLY_INCREASE, baseValue, bestActualValue, fractionalEffectiveMonths, metricKind, unitFor,
} from './progression.js';

// A series is { unit, points: [{ date, target, actual }], currentTarget }.

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
  // The first slot for this exercise anywhere in the plan, trackable or not.
  const slot = plan.days.flatMap(slotsOf).find(s => s.exerciseID === exercise.id);
  const base = slot ? baseValue(slot) : null;
  if (base == null) return null;

  const targetAt = date => base * (1 + MONTHLY_INCREASE * fractionalEffectiveMonths(plan, startDate, date));

  const points = sessions
    .filter(s => s.completedAt)
    .map(session => {
      const actual = bestActualValue(completedSetsFor(session, exercise.id), slot);
      return actual == null ? null : { date: session.date, target: targetAt(session.date), actual };
    })
    .filter(Boolean)
    .sort(byDate);

  return { unit: unitFor(slot), points, currentTarget: targetAt(now) };
}

/// "Progress Score": 100 = on pace with the original plan. Each session's
/// score is the average of actual / original target across the exercises
/// logged in it.
export function overallSeries(plan, startDate, sessions, now = new Date()) {
  if (!plan.progressionEnabled) return null;
  const slots = baseSlots(plan);
  if (slots.size === 0) return null;

  const targetAt = date => 100 * (1 + MONTHLY_INCREASE * fractionalEffectiveMonths(plan, startDate, date));

  const points = sessions
    .filter(s => s.completedAt)
    .map(session => {
      const ratios = [];
      for (const [exerciseID, slot] of slots) {
        const base = baseValue(slot);
        if (!(base > 0)) continue;
        const actual = bestActualValue(completedSetsFor(session, exerciseID), slot);
        if (actual != null) ratios.push(actual / base);
      }
      if (!ratios.length) return null;
      const average = ratios.reduce((a, b) => a + b, 0) / ratios.length;
      return { date: session.date, target: targetAt(session.date), actual: average * 100 };
    })
    .filter(Boolean)
    .sort(byDate);

  if (!points.length) return null;
  return { unit: 'score', points, currentTarget: targetAt(now) };
}

/// How far the latest actual value sits from today's target, in percent.
export function deltaVsTarget(series) {
  const last = series.points[series.points.length - 1];
  if (!last || series.currentTarget === 0) return null;
  return (last.actual - series.currentTarget) / series.currentTarget * 100;
}
