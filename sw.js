// GitHub Pages: https://tobusaiseikai-ce.github.io/device-map/
const CACHE_NAME = 'dokodeba-v1';
const ASSETS = [
  '/device-map/',
  '/device-map/index.html',
  '/device-map/icon.svg',
  '/device-map/manifest.json'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(cached => cached || fetch(e.request))
  );
});
