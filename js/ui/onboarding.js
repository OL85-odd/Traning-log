// The first-run guide: three questions, a suggested plan, and how the app works.
// Swift: (not ported yet)

import { html, useState } from '../vendor/preact-htm.js';
import { CATEGORIES, DAY_TYPES, WEEKDAY_NAMES, slotsOf } from '../core/models.js';
import { daysPerWeek, recommendPlans } from '../core/recommend.js';
import { ExerciseIcon, Portal, slotDescription, store } from './common.js';
import { Icon } from './icons.js';
import { CreatePlanSheet } from './planPicker.js';

const FOCUS = [
  { id: 'calisthenics', label: 'Bodyweight strength', hint: 'Push-ups, squats, pull-ups — no weights needed', icon: 'figure', color: 'sand' },
  { id: 'strength', label: 'Strength with weights', hint: 'Dumbbells, kettlebell or a gym', icon: 'dumbbell', color: 'accent' },
  { id: 'hiit', label: 'HIIT', hint: 'Short, hard intervals against the clock', icon: 'bolt', color: 'red' },
  { id: 'yoga', label: 'Yoga & mobility', hint: 'Flexibility, balance and calm', icon: 'flex', color: 'purple' },
  { id: 'cardio', label: 'Cardio', hint: 'Walking, running, cycling', icon: 'run', color: 'blue' },
  { id: 'mix', label: 'A bit of everything', hint: 'General fitness', icon: 'trend', color: 'green' },
];

const KIT = [
  { id: 'dumbbells', label: 'Dumbbells' },
  { id: 'bar', label: 'Pull-up bar' },
  { id: 'kettlebell', label: 'Kettlebell' },
  { id: 'gym', label: 'A gym' },
];

const STEPS = ['welcome', 'focus', 'kit', 'days', 'plan', 'tour'];

export function Onboarding() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ focus: null, equipment: [], days: 3 });
  const [choice, setChoice] = useState(0); // which of the suggestions is picked
  const [building, setBuilding] = useState(false); // the "build your own" sheet is up
  const name = STEPS[step];

  const finish = () => store.updateSettings({ onboardingCompleted: true });
  const next = () => setStep(step + 1);
  const back = () => setStep(step - 1);

  const suggestions = name === 'plan' || name === 'tour'
    ? recommendPlans(answers, store.state.plans).slice(0, 3)
    : [];
  const plan = suggestions[choice] ?? suggestions[0];

  const startPlan = () => {
    if (plan) store.setActivePlan(plan, { restart: true });
    next();
  };

  // A plan built from the guide starts today, like a suggested one would.
  const startOwnPlan = own => {
    store.setActivePlan(own, { restart: true });
    setStep(STEPS.indexOf('tour'));
  };

  const toggleKit = id => setAnswers({
    ...answers,
    equipment: answers.equipment.includes(id) ? answers.equipment.filter(k => k !== id) : [...answers.equipment, id],
  });

  let body, primary, secondary;
  if (name === 'welcome') {
    body = html`
      <div class="ob-hero">
        <img src="icons/icon-192.png" width="72" height="72" alt="" style="border-radius:18px" />
        <h1 class="t-title" style="margin-top:20px">Welcome to Odd Form</h1>
        <p class="t-sub c-subtle" style="margin-top:8px;line-height:1.45">Train offline. Own your data.</p>
      </div>
      <div class="col" style="gap:16px">
        ${point('calendar', 'Follow a plan', 'Each day shows what to do. Tick the sets off as you go.')}
        ${point('trend', 'See your progress', 'Every exercise you log gets a chart.')}
        ${point('drive', 'Your data stays with you', 'Nothing leaves this device. Export a backup when you like.')}
      </div>`;
    primary = { label: 'SET UP MY FIRST PLAN', onClick: next };
  } else if (name === 'focus') {
    body = html`
      ${heading('What do you want to train?', 'You can change plans at any time.')}
      <div class="col" style="gap:8px">
        ${FOCUS.map(option => html`
          <button class="option-row ${answers.focus === option.id ? 'selected' : ''}"
            onClick=${() => setAnswers({ ...answers, focus: option.id })}>
            <span class="c-${option.color}" style="width:26px;display:grid;place-items:center"><${Icon} name=${option.icon} size=${20} /></span>
            <span style="flex:1;text-align:left">
              <span class="medium" style="display:block">${option.label}</span>
              <span class="mono t-caption2 c-subtle" style="display:block;margin-top:2px">${option.hint}</span>
            </span>
            ${answers.focus === option.id && html`<${Icon} name="check" size=${16} weight=${2.4} class="c-accent" />`}
          </button>`)}
      </div>`;
    primary = { label: 'NEXT', onClick: next, disabled: !answers.focus };
  } else if (name === 'kit') {
    body = html`
      ${heading('What do you have to train with?', 'Pick all that apply — or nothing at all.')}
      <div class="col" style="gap:8px">
        ${KIT.map(option => html`
          <button class="option-row ${answers.equipment.includes(option.id) ? 'selected' : ''}"
            aria-pressed=${String(answers.equipment.includes(option.id))} onClick=${() => toggleKit(option.id)}>
            <span style="flex:1;text-align:left">${option.label}</span>
            ${answers.equipment.includes(option.id) && html`<${Icon} name="check" size=${16} weight=${2.4} class="c-accent" />`}
          </button>`)}
      </div>
      <p class="mono t-caption c-subtle center" style="margin-top:14px">
        ${answers.equipment.length === 0 ? 'Nothing selected: you will get a plan that needs no equipment.' : ' '}
      </p>`;
    primary = { label: 'NEXT', onClick: next };
  } else if (name === 'days') {
    body = html`
      ${heading('How many days a week?', 'Be honest rather than ambitious. A plan you keep beats a plan you admire.')}
      <div class="row" style="gap:8px;justify-content:center">
        ${[2, 3, 4, 5].map(n => html`
          <button class="ob-day ${answers.days === n ? 'selected' : ''}" onClick=${() => setAnswers({ ...answers, days: n })}>${n}</button>`)}
      </div>`;
    primary = { label: 'SHOW MY PLAN', onClick: () => { setChoice(0); next(); } };
  } else if (name === 'plan') {
    body = plan ? html`
      ${heading('Here is a plan for you', 'It starts today. Everything in it can be edited later.')}
      ${suggestions.length > 1 && html`<div class="chip-row" style="padding:0 0 12px;margin:0 calc(-1 * var(--gutter))">
        ${suggestions.map((s, i) => html`<button class="chip ${i === choice ? 'selected' : ''}" onClick=${() => setChoice(i)}>${s.name}</button>`)}
      </div>`}
      <${PlanPreview} plan=${plan} />` : html`${heading('No plan fits yet', 'Build your own below, or skip and do it later from the Plan tab.')}`;
    primary = { label: plan ? 'START THIS PLAN' : 'CONTINUE', onClick: startPlan };
    secondary = { label: 'Build your own plan instead', onClick: () => setBuilding(true) };
  } else {
    body = html`
      ${heading('How it works', 'Three things worth knowing before you start.')}
      <div class="col" style="gap:18px">
        ${point('check-circle', 'Tick a set to log it', 'Ticking means you did it as planned. Type a number only when it was different.')}
        ${point('timer', 'Timers are built in', 'Interval days run as a countdown. Any timed set has a timer button.')}
        ${point('plus-circle', 'Log anything, any time', '“Quick sessions” on the Today tab log one exercise on its own — 12 push-ups or a 5 minute stretch.')}
        ${point('drive', 'Back up now and then', 'The small drive at the top of Today turns from green to red as your last backup gets old.')}
      </div>`;
    primary = { label: 'START TRAINING', onClick: finish };
  }

  return html`<${Portal}>
    <div class="cover onboarding" role="dialog" aria-modal="true" aria-label="Welcome">
      <div class="navbar">
        <div>${step > 0 && name !== 'tour' && html`<button class="navbar-btn" onClick=${back}>Back</button>`}</div>
        <div class="ob-dots" aria-hidden="true">${STEPS.map((_, i) => html`<i class=${i === step ? 'on' : ''}></i>`)}</div>
        <div>${name !== 'tour' && html`<button class="navbar-btn" onClick=${finish}>Skip</button>`}</div>
      </div>
      <div class="sheet-body"><div class="ob-body">${body}</div></div>
      <div class="ob-foot">
        <button class="btn-primary" disabled=${primary.disabled} onClick=${primary.onClick}>${primary.label}</button>
        ${secondary && html`<button class="link ob-second" onClick=${secondary.onClick}>${secondary.label}</button>`}
      </div>
    </div>
    ${building && html`<${CreatePlanSheet} onClose=${() => setBuilding(false)} onCreated=${startOwnPlan} />`}
  <//>`;
}

