// The Settings tab, plus backup export and import.
// Swift: OddForm/Features/Settings/*

import { html, useRef, useState } from '../vendor/preact-htm.js';
import { BackupError, backupFileName, makeBackup, parseBackup, serializeBackup } from '../core/backup.js';
import { format } from '../core/dates.js';
import { Alert, Sheet, store } from './common.js';
import { Icon } from './icons.js';
import { PlanPickerSheet } from './planPicker.js';

export const APP_VERSION = '1.0';

/// Settings → Appearance. "System" follows the device's light or dark mode.
const THEMES = { system: 'System', dark: 'Dark', light: 'Light' };

export function SettingsView() {
  const [sheet, setSheet] = useState(null); // 'plan' | 'export' | 'import'
  const settings = store.state.settings;
  const backupAge = store.daysSinceLastBackup;
  const close = () => setSheet(null);

  const chevron = html`<${Icon} name="chevron-right" size=${13} weight=${2.2} class="c-subtle" />`;

  return html`<div class="screen"><div class="scroll">
    <h1 class="t-title" style="font-size:34px;padding:16px var(--gutter) 0">Settings</h1>
    <div class="list">

      <div class="list-header">Training</div>
      <div class="list-group">
        <button class="list-row" onClick=${() => setSheet('plan')}>
          <span>Active plan</span><span class="spacer"></span>
          <span class="c-accent truncate" style="max-width:55%">${store.activePlan?.name ?? 'None'}</span>${chevron}
        </button>
        ${settings.activePlanStartDate && html`<div class="list-row">
          <span>Started</span><span class="spacer"></span>
          <span class="list-value">${format.mediumDate(settings.activePlanStartDate)}</span>
        </div>`}
      </div>

      <div class="list-header">Backup</div>
      <div class="list-group">
        <button class="list-row" onClick=${() => setSheet('export')}><span>Export backup</span><span class="spacer"></span>${chevron}</button>
        <button class="list-row" onClick=${() => setSheet('import')}><span>Import backup</span><span class="spacer"></span>${chevron}</button>
        <div class="list-row">
          <span>Last backup</span><span class="spacer"></span>
          <span class="list-value ${backupAge == null || backupAge > 30 ? 'c-sand' : ''}">
            ${backupAge == null ? 'Never' : backupAge === 0 ? 'Today' : `${backupAge}d ago`}
          </span>
        </div>
      </div>

      <div class="list-header">General</div>
      <div class="list-group">
        <label class="list-row">
          <span>Appearance</span><span class="spacer"></span>
          <span class="select-wrap">
            ${THEMES[settings.theme] ?? THEMES.system}<${Icon} name="chevrons-updown" size=${13} weight=${2.2} />
            <select value=${settings.theme ?? 'system'} aria-label="Appearance"
              onChange=${e => store.updateSettings({ theme: e.target.value })}>
              ${Object.entries(THEMES).map(([id, name]) => html`<option value=${id}>${name}</option>`)}
            </select>
          </span>
        </label>
        <label class="list-row">
          <span>Weight unit</span><span class="spacer"></span>
          <span class="select-wrap">
            ${settings.preferredUnit.toUpperCase()}<${Icon} name="chevrons-updown" size=${13} weight=${2.2} />
            <select value=${settings.preferredUnit} aria-label="Weight unit"
              onChange=${e => store.updateSettings({ preferredUnit: e.target.value })}>
              <option value="kg">KG</option><option value="lbs">LBS</option>
            </select>
          </span>
        </label>
      </div>

      <div class="list-header">About</div>
      <div class="list-group">
        <div class="list-row"><span>Version</span><span class="spacer"></span><span class="list-value">${APP_VERSION} · web</span></div>
        <a class="list-row" href="https://odd-solution-web.vercel.app/privacy" target="_blank" rel="noopener">Privacy policy</a>
      </div>

      <p class="mono t-caption2 c-subtle" style="padding:14px 16px 0;line-height:1.5">
        Your data is stored in this browser on this device only. Export a backup to keep a copy.
        ${store.saveError && html`<br /><span class="c-red">Saving failed — storage is full or blocked. Export a backup now.</span>`}
      </p>
    </div>

    ${sheet === 'plan' && html`<${PlanPickerSheet} onClose=${close} />`}
    ${sheet === 'export' && html`<${BackupExportSheet} onClose=${close} />`}
    ${sheet === 'import' && html`<${ImportBackupSheet} onClose=${close} />`}
  </div></div>`;
}

