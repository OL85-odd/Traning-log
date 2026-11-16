// Progressive overload: targets climb +2.5% of their ORIGINAL value for every
// full month since the plan started (linear, not compounded). Weight is scaled
// when a slot has one; otherwise reps, otherwise duration.
// Swift: OddForm/Services/ProgressionCalculator.swift
//
// Every function takes the date it is asked about. The target shown for a day
// — in the session, in the timeline and on the chart — is always the same
// number, computed for that day.

import { monthsBetween } from './dates.js';

export const MONTHLY_INCREASE = 0.025;

export function monthsElapsed(startDate, at = new Date()) {
  return monthsBetween(startDate, at);
}

/// Elapsed months minus the months the user chose to pause.
/// (A pause has no date of its own, so it holds back the whole timeline.)
export function effectiveMonths(plan, startDate, at = new Date()) {
  if (!plan.progressionEnabled) return 0;
  return Math.max(0, monthsElapsed(startDate, at) - plan.progressionPauseCount);
}

export function isPausedThisMonth(plan, startDate, now = new Date()) {
  return plan.progressionLastPausedMonth === monthsElapsed(startDate, now);
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

export function baseValue(slot) {
  const kind = metricKind(slot);
  return kind ? slot[TARGET_FIELD[kind]] : null;
}

/// Highest value logged among `sets`, read from the field `slot` tracks.
export function bestActualValue(sets, slot) {
  const kind = metricKind(slot);
  if (!kind) return null;
  const values = sets.map(s => s[ACTUAL_FIELD[kind]]).filter(v => v != null);
  return values.length ? Math.max(...values) : null;
}

/// Weight moves in half kilos, so a month's 2.5% shows up on a 20 kg lift.
/// Reps and seconds are whole numbers.
function roundTarget(kind, value) {
  return kind === 'weight' ? Math.round(value * 2) / 2 : Math.round(value);
}

/// The slot's target on `at`: the original value raised for the months
/// elapsed by then.
export function targetValueAt(slot, plan, startDate, at = new Date()) {
  const kind = metricKind(slot);
  if (!kind) return null;
  const months = effectiveMonths(plan, startDate, at);
  const base = baseValue(slot);
  return months > 0 ? roundTarget(kind, base * (1 + MONTHLY_INCREASE * months)) : base;
}

/// `slot` with its target raised to what applies on `at`.
export function adjustedSlot(slot, plan, startDate, at = new Date()) {
  const kind = metricKind(slot);
  if (!kind || effectiveMonths(plan, startDate, at) <= 0) return slot;
  return { ...slot, [TARGET_FIELD[kind]]: targetValueAt(slot, plan, startDate, at) };
}
