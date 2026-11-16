// Data model: the shapes stored on disk and written to a backup file.
// Swift: OddForm/Models/*.swift
//
// Field names, enum values and optionality match the Swift Codable structs
// one to one, so a `.oddform.json` backup moves between web and iOS unchanged.
// Optional values are `null` here and are simply left out of the exported file.

export function uuid() {
  const id = globalThis.crypto?.randomUUID
    ? globalThis.crypto.randomUUID()
    : 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
      });
  return id.toUpperCase(); // Swift encodes UUIDs in upper case
}

// MARK: - Enums and how they are shown

/// Swift: DayType (+ DayType+Display, Color+Theme)
export const DAY_TYPES = {
  strength:    { name: 'Strength',       icon: 'dumbbell', color: 'accent' },
  yogaStretch: { name: 'Yoga & Stretch', icon: 'flex',     color: 'purple' },
  cardio:      { name: 'Cardio',         icon: 'run',      color: 'blue' },
  interval:    { name: 'Interval',       icon: 'ecg',      color: 'blue' },
  hiit:        { name: 'HIIT',           icon: 'bolt',     color: 'red' },
  rest:        { name: 'Rest',           icon: 'moon',     color: 'subtle' },
};

/// Swift: ExerciseCategory (+ display helpers in LibraryView.swift)
/// `strength` is training with external load; `calisthenics` is bodyweight
/// strength. `yoga` and `mobility` both make a "Yoga & Stretch" day.
export const CATEGORIES = {
  strength:     { name: 'Strength',     icon: 'dumbbell', color: 'accent', dayType: 'strength' },
  calisthenics: { name: 'Calisthenics', icon: 'figure',   color: 'sand',   dayType: 'strength' },
  hiit:         { name: 'HIIT',         icon: 'bolt',     color: 'red',    dayType: 'hiit' },
  cardio:       { name: 'Cardio',       icon: 'run',      color: 'blue',   dayType: 'cardio' },
  yoga:         { name: 'Yoga',         icon: 'flex',     color: 'purple', dayType: 'yogaStretch' },
  mobility:     { name: 'Mobility',     icon: 'flex',     color: 'green',  dayType: 'yogaStretch' },
};

/// What an exercise needs. `none` is just you and the floor.
export const EQUIPMENT = {
  none: 'No equipment', mat: 'Mat', wall: 'Wall', bench: 'Bench or chair', box: 'Box or step',
  bar: 'Pull-up bar', dipBars: 'Dip bars', rings: 'Rings', band: 'Resistance band',
  dumbbells: 'Dumbbells', kettlebell: 'Kettlebell', barbell: 'Barbell', cable: 'Cable machine',
  machine: 'Machine', rope: 'Jump rope', ropes: 'Battle ropes', ball: 'Medicine ball', sled: 'Sled',
  bike: 'Bike', pool: 'Pool', block: 'Yoga block', strap: 'Strap', roller: 'Foam roller', other: 'Other',
};

/// Why a planned session was not done. Stored on the day's log as `skipReason`.
export const SKIP_REASONS = {
  sick:        { label: 'Sick',          icon: 'thermometer', color: 'red' },
  shortOnTime: { label: 'Short on time', icon: 'bolt',        color: 'sand' },
  tired:       { label: 'Tired',         icon: 'battery',     color: 'blue' },
  away:        { label: 'Away',          icon: 'calendar',    color: 'purple' },
  other:       { label: 'Other',         icon: 'moon',        color: 'subtle' },
};

/// Swift: MuscleGroup
export const MUSCLE_GROUPS = {
  chest: 'Chest', back: 'Back', shoulders: 'Shoulders', arms: 'Arms',
  core: 'Core', legs: 'Legs', fullBody: 'Full body',
};

/// Swift: ExerciseUnit. These are the stored raw values; what the user reads
/// and which units go with which field is in units.js.
export const UNITS = ['Reps', 'Sek', 'Min', 'Timer', 'm', 'km', 'mil'];

/// Swift: DayModifier. `priority` decides which one shows inside a timeline node.
export const MODIFIERS = {
  shortOnTime: { label: 'Short on time', icon: 'bolt',        color: 'sand',
                 hint: 'Logged as short on time.' },
  lowEnergy:   { label: 'Low energy',    icon: 'battery',     color: 'blue',
                 hint: 'Logged as low energy. Keep it light.' },
  fasting:     { label: 'Fasting',       icon: 'leaf',        color: 'green',
                 hint: 'Logged as fasting.' },
  sick:        { label: 'Sick',          icon: 'thermometer', color: 'red',
                 hint: 'Logged as sick. Rest up.' },
};
export const MODIFIER_PRIORITY = ['sick', 'fasting', 'lowEnergy', 'shortOnTime'];