// MARK: - Export (Swift: BackupExportSheet)

/// Hands the file to the system share sheet where that exists (iPhone: "Save
/// to Files"), and falls back to a plain download elsewhere.
async function deliverFile(name, text) {
  const file = new File([text], name, { type: 'application/json' });
  if (navigator.canShare?.({ files: [file] })) {
    try {
      await navigator.share({ files: [file] });
      return true;
    } catch (error) {
      if (error.name === 'AbortError') return false; // the user closed the share sheet
      // any other failure: fall through to a download
    }
  }
  const url = URL.createObjectURL(file);
  const link = Object.assign(document.createElement('a'), { href: url, download: name });
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
  return true;
}

export function BackupExportSheet({ onClose }) {
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const exportNow = async () => {
    setBusy(true);
    setError(null);
    try {
      const delivered = await deliverFile(backupFileName(), serializeBackup(makeBackup(store.state)));
      if (delivered) {
        store.markBackedUp();
        setDone(true);
      }
    } catch (e) {
      setError(e.message);
    }
    setBusy(false);
  };

  return html`<${Sheet} size="medium" left=${{ label: done ? 'Done' : 'Cancel', onClick: onClose }} onClose=${onClose}>
    <div class="hero-sheet">
      <${Icon} name="drive" size=${60} weight=${1.3} class="c-accent" />
      <div>
        <div class="t-title2">${done ? 'Backup Exported' : 'Export Backup'}</div>
        <p class="t-sub c-subtle" style="margin-top:8px;line-height:1.4">
          Creates a .oddform.json file you can store in iCloud Drive, Files, or anywhere you like.
          The same file opens in the iPhone app.
        </p>
      </div>
      ${error && html`<p class="t-caption c-red">${error}</p>`}
      <button class="btn-primary" style="letter-spacing:0" disabled=${busy} onClick=${exportNow}>
        <${Icon} name="upload" size=${17} />${busy ? 'Exporting…' : done ? 'Export again' : 'Export now'}
      </button>
    </div>
  <//>`;
}

// MARK: - Import (Swift: ImportBackupSheet)

function ImportBackupSheet({ onClose }) {
  const fileInput = useRef(null);
  const [pending, setPending] = useState(null); // parsed backup awaiting confirmation
  const [error, setError] = useState(null);
  const [imported, setImported] = useState(false);

  const pickFile = async event => {
    const file = event.target.files[0];
    event.target.value = ''; // so choosing the same file again still fires
    if (!file) return;
    setError(null);
    try {
      setPending(parseBackup(await file.text()));
    } catch (e) {
      setError(e instanceof BackupError ? e.message : "This file couldn't be read.");
    }
  };

  const count = (n, word) => `${n} ${word}${n === 1 ? '' : 's'}`;

  return html`<${Sheet} size="medium" left=${{ label: imported ? 'Done' : 'Cancel', onClick: onClose }} onClose=${onClose}>
    <div class="hero-sheet">
      <${Icon} name="download" size=${60} weight=${1.3} class="c-accent" />
      <div>
        <div class="t-title2">${imported ? 'Backup Restored' : 'Import Backup'}</div>
        <p class="t-sub c-subtle" style="margin-top:8px;line-height:1.4">
          ${imported
            ? 'Your data has been restored to this device.'
            : 'Choose a .oddform.json backup file. This replaces all data currently on this device.'}
        </p>
      </div>
      ${error && html`<p class="t-caption c-red">${error}</p>`}
      ${!imported && html`
        <button class="btn-primary" style="letter-spacing:0" onClick=${() => fileInput.current.click()}>
          <${Icon} name="doc-plus" size=${17} />Choose file
        </button>
        <input ref=${fileInput} type="file" accept=".json,application/json" hidden onChange=${pickFile} />`}
    </div>

    ${pending && html`<${Alert} title="Replace all data?"
      message=${`This backup ${pending.exportedAt ? `was exported ${format.mediumDateTime(pending.exportedAt)} and ` : ''}contains ${count(pending.sessions.length, 'session')} and ${count(pending.plans.length, 'plan')}. This will replace everything currently on this device.`}
      buttons=${[
        { label: 'Cancel', role: 'cancel', onClick: () => setPending(null) },
        { label: 'Replace', role: 'destructive', onClick: () => { store.applyBackup(pending); setPending(null); setImported(true); } },
      ]} />`}
  <//>`;
}
