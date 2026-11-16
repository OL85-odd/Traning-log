// The backup file: one JSON document the user stores themselves.
// Swift: OddForm/Models/BackupFile.swift + OddForm/Services/BackupService.swift
//
// The format is the iOS app's, field for field, so a file exported here
// imports there and the other way round. Two things matter for that:
//   - dates are ISO 8601 WITHOUT milliseconds (Swift's .iso8601 rejects them)
//   - every non-optional Swift field must be present (the factories guarantee it)
// `quickSessions` is a web addition; the iOS decoder ignores unknown keys.

import { toISO } from './dates.js';
import {
  defaultSettings, newBlock, newExercise, newPlan, newPlanDay, newQuickSession,
  newSession, newSetLog, newSlot,
} from './models.js';

export const BACKUP_VERSION = 1;

export function backupFileName(now = new Date()) {
  const p = n => String(n).padStart(2, '0');
  return `OddForm-${now.getFullYear()}-${p(now.getMonth() + 1)}-${p(now.getDate())}.oddform.json`;
}

export function makeBackup(state, now = new Date()) {
  return {
    version: BACKUP_VERSION,
    exportedAt: toISO(now),
    // The web app has no paid tier, and a backup must never be a way to
    // switch one on in the iPhone app.
    settings: { ...state.settings, isPro: false },
    exercises: state.exercises,
    plans: state.plans,
    sessions: state.sessions,
    quickSessions: state.quickSessions,
  };
}

/// Pretty-printed with sorted keys and without nulls, like the iOS encoder.
export function serializeBackup(backup) {
  return JSON.stringify(clean(backup), null, 2);
}

function clean(value) {
  if (Array.isArray(value)) return value.map(clean);
  if (value && typeof value === 'object') {
    const out = {};
    for (const key of Object.keys(value).sort()) {
      if (value[key] != null) out[key] = clean(value[key]);
    }
    return out;
  }
  return value;
}

export class BackupError extends Error {}

/// Reads backup text into a fully normalised backup object (every field
/// present, defaults filled in). Throws BackupError with a readable message.
export function parseBackup(text) {
  let raw;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new BackupError("This file isn't valid JSON, so it can't be an Odd Form backup.");
  }
  if (!raw || typeof raw !== 'object' || !Array.isArray(raw.plans) || !Array.isArray(raw.sessions)) {
    throw new BackupError("This doesn't look like an Odd Form backup file.");
  }
  if (raw.version > BACKUP_VERSION) {
    throw new BackupError(`Backup version ${raw.version} is newer than this app supports. Please update Odd Form.`);
  }
  return {
    version: raw.version ?? BACKUP_VERSION,
    exportedAt: raw.exportedAt ?? null,
    settings: { ...defaultSettings(), ...raw.settings },
    exercises: (raw.exercises ?? []).map(e => newExercise(e)),
    plans: raw.plans.map(normalizePlan),
    sessions: raw.sessions.map(normalizeSession),
    quickSessions: Array.isArray(raw.quickSessions) ? raw.quickSessions.map(q => newQuickSession(q)) : null,
  };
}

export function normalizePlan(plan) {
  return newPlan({
    ...plan,
    days: (plan.days ?? []).map(day => newPlanDay({
      ...day,
      blocks: (day.blocks ?? []).map(block => newBlock({
        ...block,
        exercises: (block.exercises ?? []).map(slot => newSlot(slot)),
      })),
    })),
  });
}

export function normalizeSession(session) {
  return newSession({
    ...session,
    sets: (session.sets ?? []).map(set => newSetLog(set)),
    feelModifiers: [...(session.feelModifiers ?? [])],
  });
}
