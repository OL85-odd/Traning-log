// The service worker's file list is written by hand. This keeps it honest:
// a file added to the app but not to sw.js would be missing offline.
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);

function filesUnder(dir) {
  return readdirSync(new URL(dir, root), { withFileTypes: true, recursive: true })
    .filter(entry => entry.isFile())
    .map(entry => `${entry.parentPath ?? entry.path}/${entry.name}`.replace(root.pathname, ''));
}

test('sw.js lists every file the app is made of', () => {
  const sw = readFileSync(new URL('sw.js', root), 'utf8');
  const listed = new Set([...sw.matchAll(/^\s+'([^']+)',$/gm)].map(match => match[1]));
  const expected = ['index.html', 'manifest.webmanifest', ...['css', 'js', 'icons', 'img'].flatMap(filesUnder)];

  assert.deepEqual(expected.filter(file => !listed.has(file)), [], 'missing from SHELL in sw.js');
  const onDisk = new Set(expected);
  assert.deepEqual([...listed].filter(file => file !== './' && !onDisk.has(file)), [], 'listed in sw.js but not on disk');
});
