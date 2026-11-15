// Which plan day applies on a given date.
// Swift: OddForm/Services/PlanResolver.swift

import { daysBetween, isoWeekday } from './dates.js';
import { slotsOf } from './models.js';
import { adjustedSlot } from './progression.js';

/// The plan day for `date`, with progression applied to its targets.
/// Returns null when the plan has nothing for that date (before a program
/// starts, after it ends).
export function planDayFor(date, plan, startDate, now = new Date()) {
  const raw = plan.planMode === 'weeklyCycle'
    ? plan.days.find(d => d.dayOfWeek === isoWeekday(date))
    : finiteProgramDay(date, plan, startDate);
  if (!raw) return null;
  if (!plan.progressionEnabled) return raw;
  return {
    ...raw,
    blocks: raw.blocks.map(block => ({
      ...block,
      exercises: block.exercises.map(slot => adjustedSlot(slot, plan, startDate, now)),
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

/// Completed sets over planned sets, 0…1.
export function completionPercent(session, planDay) {
  const planned = slotsOf(planDay).reduce((sum, slot) => sum + (slot.targetSets ?? 1), 0);
  if (planned <= 0) return 0;
  const completed = session.sets.filter(s => s.isCompleted).length;
  return Math.min(1, completed / planned);
}
