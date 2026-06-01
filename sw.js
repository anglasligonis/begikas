const CACHE = 'begimas-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/css/variables.css?v=1',
  '/css/layout.css?v=1',
  '/css/components.css?v=1',
  '/css/lessons.css?v=1',
  '/js/nav.js?v=1',
  '/js/quiz.js?v=1',
  '/js/glossary.js?v=1',
  '/js/demos.js?v=1',
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // Only handle same-origin requests; let analytics/fonts go through untouched
  if (!e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
