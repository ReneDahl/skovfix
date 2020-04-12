const filesToCache = [
  "",
  "index.html",
  "/style/custom.css",
  "script.js",
  "offline.html"
];

var staticCacheName = "skovfix-v1";

self.addEventListener("install", function (event) {
  // Perform install steps
  console.log("Installing serviceworker..");
  event.waitUntil(
    caches.open(staticCacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener("fetch", event => {
  console.log("Fetch event for ", event.request.url);
  event.respondWith(
    caches
      .match(event.request)
      .then(response => {
        if (response) {
          console.log("Found ", event.request.url, " in cache");
          return response;
        }
        console.log("Network request for ", event.request.url);
        return fetch(event.request).then(response => {
          // TODO 4 - Add fetched files to the cache,
          //we first cache the pages then the user viset the pages, if the user is offline
          return caches.open(staticCacheName).then(function (cache) {
            cache.put(event.request.url, response.clone());
            return response;
          });
        });
      })
      .catch(error => {
        // TODO 6 - Respond with custom offline page
        console.log("Error, ", error);
        return caches.match("offline.html");
      })
  );
});

self.addEventListener("activate", event => {
  console.log("Activating new service worker...");

  const cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
