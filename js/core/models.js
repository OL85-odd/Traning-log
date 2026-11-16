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
export const CATEGORIES = {
  strength: { name: 'Strength', icon: 'dumbbell', color: 'accent', dayType: 'strength' },
  cardio:   { name: 'Cardio',   icon: 'run',      color: 'blue',   dayType: 'cardio' },
  mobility: { name: 'Mobility', icon: 'flex',     color: 'purple', dayType: 'yogaStretch' },
  hiit:     { name: 'HIIT',     icon: 'bolt',     color: 'red',    dayType: 'hiit' },
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
export function newQuickSession(fields) {
  return { id: uuid(), exerciseID: null, minutes: 5, ...fields };
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
  };
}

/// Every exercise slot of a plan day, across its blocks.
export function slotsOf(planDay) {
  return (planDay?.blocks ?? []).flatMap(b => b.exercises);
}
