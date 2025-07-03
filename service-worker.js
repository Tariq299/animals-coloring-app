self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open("coloring-app-cache").then((cache) =>
      cache.addAll(["./index.html", "./offline.html"])
    )
  );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request).then((response) => {
      return response || caches.match("./offline.html");
    }))
  );
});
