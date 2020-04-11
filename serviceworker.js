const filesToCache = ["", "index.html"];

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
