// Built-in exercises and plans.
// Swift: OddForm/Models/BuiltInContent.swift
//
// The content itself lives in data/exercises.js and data/plans.js; this file
// turns it into the library and the plan templates the rest of the app uses.
//
// Exercise IDs are fixed (and, for the original 33, identical to the iOS
// app), so plans and session logs in a backup file point at the same
// exercises on every device.

import { EXERCISE_DATA } from './data/exercises.js';
import { DRAWN_ICONS, FIGURE_ICONS } from './data/icons.js';
import { PLAN_DATA } from './data/plans.js';
import { newBlock, newExercise, newPlan, newPlanDay, newSlot } from './models.js';

// MARK: - Exercises

export const BUILT_IN_EXERCISES = EXERCISE_DATA.map(({ icon, ...fields }) => newExercise(fields));

const KNOWN_ICONS = new Set(DRAWN_ICONS);
const FIGURES = new Set(FIGURE_ICONS);

/// Whether a picture file is a figure with its working muscles (two layers,
/// see tools/make-icons.py) rather than an older one-colour pictogram.
export const isFigureIcon = asset => FIGURES.has(asset);

/// Exercise name -> pictogram file (without extension) in img/exercises/.
/// Each exercise has a drawing of its own or none at all: one that is not
/// drawn yet (see tools/make-icons.py) shows its category glyph, never
/// another exercise's picture.
/// Swift: Exercise.iconAssetName
export const ICON_MAP = Object.fromEntries(
  EXERCISE_DATA.filter(e => KNOWN_ICONS.has(e.icon)).map(e => [e.name, e.icon]));

/// Every icon a custom exercise can pick. Swift: IconPickerSheet.allIcons
export const ALL_ICONS = Object.values(ICON_MAP);

/// Icon names from before the pictograms were redrawn, where the file name changed.
const RENAMED_ICONS = {
  'exercise-situp': 'exercise-sit-up',
  'exercise-lunges': 'exercise-lunge',
  'exercise-burpees': 'exercise-burpee',
  'exercise-glute-march': 'exercise-glute-bridge-march',
  'exercise-skipping-rope': 'exercise-jump-rope',
  'exercise-spinning': 'exercise-indoor-cycling',
  'exercise-rowing': 'exercise-indoor-rowing',
  'exercise-farmers-carry': 'exercise-farmers-carry',
};

/// The pictogram for an exercise, or null to fall back to its category glyph.
/// A custom exercise may carry an icon name this version no longer has (an
/// older backup, or one made on iOS): that is a fallback too, not a hole.
export function iconAssetName(exercise) {
  if (!exercise) return null;
  const custom = exercise.customIconName;
  if (custom) {
    const name = RENAMED_ICONS[custom] ?? custom;
    return KNOWN_ICONS.has(name) ? name : null;
  }
  return ICON_MAP[exercise.name] ?? null;
}

const byName = name => {
  const exercise = BUILT_IN_EXERCISES.find(e => e.name === name);
  if (!exercise) throw new Error(`Built-in plan refers to an unknown exercise: ${name}`);
  return exercise;
};
const slot = (name, targets) => newSlot({ exerciseID: byName(name).id, ...targets });

// MARK: - Built-in plans
// Plan/day/slot IDs are generated fresh, exactly as on iOS — the store saves
// them on first launch so they stay stable from then on.

/// Bodyweight only: nothing here needs a bar, a bench or a gym.
function homeMaintenance() {
  return newPlan({
    name: 'Home Maintenance',
    summary: 'Two short bodyweight sessions and one run a week — for keeping in shape at home with no equipment.',
    focus: 'mix', level: 1, equipment: 'none', tier: 'free',
    planMode: 'weeklyCycle',
    days: [
      newPlanDay({ dayOfWeek: 1, dayType: 'strength', blocks: [
        newBlock({ blockName: 'Full Body A', exercises: [
          slot('Squat', { targetSets: 3, targetReps: 10 }),
          slot('Push-up', { targetSets: 3, targetReps: 8 }),
          slot('Plank', { targetSets: 3, targetDurationSeconds: 45 }),
        ] }),
      ] }),
      newPlanDay({ dayOfWeek: 2, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 3, dayType: 'cardio', blocks: [
        newBlock({ blockName: 'Cardio', exercises: [
          slot('Running', { targetDurationSeconds: 1800, unit2: 'Min' }),
        ] }),
      ] }),
      newPlanDay({ dayOfWeek: 4, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 5, dayType: 'strength', blocks: [
        newBlock({ blockName: 'Full Body B', exercises: [
          slot('Lunge', { targetSets: 3, targetReps: 10 }),
          slot('Glute Bridge', { targetSets: 3, targetReps: 12 }),
          slot('Superman', { targetSets: 3, targetReps: 10 }),
        ] }),
      ] }),
      newPlanDay({ dayOfWeek: 6, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 7, dayType: 'rest' }),
    ],
  });
}

