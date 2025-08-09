// Simple service worker for basic offline caching.
// Note: Service worker only works when served from HTTPS (or localhost) and when files are fetched over the network.
const CACHE_NAME = 'mini-tasks-cache-v1';
const TO_CACHE = ['/', '/index.html', '/sw.js'];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(TO_CACHE)).catch(()=>{})
  );
  self.skipWaiting();
});

self.addEventListener('activate', evt => {
  evt.waitUntil(clients.claim());
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    caches.match(evt.request).then(resp => resp || fetch(evt.request).catch(()=>new Response('',{status:504})))
  );
});
