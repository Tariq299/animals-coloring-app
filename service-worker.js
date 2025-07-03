const CACHE_NAME = 'color-app-v2';

const FILES_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './style.css',
  './icon-192.png',
  './icon-512.png',
  './maskable-192.png',
  './maskable-512.png',
  './canvas.js',
  './click.mp3',
  './music1.wav',
  './music2.wav',
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
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[ServiceWorker] Activate');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
