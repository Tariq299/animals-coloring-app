const CACHE_NAME = 'color-app-v2';  // Version bump for updates
const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './offline.html',         // Optional if you use offline page
  './style.css',            // If using external stylesheet
  './sounds/click.mp3',
  './sounds/music1.wav',
  './sounds/music2.wav',
  './images/icon-192.png',
  './images/icon-512.png',
  './images/maskable-192.png',
  './images/maskable-512.png',
  // Images used in the app
  'https://i.postimg.cc/RFf6pbPQ/cat.jpg',
  'https://i.postimg.cc/qRyft8Rv/dog.png',
  'https://i.postimg.cc/QNgGhkw6/panda.png',
  'https://i.postimg.cc/BQqW6PGJ/parrot.jpg',
  'https://i.postimg.cc/HLMv3TCS/sparrow.jpg',
  'https://i.postimg.cc/RFzsD2Sv/horse.png'
];

self.addEventListener('install', (event) => {
  console.log('[ServiceWorker] Install');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[ServiceWorker] Caching files');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) =>
      Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request).catch(() => {
          if (event.request.destination === 'document') {
            return caches.match('./offline.html'); // Optional offline fallback
          }
        });
      })
  );
});
