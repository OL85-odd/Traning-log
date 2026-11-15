// Caches the app's files so Odd Form opens without a connection.
// Your training data is NOT in here — it lives in localStorage, which is
// independent of this cache.

const CACHE = 'odd-form-v1';

// Every file the app is made of. tests/sw.test.js fails if one is missing.
const SHELL = [
  './',
  'index.html',
  'manifest.webmanifest',
  'css/app.css',
  'js/main.js',
  'js/core/backup.js',
  'js/core/builtin.js',
  'js/core/dates.js',
  'js/core/models.js',
  'js/core/planResolver.js',
  'js/core/progressStats.js',
  'js/core/progression.js',
  'js/core/store.js',
  'js/ui/common.js',
  'js/ui/icons.js',
  'js/ui/library.js',
  'js/ui/plan.js',
  'js/ui/planEditor.js',
  'js/ui/planPicker.js',
  'js/ui/session.js',
  'js/ui/settings.js',
  'js/ui/today.js',
  'js/vendor/preact-htm.js',
  'icons/apple-touch-icon.png',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'img/exercises/exercise-bicycle-crunches.png',
  'img/exercises/exercise-bird-dog.png',
  'img/exercises/exercise-boxing.png',
  'img/exercises/exercise-burpees.png',
  'img/exercises/exercise-calf-raises.png',
  'img/exercises/exercise-dead-bug.png',
  'img/exercises/exercise-dumbbell-bicep-curls.png',
  'img/exercises/exercise-dumbbell-floor-press.png',
  'img/exercises/exercise-dumbbell-overhead-press.png',
  'img/exercises/exercise-dumbbell-romanian-deadlift.png',
  'img/exercises/exercise-dumbbell-rows.png',
  'img/exercises/exercise-farmers-carry.png',
  'img/exercises/exercise-glute-bridge.png',
  'img/exercises/exercise-glute-march.png',
  'img/exercises/exercise-high-knees.png',
  'img/exercises/exercise-inchworms.png',
  'img/exercises/exercise-jumping-jacks.png',
  'img/exercises/exercise-kettlebell-swing.png',
  'img/exercises/exercise-lateral-band-walk.png',
  'img/exercises/exercise-lateral-lunge.png',
  'img/exercises/exercise-lunges.png',
  'img/exercises/exercise-mountain-climbers.png',
  'img/exercises/exercise-negative-pistol-squat.png',
  'img/exercises/exercise-plank-jacks.png',
  'img/exercises/exercise-plank.png',
  'img/exercises/exercise-pull-up.png',
  'img/exercises/exercise-reverse-lunges.png',
  'img/exercises/exercise-rowing.png',
  'img/exercises/exercise-russian-twists.png',
  'img/exercises/exercise-shadow-boxing.png',
  'img/exercises/exercise-side-plank.png',
  'img/exercises/exercise-single-leg-romanian-deadlift.png',
  'img/exercises/exercise-situp.png',
  'img/exercises/exercise-skipping-rope.png',
  'img/exercises/exercise-spinning.png',
  'img/exercises/exercise-squat.png',
  'img/exercises/exercise-step-up.png',
  'img/exercises/exercise-superman.png',
  'img/exercises/exercise-tricep-dips.png',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(SHELL)).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

// Network first, cache as the fallback: a new deploy shows up the next time
// the app is opened with a connection, and the app still opens without one.
// `no-cache` makes the browser check with the server instead of trusting its
// own HTTP cache, so an update is never held back by a stale copy.
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== location.origin) return;

  event.respondWith(
    fetch(request, { cache: 'no-cache' })
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy)).catch(() => {});
        }
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: true }).then(hit => hit || caches.match('./')))
  );
});