const heading = (title, sub) => html`<div style="padding:8px 0 20px">
  <h1 class="t-title">${title}</h1>
  <p class="t-sub c-subtle" style="margin-top:8px;line-height:1.45">${sub}</p>
</div>`;

const point = (icon, title, text) => html`<div class="row" style="gap:14px;align-items:flex-start">
  <span class="c-accent" style="padding-top:2px"><${Icon} name=${icon} size=${22} /></span>
  <div>
    <div class="medium">${title}</div>
    <div class="t-sub c-subtle" style="margin-top:2px;line-height:1.4">${text}</div>
  </div>
</div>`;

/// The suggested plan, laid out day by day.
function PlanPreview({ plan }) {
  const days = plan.days.filter(d => d.dayType !== 'rest').slice(0, 7);
  const label = day => (day.dayOfWeek != null ? WEEKDAY_NAMES[day.dayOfWeek - 1] : `Day ${(day.dayIndex ?? 0) + 1}`);
  return html`<div class="col" style="gap:12px">
    <div class="card" style="padding:14px">
      <div class="row" style="gap:8px;flex-wrap:wrap">
        <span class="t-title3">${plan.name}</span>
        <span class="tag">${daysPerWeek(plan)} DAYS / WEEK</span>
      </div>
      ${plan.summary && html`<p class="t-sub c-subtle" style="margin-top:6px;line-height:1.4">${plan.summary}</p>`}
    </div>
    ${days.map(day => html`<div key=${day.id} class="card" style="padding:12px 14px">
      <div class="row" style="gap:8px">
        <span class="mono t-caption c-${DAY_TYPES[day.dayType].color}">${label(day)}</span>
        <span class="t-sub medium">${day.blocks[0]?.blockName || DAY_TYPES[day.dayType].name}</span>
      </div>
      <div class="col" style="gap:8px;margin-top:10px">
        ${slotsOf(day).map(slot => {
          const exercise = store.exerciseByID(slot.exerciseID);
          return exercise && html`<div class="row" style="gap:10px">
            <${ExerciseIcon} exercise=${exercise} box=${40} img=${28} radius=${9} />
            <span class="t-sub" style="flex:1;min-width:0">${exercise.name}</span>
            <span class="mono t-caption2 c-subtle">${slotDescription(slot, store.state.settings.preferredUnit)}</span>
          </div>`;
        })}
      </div>
    </div>`)}
    ${plan.planMode === 'finiteProgram' && html`<p class="mono t-caption2 c-subtle center">First week shown. The program runs ${Math.ceil(plan.days.length / 7)} weeks.</p>`}
  </div>`;
}

// (CATEGORIES is imported so the focus ids stay in step with the model.)
void CATEGORIES;