function beginnerStrength() {
  const strengthDay = (index, blockName, sets, primary, secondary, accessory) =>
    newPlanDay({ dayIndex: index, dayType: 'strength', blocks: [
      newBlock({ blockName, exercises: [
        slot(primary, { targetSets: sets, targetReps: 5 }),
        slot(secondary, { targetSets: sets, targetReps: 5 }),
        slot(accessory, { targetSets: 3, targetReps: 10 }),
      ] }),
    ] });
  const restDay = index => newPlanDay({ dayIndex: index, dayType: 'rest' });

  const days = [];
  for (let week = 0; week < 4; week++) {
    const base = week * 7;
    const sets = 3 + (week < 2 ? 0 : 1);
    days.push(strengthDay(base + 0, `Week ${week + 1} · Workout A`, sets, 'Back Squat', 'Bench Press', 'Plank'));
    days.push(restDay(base + 1));
    days.push(strengthDay(base + 2, `Week ${week + 1} · Workout B`, sets, 'Back Squat', 'Overhead Press', 'Pull-up'));
    days.push(restDay(base + 3));
    days.push(strengthDay(base + 4, `Week ${week + 1} · Workout A`, sets, 'Deadlift', 'Bench Press', 'Push-up'));
    days.push(restDay(base + 5));
    days.push(restDay(base + 6));
  }
  return newPlan({
    name: 'Beginner Strength',
    summary: 'A four-week barbell program built on the big lifts, three sessions a week — for someone new to lifting with access to a rack.',
    focus: 'strength', level: 1, equipment: 'barbell', tier: 'free',
    planMode: 'finiteProgram', days,
  });
}

function mobilityAndStretch() {
  return newPlan({
    name: 'Mobility & Stretch',
    summary: 'Two five-minute stretching sessions a week to loosen hips and back.',
    focus: 'yoga', level: 1, equipment: 'none', tier: 'free',
    planMode: 'weeklyCycle',
    days: [
      newPlanDay({ dayOfWeek: 2, dayType: 'yogaStretch', blocks: [
        newBlock({ blockName: 'Morning Mobility', exercises: [
          slot('Cat-Cow', { targetSets: 2, targetReps: 10 }),
          slot('Hip Flexor Stretch', { targetDurationSeconds: 60 }),
        ] }),
      ] }),
      newPlanDay({ dayOfWeek: 3, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 4, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 5, dayType: 'yogaStretch', blocks: [
        newBlock({ blockName: 'Evening Stretch', exercises: [
          slot('Hip Flexor Stretch', { targetDurationSeconds: 90 }),
          slot('Cat-Cow', { targetSets: 2, targetReps: 10 }),
        ] }),
      ] }),
      newPlanDay({ dayOfWeek: 1, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 6, dayType: 'rest' }),
      newPlanDay({ dayOfWeek: 7, dayType: 'rest' }),
    ],
  });
}

/// A template from data/plans.js as a weekly plan: its listed days as
/// training days, every other weekday as rest.
function planFromData(data) {
  const training = new Map(data.days.map(day => [day.dayOfWeek, day]));
  const days = [1, 2, 3, 4, 5, 6, 7].map(dayOfWeek => {
    const day = training.get(dayOfWeek);
    if (!day) return newPlanDay({ dayOfWeek, dayType: 'rest' });
    return newPlanDay({ dayOfWeek, dayType: day.dayType, blocks: [
      newBlock({ blockName: day.title, exercises: day.exercises.map(item => slot(item.name, slotTargets(item, day.dayType))) }),
    ] });
  });
  return newPlan({
    name: data.name, summary: data.summary, focus: data.focus, level: data.level,
    equipment: data.equipment, tier: data.tier, planMode: 'weeklyCycle', days,
  });
}

/// { sets, reps | seconds, restSeconds } -> the slot's target fields.
function slotTargets(item, dayType) {
  if (item.reps != null) {
    return { targetSets: item.sets ?? 1, targetReps: item.reps, ...(item.restSeconds != null && { restSeconds: item.restSeconds }) };
  }
  const seconds = item.seconds ?? 30;
  // One long steady effort (a 30 minute run) is not "1 set": it has no sets.
  const steady = dayType === 'cardio' && (item.sets ?? 1) === 1;
  return {
    targetSets: steady ? null : (item.sets ?? 1),
    targetDurationSeconds: seconds,
    unit2: seconds >= 600 && seconds % 60 === 0 ? 'Min' : 'Sek',
    restSeconds: item.restSeconds ?? (dayType === 'yogaStretch' ? 10 : dayType === 'hiit' ? 15 : 60),
  };
}

/// Swift: PlanTemplate.builtIn — a fresh copy (new IDs) on every call.
export function builtInPlans() {
  return [homeMaintenance(), beginnerStrength(), mobilityAndStretch(), ...PLAN_DATA.map(planFromData)];
}
