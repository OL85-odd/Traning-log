// Which plan day applies on a given date.
// Swift: OddForm/Services/PlanResolver.swift

import { daysBetween, isoWeekday } from './dates.js';
import { slotsOf } from './models.js';
import { adjustedSlot } from './progression.js';
import { setCount } from './units.js';

/// The plan day for `date`, with the progression that applies on that date.
/// Returns null when the plan has nothing for that date (before a program
/// starts, after it ends).
export function planDayFor(date, plan, startDate) {
  const raw = plan.planMode === 'weeklyCycle'
    ? plan.days.find(d => d.dayOfWeek === isoWeekday(date))
    : finiteProgramDay(date, plan, startDate);
  if (!raw) return null;
  if (!plan.progressionEnabled) return raw;
  return {
    ...raw,
    blocks: raw.blocks.map(block => ({
      ...block,
      exercises: block.exercises.map(slot => adjustedSlot(slot, plan, startDate, date)),
    })),
  };
}

function finiteProgramDay(date, plan, startDate) {
  const offset = daysBetween(startDate, date);
  if (offset < 0) return null;
  return plan.days.find(d => d.dayIndex === offset);
}

/// 1-based week since the plan started.
export function weekNumber(date, startDate) {
  return Math.max(1, Math.trunc(daysBetween(startDate, date) / 7) + 1);
}

/// How long a finite program runs, in days. 0 for a weekly cycle.
export function programLengthDays(plan) {
  if (plan.planMode !== 'finiteProgram') return 0;
  return Math.max(0, ...plan.days.map(d => (d.dayIndex ?? -1) + 1));
}

/// Where a finite program stands on `date`: null for a weekly cycle,
/// otherwise { week, weeks, finished }.
export function programProgress(plan, startDate, date) {
  const length = programLengthDays(plan);
  if (!length || !startDate) return null;
  const weeks = Math.ceil(length / 7);
  const offset = daysBetween(startDate, date);
  return { week: Math.min(weeks, weekNumber(date, startDate)), weeks, finished: offset >= length };
}

/// The sets a plan day asks for. `hasExercise` lets the caller leave out
/// slots whose exercise no longer exists (a deleted custom exercise), so a
/// day can still reach 100%.
export function plannedSetCount(planDay, hasExercise = () => true) {
  return slotsOf(planDay)
    .filter(slot => hasExercise(slot.exerciseID))
    .reduce((sum, slot) => sum + setCount(slot), 0);
}

/// Completed sets over planned sets, 0…1. A finished session carries its own
/// `plannedSets` — what the plan asked for on the day — and that wins over
/// whatever the plan says now.
export function completionPercent(session, planDay, hasExercise) {
  const planned = session.plannedSets ?? plannedSetCount(planDay, hasExercise);
  if (planned <= 0) return session.completedAt ? 1 : 0;
  const completed = session.sets.filter(s => s.isCompleted).length;
  return Math.min(1, completed / planned);
}
