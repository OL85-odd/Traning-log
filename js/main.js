// App entry: the four tabs, the active-session cover, and PWA set-up.
// Swift: OddForm/OddFormApp.swift + OddForm/ContentView.swift

import { html, render, useEffect, useReducer, useState } from './vendor/preact-htm.js';
import { useStore } from './ui/common.js';
import { Icon } from './ui/icons.js';
import { LibraryView } from './ui/library.js';
import { Onboarding } from './ui/onboarding.js';
import { PlanView } from './ui/plan.js';
import { ActiveSessionView } from './ui/session.js';
import { SettingsView } from './ui/settings.js';
import { TodayView } from './ui/today.js';

const TABS = [
  { id: 'today', label: 'Today', icon: 'calendar', view: TodayView },
  { id: 'plan', label: 'Plan', icon: 'plan', view: PlanView },
  { id: 'library', label: 'Library', icon: 'library', view: LibraryView },
  { id: 'settings', label: 'Settings', icon: 'settings', view: SettingsView },
];

function App() {
  const store = useStore();
  const [tab, setTab] = useState('today');

  // "Today" moves on while the app sits in the background: redraw when it
  // comes back to the front.
  const [, redraw] = useReducer(n => n + 1, 0);
  useEffect(() => {
    const onVisible = () => { if (!document.hidden) redraw(); };
    document.addEventListener('visibilitychange', onVisible);
    return () => document.removeEventListener('visibilitychange', onVisible);
  }, []);

  // Settings → Appearance: 'dark' and 'light' are set on <html>; 'system'
  // sets nothing and lets the stylesheet follow the device.
  const theme = store.state.settings.theme ?? 'system';
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') delete root.dataset.theme; else root.dataset.theme = theme;
    // The browser chrome (status bar, address bar) takes the page background.
    const background = getComputedStyle(root).getPropertyValue('--bg').trim();
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', background);
  }, [theme]);

  const View = TABS.find(t => t.id === tab).view;

  return html`
    <${View} key=${tab} />
    <nav class="tabbar">
      ${TABS.map(t => html`
        <button class="tab ${t.id === tab ? 'active' : ''}" aria-current=${t.id === tab ? 'page' : undefined}
          onClick=${() => setTab(t.id)}>
          <${Icon} name=${t.icon} size=${24} weight=${1.6} />${t.label}
        </button>`)}
    </nav>
    ${store.state.activeSession && html`<${ActiveSessionView} key=${store.state.activeSession.id} />`}
    ${!store.state.settings.onboardingCompleted && html`<${Onboarding} />`}`;
}

render(html`<${App} />`, document.getElementById('app'));

// MARK: - PWA

// Ask the browser not to evict our data under storage pressure.
navigator.storage?.persist?.().catch(() => {});

if ('serviceWorker' in navigator && location.protocol === 'https:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}