export const WEEKDAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

// MARK: - Factories (the Swift structs' memberwise inits, defaults included)

/// Swift: Exercise
export function newExercise(fields) {
  return {
    id: uuid(), name: '', category: 'strength', muscleGroups: [],
    isCustom: false, notes: '', instructions: [], tips: [], customIconName: null,
    // Web additions (ignored by an iOS build that does not know them):
    // what it needs, what you naturally count ('reps' | 'time' | 'distance'),
    // how hard it is (1-3), and which tier it belongs to ('free' | 'pro').
    equipment: 'none', tracking: 'reps', level: 1, tier: 'free',
    ...fields,
  };
}

/// Swift: ExerciseInBlockTemplate
export function newSlot(fields) {
  return {
    id: uuid(), exerciseID: null,
    targetSets: null, targetReps: null, targetDurationSeconds: null, targetWeightKg: null,
    restSeconds: 60, notes: '', unit1: 'Reps', unit2: 'Sek',
    ...fields,
  };
}

/// Swift: ExerciseBlockTemplate
export function newBlock(fields) {
  return { id: uuid(), blockName: '', exercises: [], ...fields };
}

/// Swift: PlanDayTemplate
export function newPlanDay(fields) {
  return {
    id: uuid(), weekNumber: null, dayOfWeek: null, dayIndex: null,
    dayType: 'rest', blocks: [], notes: '',
    ...fields,
  };
}

/// Swift: PlanTemplate
export function newPlan(fields) {
  return {
    id: uuid(), name: '', planMode: 'weeklyCycle', days: [], isCustom: false, notes: '',
    progressionEnabled: false, progressionPauseCount: 0, progressionLastPausedMonth: null,
    // Web additions: what a template is for, so the first-run guide can
    // suggest one. `focus` is a CATEGORIES id or 'mix'.
    summary: '', level: 1, equipment: 'none', focus: 'strength', tier: 'free',
    ...fields,
  };
}

/// Swift: SessionLog. Dates are ISO strings.
///
/// `planDayTemplateID` is null for a quick session — one that is not the
/// day's planned workout. `plannedSets` and `title` are filled in when the
/// session is finished: a snapshot of what the plan asked for that day, so
/// history stays true after the plan is edited or swapped for another.
export function newSession(fields) {
  return {
    id: uuid(), date: null, planTemplateID: null, planDayTemplateID: null,
    dayType: 'strength', startedAt: null, completedAt: null, energyLevel: null,
    sets: [], notes: '', didBackup: false, feelModifiers: [],
    plannedSets: null, title: null,
    // Set when the planned session was skipped on purpose: a SKIP_REASONS id.
    skipReason: null,
    ...fields,
  };
}

/// Swift: ExerciseSetLog
export function newSetLog(fields) {
  return {
    id: uuid(), exerciseID: null, setNumber: 1,
    repsCompleted: null, weightKg: null, durationSeconds: null,
    isCompleted: false, notes: '',
    ...fields,
  };
}

/// Swift: QuickSession (QuickSessionsSection.swift)
///
/// A quick session is one exercise with the target you actually mean:
/// "12 push-ups" (`reps`, optionally `sets`) or "5 min HIIT" (`minutes`).
/// `reps` set means it is counted; otherwise it is timed. `minutes` is always
/// present because the iOS struct requires it.
export function newQuickSession(fields) {
  return { id: uuid(), exerciseID: null, minutes: 5, sets: null, reps: null, ...fields };
}

/// Swift: UserSettings
export function defaultSettings() {
  const reminder = new Date();
  reminder.setHours(8, 0, 0, 0);
  return {
    isPro: false, preferredUnit: 'kg', reminderEnabled: false,
    reminderTime: reminder.toISOString().replace(/\.\d{3}Z$/, 'Z'),
    lastBackupDate: null, onboardingCompleted: false,
    activePlanID: null, activePlanStartDate: null,
    // Web additions: 'system' | 'dark' | 'light', and which built-in content
    // this device has already been given (see store.js).
    theme: 'system', contentVersion: 0,
  };
}

/// Every exercise slot of a plan day, across its blocks.
export function slotsOf(planDay) {
  return (planDay?.blocks ?? []).flatMap(b => b.exercises);
}
