// Rewrites the two lists that mirror what is on disk: the SHELL list in
// sw.js, and the list of drawn pictograms in js/core/data/icons.js.
//
//   npm run shell
//
// Run it after adding or removing a file under css/, js/, icons/ or img/ —
// a file missing from the list would be missing offline, and a listed file
// that is gone stops the offline cache from installing at all.
// tests/sw.test.js fails until the list and the disk agree.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const root = new URL('../', import.meta.url);

const filesUnder = dir => readdirSync(new URL(dir, root), { withFileTypes: true, recursive: true })
  .filter(entry => entry.isFile())
  .map(entry => `${entry.parentPath ?? entry.path}/${entry.name}`.replace(root.pathname, ''))
  .sort();

// The pictograms that exist. builtin.js shows an exercise's drawing only if
// it is in this list; the others get their category glyph until they are drawn.
const drawn = filesUnder('img/exercises')
  .filter(file => file.endsWith('.png'))
  .map(file => file.replace('img/exercises/', '').replace('.png', ''));
writeFileSync(new URL('js/core/data/icons.js', root), `// The exercise pictograms that exist in img/exercises/.
// Written by \`npm run shell\` — do not edit by hand.

export const DRAWN_ICONS = ${JSON.stringify(drawn, null, 2)};
`);
console.log(`js/core/data/icons.js: ${drawn.length} pictograms`);

const files = ['./', 'index.html', 'manifest.webmanifest', ...['css', 'js', 'icons', 'img'].flatMap(filesUnder)];

const path = new URL('sw.js', root);
const source = readFileSync(path, 'utf8');
const pattern = /const SHELL = \[\n[\s\S]*?\n\];/;
if (!pattern.test(source)) throw new Error('Could not find the SHELL list in sw.js');

const list = `const SHELL = [\n${files.map(file => `  '${file}',`).join('\n')}\n];`;
writeFileSync(path, source.replace(pattern, list));
console.log(`sw.js: ${files.length} files listed`);
