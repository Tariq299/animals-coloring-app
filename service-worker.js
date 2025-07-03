self.addEventListener("install", (e) => {
  console.log("✅ Service Worker installed");
  e.waitUntil(
    caches.open("colorapp-v1").then((cache) => {
      return cache.addAll([
        "./index.html",
        "./offline.html",
        "./manifest.json",
        "./icon-192.png",
        "./icon-512.png"
      ]);
    })
  );
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  console.log("✅ Service Worker activated");
  return self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => {
      return caches.match(e.request).then((res) => {
        return res || caches.match("./offline.html");
      });
    })
  );
});
