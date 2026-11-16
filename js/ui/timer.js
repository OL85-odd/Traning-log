// The interval timer: a full-screen countdown that walks through a list of
// work and rest intervals — a HIIT circuit, or a single timed set.
// Swift: (not ported yet)

import { html, useEffect, useRef, useState } from '../vendor/preact-htm.js';
import { format } from '../core/dates.js';
import { ExerciseIcon } from './common.js';
import { Icon } from './icons.js';

const READY_SECONDS = 5;

// MARK: - Sound and screen

let audio = null;

/// A short tone. Created lazily, and only ever after a tap (the timer is
/// opened by one), which is when browsers allow sound.
function beep(frequency = 880, seconds = 0.12) {
  try {
    audio ??= new (window.AudioContext || window.webkitAudioContext)();
    if (audio.state === 'suspended') audio.resume();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.18, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + seconds);
    oscillator.connect(gain).connect(audio.destination);
    oscillator.start();
    oscillator.stop(audio.currentTime + seconds);
  } catch {
    // No sound available: the timer still runs.
  }
}

/// Keeps the screen on while the timer is up.
function useWakeLock() {
  useEffect(() => {
    let lock = null, released = false;
    const acquire = async () => {
      try {
        lock = await navigator.wakeLock?.request('screen');
        if (released) lock?.release();
      } catch { /* not supported or not allowed: nothing to do */ }
    };
    const onVisible = () => { if (!document.hidden) acquire(); };
    acquire();
    document.addEventListener('visibilitychange', onVisible); // the lock is dropped when the tab is hidden
    return () => {
      released = true;
      document.removeEventListener('visibilitychange', onVisible);
      lock?.release?.();
    };
  }, []);
}

// MARK: - Timer

