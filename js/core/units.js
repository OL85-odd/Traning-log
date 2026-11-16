// Units: what a number in a field means, and how it is shown.
// Swift: WeightUnit (UserSettings.swift) + ExerciseUnit (PlanTemplate.swift)
//
// Storage never changes with the unit: weight is always kilograms and time
// is always seconds. The unit only decides what the user reads and types.

// MARK: - Weight (Settings → Weight unit)

export const KG_PER_LB = 0.45359237;

/// Kilograms -> the number shown in `unit` ("kg" or "lbs").
export function weightFromKg(kg, unit = 'kg') {
  return unit === 'lbs' ? kg / KG_PER_LB : kg;
}

/// The number typed in `unit` -> kilograms.
export function weightToKg(value, unit = 'kg') {
  return unit === 'lbs' ? value * KG_PER_LB : value;
}

/// 20 -> "20", 42.5 -> "42.5", 20.41 kg in lbs -> "45".
export function formatWeight(kg, unit = 'kg') {
  return trimNumber(weightFromKg(kg, unit));
}

/// At most one decimal, and none when it would be ".0".
export function trimNumber(value) {
  return String(Math.round(value * 10) / 10);
}

// MARK: - Time (the slot's `unit2`)

export const TIME_UNITS = ['Sek', 'Min', 'Timer'];
export const COUNT_UNITS = ['Reps', 'm', 'km', 'mil'];

const SECONDS_PER = { Sek: 1, Min: 60, Timer: 3600 };

/// The stored raw values are Norwegian ("Sek", "Timer") because that is what
/// the iOS enum encodes. This is what the user reads.
export const UNIT_LABELS = { Reps: 'reps', Sek: 'sec', Min: 'min', Timer: 'hr', m: 'm', km: 'km', mil: 'mil' };

/// The unit a slot's time is typed and shown in. A slot left on seconds but
/// holding ten whole minutes or more (the built-in 30 minute run) reads in
/// minutes: nobody wants to type 1800.
export function timeUnit(slot) {
  const unit = TIME_UNITS.includes(slot.unit2) ? slot.unit2 : 'Sek';
  const seconds = slot.targetDurationSeconds;
  if (unit === 'Sek' && seconds != null && seconds >= 600 && seconds % 60 === 0) return 'Min';
  return unit;
}

export function secondsToUnit(seconds, unit) {
  return seconds / SECONDS_PER[unit];
}

export function unitToSeconds(value, unit) {
  return Math.round(value * SECONDS_PER[unit]);
}

/// The unit the count field ("reps") is shown in.
export function countUnit(slot) {
  return COUNT_UNITS.includes(slot.unit1) ? slot.unit1 : 'Reps';
}

// MARK: - Reading what was typed

export const LIMITS = { count: 9999, weightKg: 999, seconds: 24 * 3600, sets: 20 };

/// A whole number from 0 to `max`, or null. Empty text is null too.
export function parseWhole(text, max = LIMITS.count) {
  const trimmed = String(text ?? '').trim();
  if (!/^\d+$/.test(trimmed)) return null;
  const value = Number(trimmed);
  return value <= max ? value : null;
}

/// A decimal number from 0 to `max`, or null. Norwegian keyboards type a
/// comma, so "42,5" reads as 42.5.
export function parseDecimal(text, max = Infinity) {
  const normalized = String(text ?? '').trim().replace(',', '.');
  if (!/^\d+(\.\d+)?$/.test(normalized)) return null;
  const value = Number(normalized);
  return value <= max ? value : null;
}

/// Something was typed, and it is not a usable number.
export function isInvalid(text, parsed) {
  return String(text ?? '').trim() !== '' && parsed == null;
}

// MARK: - What a slot asks for

/// How many set rows a slot gets. A slot without sets (a run, a stretch) is
/// one thing to tick off, not three.
export function setCount(slot) {
  return Math.max(1, slot.targetSets ?? 1);
}

