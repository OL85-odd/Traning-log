// Progressive overload: targets climb +2.5% of their ORIGINAL value for every
// full month since the plan started (linear, not compounded). Weight is scaled
// when a slot has one; otherwise reps, otherwise duration.
// Swift: OddForm/Services/ProgressionCalculator.swift

import { daysBetween, monthsBetween, startOfDay } from './dates.js';

export const MONTHLY_INCREASE = 0.025;

export function monthsElapsed(startDate, now = new Date()) {
  return monthsBetween(startDate, now);
}

/// Elapsed months minus the months the user chose to pause.
export function effectiveMonths(plan, startDate, now = new Date()) {
  if (!plan.progressionEnabled) return 0;
  return Math.max(0, monthsElapsed(startDate, now) - plan.progressionPauseCount);
}

export function isPausedThisMonth(plan, startDate, now = new Date()) {
  return plan.progressionLastPausedMonth === monthsElapsed(startDate, now);
}

/// Fractional months between plan start and `date`, minus paused months —
/// gives the chart a smooth target line instead of whole-month steps.
export function fractionalEffectiveMonths(plan, startDate, date) {
  if (!plan.progressionEnabled) return 0;
  if (startOfDay(date) < startOfDay(startDate)) return 0;
  const months = daysBetween(startDate, date) / 30.44;
  return Math.max(0, months - plan.progressionPauseCount);
}

/// 'weight' | 'reps' | 'duration' | null — a slot tracks exactly one metric.
export function metricKind(slot) {
  if (slot.targetWeightKg != null && slot.targetWeightKg > 0) return 'weight';
  if (slot.targetReps != null) return 'reps';
  if (slot.targetDurationSeconds != null) return 'duration';
  return null;
}

const TARGET_FIELD = { weight: 'targetWeightKg', reps: 'targetReps', duration: 'targetDurationSeconds' };
const ACTUAL_FIELD = { weight: 'weightKg', reps: 'repsCompleted', duration: 'durationSeconds' };
const UNIT = { weight: 'kg', reps: 'reps', duration: 'sec' };

export function baseValue(slot) {
  const kind = metricKind(slot);
  return kind ? slot[TARGET_FIELD[kind]] : null;
}

export function unitFor(slot) {
  return UNIT[metricKind(slot)] ?? '';
}

/// Highest value logged among `sets`, read from the field `slot` tracks.
export function bestActualValue(sets, slot) {
  const kind = metricKind(slot);
  if (!kind) return null;
  const values = sets.map(s => s[ACTUAL_FIELD[kind]]).filter(v => v != null);
  return values.length ? Math.max(...values) : null;
}

/// `slot` with its target raised for the months elapsed, rounded to a whole
/// kg / rep / second.
export function adjustedSlot(slot, plan, startDate, now = new Date()) {
  const months = effectiveMonths(plan, startDate, now);
  const kind = metricKind(slot);
  if (months <= 0 || !kind) return slot;
  const value = Math.round(baseValue(slot) * (1 + MONTHLY_INCREASE * months));
  return { ...slot, [TARGET_FIELD[kind]]: value };
}