/// `steps`: [{ kind: 'work' | 'rest', seconds, exercise, round, rounds }].
/// `onWorkDone(step, seconds)` is called when a work interval ends — with the
/// seconds actually spent, which is less than planned if it was skipped.
/// `onClose()` when the user leaves, finished or not.
export function IntervalTimer({ steps, onWorkDone, onClose }) {
  // Step -1 is the "get ready" countdown before the first interval.
  const [index, setIndex] = useState(-1);
  const [endsAt, setEndsAt] = useState(() => Date.now() + READY_SECONDS * 1000);
  const [pausedLeft, setPausedLeft] = useState(null); // ms left while paused
  const [, redraw] = useState(0);
  const lastBeep = useRef(null);
  useWakeLock();

  const finished = index >= steps.length;
  const step = index >= 0 && !finished ? steps[index] : null;
  const total = step ? step.seconds : READY_SECONDS;
  const leftMs = finished ? 0 : pausedLeft ?? Math.max(0, endsAt - Date.now());
  const left = Math.ceil(leftMs / 1000);

  const goTo = next => {
    setIndex(next);
    setPausedLeft(null);
    lastBeep.current = null;
    if (next < steps.length) setEndsAt(Date.now() + steps[next].seconds * 1000);
  };

  /// Ends the current interval, by the clock (`skipped` false) or by the user.
  const advance = skipped => {
    if (step?.kind === 'work') {
      const spent = skipped ? Math.round((step.seconds * 1000 - leftMs) / 1000) : step.seconds;
      onWorkDone?.(step, spent);
    }
    const next = index + 1;
    if (next >= steps.length) { beep(1175, 0.5); navigator.vibrate?.([120, 80, 120, 80, 240]); }
    else { beep(steps[next].kind === 'work' ? 1175 : 660, 0.35); navigator.vibrate?.(steps[next].kind === 'work' ? 200 : [80, 60, 80]); }
    goTo(next);
  };

  useEffect(() => {
    if (finished || pausedLeft != null) return undefined;
    const tick = setInterval(() => {
      const ms = endsAt - Date.now();
      const seconds = Math.ceil(ms / 1000);
      if (ms <= 0) return advance(false);
      // Three short tones count the interval out.
      if (seconds <= 3 && lastBeep.current !== seconds) { lastBeep.current = seconds; beep(880, 0.1); }
      redraw(n => n + 1);
      return undefined;
    }, 200);
    return () => clearInterval(tick);
  }, [index, endsAt, pausedLeft, finished]);

  const togglePause = () => {
    if (pausedLeft != null) { setEndsAt(Date.now() + pausedLeft); setPausedLeft(null); }
    else setPausedLeft(leftMs);
  };

  // What is left of the whole thing, and what comes next.
  const remaining = steps.slice(Math.max(0, index + 1)).reduce((sum, s) => sum + s.seconds, 0) + (index >= 0 ? left : 0);
  const workSteps = steps.filter(s => s.kind === 'work');
  const workNumber = step ? steps.slice(0, index + 1).filter(s => s.kind === 'work').length : 0;
  const nextWork = steps.slice(index + 1).find(s => s.kind === 'work');
  const shown = step?.kind === 'rest' || index < 0 ? nextWork ?? steps[0] : step;

  if (finished) {
    return html`<div class="timer done" role="dialog" aria-modal="true">
      <div class="timer-main">
        <${Icon} name="check-circle-fill" size=${64} class="c-green" />
        <div class="t-title" style="margin-top:16px">Intervals done</div>
        <p class="mono t-sub c-subtle center" style="margin-top:8px;line-height:1.45">
          ${workSteps.length} ${workSteps.length === 1 ? 'interval' : 'intervals'} ticked off.<br />
          Add reps or weight to any of them if you counted.
        </p>
      </div>
      <div class="timer-controls"><button class="btn-primary" onClick=${onClose}>LOG RESULTS</button></div>
    </div>`;
  }

  const phase = index < 0 ? 'ready' : step.kind;
  const label = { ready: 'Get ready', work: 'Work', rest: 'Rest' }[phase];

  return html`<div class="timer ${phase}" role="dialog" aria-modal="true" aria-label="Interval timer">
    <div class="timer-top">
      <button class="navbar-btn" onClick=${onClose}>End</button>
      <span class="mono t-caption c-subtle">${format.clock(remaining)} left</span>
    </div>

    <div class="timer-main">
      <div class="timer-phase">${label}</div>
      <div class="timer-clock" role="timer" aria-live="off">${format.clock(left)}</div>
      <div class="timer-bar"><div class="timer-fill" style="width:${Math.max(0, Math.min(100, (leftMs / (total * 1000)) * 100))}%"></div></div>

      ${shown && html`<div class="row" style="gap:14px;margin-top:28px">
        <${ExerciseIcon} exercise=${shown.exercise} box=${64} img=${46} radius=${14} />
        <div style="min-width:0;text-align:left">
          ${phase !== 'work' && html`<div class="label">Next</div>`}
          <div class="t-title3 truncate">${shown.exercise?.name ?? 'Exercise'}</div>
          ${shown.rounds > 1 && html`<div class="mono t-caption c-subtle" style="margin-top:2px">Round ${shown.round} of ${shown.rounds}</div>`}
        </div>
      </div>`}
      ${workSteps.length > 1 && html`<div class="mono t-caption c-subtle" style="margin-top:18px">
        Interval ${Math.max(1, workNumber + (phase === 'work' ? 0 : 1))} of ${workSteps.length}
      </div>`}
    </div>

    <div class="timer-controls row" style="gap:10px">
      <button class="btn-soft tall" style="flex:1" onClick=${togglePause}>
        <${Icon} name=${pausedLeft != null ? 'play' : 'pause'} size=${15} />${pausedLeft != null ? 'Resume' : 'Pause'}
      </button>
      <button class="btn-soft tall" style="flex:1" onClick=${() => advance(true)}>
        <${Icon} name="forward" size=${15} />${index < 0 ? 'Start now' : 'Skip'}
      </button>
    </div>
  </div>`;
}
