// Line icons standing in for the SF Symbols the iOS app uses.
// Each is drawn on a 24×24 grid; `currentColor` makes them follow text colour.

import { html } from '../vendor/preact-htm.js';

const stroke = d => `<path d="${d}"/>`;
const filled = d => `<path d="${d}" fill="currentColor" stroke="none"/>`;
const circle = (cx, cy, r, extra = '') => `<circle cx="${cx}" cy="${cy}" r="${r}" ${extra}/>`;
const rect = (x, y, w, h, rx = 0, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" ${extra}/>`;
const solid = 'fill="currentColor" stroke="none"';
// Marks cut out of a filled shape are drawn in the page background colour.
const cut = d => `<path d="${d}" stroke="var(--bg)" stroke-width="2"/>`;

const ICONS = {
  // Tab bar
  calendar: rect(3.5, 5, 17, 15.5, 2.5) + stroke('M3.5 10h17M8 3v4M16 3v4'),
  plan: rect(4, 4, 16, 6.5, 1.8) + stroke('M4 15h16M4 19.5h16'),
  library: rect(4, 4, 4.2, 16, 1) + rect(10.2, 4, 4.2, 16, 1) + stroke('M16.4 7.3l3.3-.9 3 12.4-3.3.9z'),
  settings: circle(12, 12, 3) + circle(12, 12, 7)
    + stroke('M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M18.7 5.3l-1.8 1.8M7.1 16.9l-1.8 1.8'),

  // Basics
  plus: stroke('M12 5v14M5 12h14'),
  minus: stroke('M5 12h14'),
  x: stroke('M6 6l12 12M18 6L6 18'),
  check: stroke('M5 12.5l4.5 4.5L19 7.5'),
  circle: circle(12, 12, 9),
  'x-circle-fill': circle(12, 12, 9.5, solid) + cut('M8.6 8.6l6.8 6.8M15.4 8.6l-6.8 6.8'),
  'check-circle-fill': circle(12, 12, 9.5, solid) + cut('M7.6 12.4l3 3 5.8-6.2'),
  'check-circle': circle(12, 12, 9) + stroke('M7.8 12.4l2.9 2.9 5.5-5.9'),
  'plus-circle-fill': circle(12, 12, 9.5, solid) + cut('M12 7.5v9M7.5 12h9'),
  'plus-circle': circle(12, 12, 9) + stroke('M12 8v8M8 12h8'),
  'chevron-right': stroke('M9 5l7 7-7 7'),
  'chevron-down': stroke('M5 9l7 7 7-7'),
  'chevron-up': stroke('M5 15l7-7 7 7'),
  'chevrons-updown': stroke('M8 9.5l4-4 4 4M8 14.5l4 4 4-4'),
  info: circle(12, 12, 9) + stroke('M12 11v5.5') + circle(12, 7.7, 0.6, solid),
  search: circle(10.5, 10.5, 6) + stroke('M15.2 15.2L20 20'),
  ellipsis: circle(5.5, 12, 1.6, solid) + circle(12, 12, 1.6, solid) + circle(18.5, 12, 1.6, solid),
  pencil: stroke('M4 20l1-4.6L16.4 4a2.1 2.1 0 0 1 3 3L8 18.4zM14.4 6l3 3'),
  'square-pencil': stroke('M11 5H6.5a2 2 0 0 0-2 2v10.5a2 2 0 0 0 2 2H17a2 2 0 0 0 2-2V13M17.6 3.7a2 2 0 0 1 2.8 2.8L12 15l-3.8 1 1-3.8z'),
  trash: stroke('M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13M10 11v5.5M14 11v5.5'),
  copy: rect(8.5, 8.5, 11.5, 11.5, 2) + stroke('M15.5 8.5V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7.5a2 2 0 0 0 2 2h2.5'),
  play: filled('M7.5 4.8v14.4a.6.6 0 0 0 .9.5l12-7.2a.6.6 0 0 0 0-1l-12-7.2a.6.6 0 0 0-.9.5z'),
  'pause-circle': circle(12, 12, 9) + stroke('M10 9v6M14 9v6'),
  lock: rect(5, 10.5, 14, 10, 2.2, solid) + stroke('M8 10.5V8a4 4 0 0 1 8 0v2.5'),
  clock: circle(12, 12, 9) + stroke('M12 7v5.2l3.4 2'),
  photo: rect(3, 5, 18, 14, 2.5) + circle(8.5, 10, 1.5) + stroke('M3.6 17l5-4.5 3.8 3.3 3-2.6 5 4.2'),
  lightbulb: filled('M12 3a6 6 0 0 0-3.7 10.7c.5.5.9 1.1.9 1.8h5.6c0-.7.4-1.3.9-1.8A6 6 0 0 0 12 3z') + stroke('M9.5 18.5h5M10.5 21h3'),
  doc: stroke('M6.5 3h7.5l4 4v14h-11.5zM14 3v4h4M9.5 12h5M9.5 16h5'),
  'doc-plus': stroke('M6.5 3h7.5l4 4v14h-11.5zM14 3v4h4M12 11v6M9 14h6'),
  clipboard: rect(5, 5, 14, 16, 2.2) + rect(9, 3, 6, 4, 1.2) + stroke('M9 12.5h6M9 16.5h4'),

  // Day types and categories
  dumbbell: stroke('M3 9.5v5M6.5 6.5v11M17.5 6.5v11M21 9.5v5M6.5 12h11'),
  run: circle(15.5, 4.6, 1.8) + stroke('M14 8.2L11 14M14 8.2l3.4 2.6 2.6-1M14 8.2l-4 .4-2 2.6M11 14l4 2 .5 5M11 14l-2.5 3.6-4 .4'),
  flex: circle(12, 4.6, 1.8) + stroke('M12 8.3v6M12 9.3L6 6.2M12 9.3l6-3.1M12 14.3l-5 6M12 14.3l5 6'),
  ecg: stroke('M2 12h5l2-6 3 12 2.5-9 1.5 3H22'),
  bolt: stroke('M13 2.5L5 13.5h6L10 21.5l9-11.5h-6z'),
  moon: stroke('M20 14.3A8 8 0 0 1 9.7 4a8 8 0 1 0 10.3 10.3z'),

  // Feel modifiers
  battery: rect(2.5, 8, 16, 8, 2.2) + stroke('M21 11v2') + rect(4.6, 10.1, 4, 3.8, 0.8, solid),
  leaf: stroke('M19 5c-9 0-14 4.5-14 12 0 .7.05 1.4.15 2C12.6 19 19 15 19 5zM5 20l8-8.5'),
  thermometer: stroke('M10 4.5a2 2 0 0 1 4 0v9.3a4 4 0 1 1-4 0zM12 9v7'),

  // Progress and backup
  trend: stroke('M3 17l5.5-6 4 3.5L20 6M15 6h5v5'),
  'arrow-up-right': stroke('M7 17L17 7M9 7h8v8'),
  'arrow-down-right': stroke('M7 7l10 10M17 9v8H9'),
  drive: rect(3, 13, 18, 7, 2.2) + stroke('M5 13l2.5-8h9L19 13') + circle(17, 16.5, 0.7, solid),
  upload: stroke('M12 15V3.5M8 7.5l4-4 4 4M5 11.5V20h14v-8.5'),
  download: stroke('M12 3.5V15M8 11l4 4 4-4M5 15.5V20h14v-4.5'),
  'calendar-plus': rect(3.5, 5, 17, 15.5, 2.5) + stroke('M3.5 10h17M8 3v4M16 3v4M12 12.8v5M9.5 15.3h5'),
  'calendar-clock': rect(3.5, 5, 17, 15.5, 2.5) + stroke('M3.5 10h17M8 3v4M16 3v4M12 13v2.6l1.8 1.1'),

  // Interval timer, skipping, theme
  figure: circle(12, 4.6, 1.8) + stroke('M5.5 9.5h13M12 9.5v6M12 15.5l-3.5 5.5M12 15.5l3.5 5.5'),
  pause: rect(6.5, 5, 4, 14, 1.2, solid) + rect(13.5, 5, 4, 14, 1.2, solid),
  forward: filled('M4.5 5.6v12.8a.6.6 0 0 0 .95.5l8.6-6.4a.6.6 0 0 0 0-1L5.45 5.1a.6.6 0 0 0-.95.5z') + rect(16, 5, 3, 14, 1, solid),
  timer: circle(12, 13.5, 7.5) + stroke('M12 13.5V9.5M9.5 3h5M12 3v3'),
  skip: circle(12, 12, 9) + stroke('M6 6l12 12'),
  undo: stroke('M8 5L4 9l4 4M4 9h9.5a5.5 5.5 0 0 1 0 11H9'),
  sun: circle(12, 12, 4) + stroke('M12 2.5v2.5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8'),
};

/// <${Icon} name="plus" size=${16} />
export function Icon({ name, size = 16, weight = 1.75, class: className = '', style }) {
  return html`<svg
    class="icon ${className}" viewBox="0 0 24 24" width=${size} height=${size} style=${style}
    fill="none" stroke="currentColor" stroke-width=${weight} stroke-linecap="round" stroke-linejoin="round"
    aria-hidden="true" dangerouslySetInnerHTML=${{ __html: ICONS[name] ?? '' }}
  />`;
}

export const ICON_NAMES = Object.keys(ICONS);