const LOADED = new Set(['dumbbells', 'kettlebell', 'barbell', 'cable', 'machine', 'ball', 'sled']);

/// Whether logging this slot offers a weight field: when the plan sets a
/// weight, or when the exercise is done with a load. A plank, a push-up or
/// a run has no use for one.
export function tracksWeight(slot, exercise) {
  if (slot.targetWeightKg != null) return true;
  if (LOADED.has(exercise?.equipment)) return true;
  return exercise?.category === 'strength' && slot.targetReps != null;
}

/// Whether logging this slot offers a count field ("reps"): when the plan
/// sets one, and for interval work, where you do as many as the clock allows
/// and note the number afterwards.
export function tracksCount(slot, exercise) {
  return slot.targetReps != null || exercise?.category === 'hiit';
}

/// Sensible starting target for a quick session of `exercise`:
/// { reps, sets } for things you count, { minutes } for things you time.
export function defaultQuickTarget(exercise) {
  if (exercise?.tracking === 'reps' && exercise.category !== 'cardio') {
    return { reps: exercise.category === 'strength' ? 10 : 12, sets: 1, minutes: 5 };
  }
  return { reps: null, sets: null, minutes: exercise?.category === 'cardio' ? 20 : 5 };
}

/// "12 reps", "3 × 12 reps", "5 min" — what a quick session card says.
export function quickTargetLabel(quick) {
  if (quick.reps != null) return `${quick.sets > 1 ? `${quick.sets} × ` : ''}${quick.reps} reps`;
  return `${quick.minutes} min`;
}

/// Sensible starting targets when an exercise is added to a plan day.
export function defaultTargets(exercise) {
  switch (exercise?.category) {
    case 'cardio':   return { targetDurationSeconds: 20 * 60, unit2: 'Min' };
    case 'hiit':     return { targetSets: 3, targetDurationSeconds: 30, restSeconds: 15 };
    case 'yoga':
    case 'mobility':
      return exercise.tracking === 'reps'
        ? { targetSets: 1, targetReps: 10 }
        : { targetSets: 2, targetDurationSeconds: 45, restSeconds: 10 };
    default:
      return exercise?.tracking === 'time'
        ? { targetSets: 3, targetDurationSeconds: 30 }
        : { targetSets: 3, targetReps: 10 };
  }
}

// MARK: - Interval timer

/// The steps of a circuit: round 1 of every timed slot in order, then round
/// 2, and so on — work, then that slot's rest. The last rest is left out.
/// Each step is { kind: 'work' | 'rest', seconds, slot, round, rounds }.
export function intervalSteps(planDay) {
  const slots = (planDay?.blocks ?? []).flatMap(b => b.exercises).filter(s => s.targetDurationSeconds != null);
  const rounds = Math.max(0, ...slots.map(setCount));
  const steps = [];
  for (let round = 1; round <= rounds; round++) {
    for (const slot of slots) {
      if (round > setCount(slot)) continue;
      steps.push({ kind: 'work', seconds: slot.targetDurationSeconds, slot, round, rounds: setCount(slot) });
      if (slot.restSeconds > 0) steps.push({ kind: 'rest', seconds: slot.restSeconds, slot, round, rounds: setCount(slot) });
    }
  }
  if (steps.length && steps[steps.length - 1].kind === 'rest') steps.pop();
  return steps;
}

/// Rough minutes a plan day takes: the work itself plus the rest after each set.
export function estimatedMinutes(planDay) {
  let seconds = 0;
  for (const block of planDay?.blocks ?? []) {
    for (const slot of block.exercises) {
      const work = slot.targetDurationSeconds ?? 40;
      const rest = slot.targetDurationSeconds != null && slot.targetSets == null ? 0 : (slot.restSeconds ?? 60);
      seconds += setCount(slot) * (work + rest);
    }
  }
  const minutes = seconds / 60;
  return minutes <= 10 ? Math.max(5, Math.round(minutes)) : Math.round(minutes / 5) * 5;
}
