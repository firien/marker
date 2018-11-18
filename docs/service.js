(function() {
  var $cacheName, $prefix, $urls, clearPreviousCaches, tag;

  tag = 1;

  $prefix = 'MARKER';

  $cacheName = `${$prefix}-${tag}`;

  $urls = ['/marker/icon-192.png', '/marker/icon-512.png', '/marker/touch-icon-ipad.png', '/marker/touch-icon-ipad-retina.png', '/marker/touch-icon-iphone-retina.png', '/marker/index.css', '/marker/github.css', '/marker/bundle.js', '/marker/pwa.js', '/marker/index.js', '/marker/rainbow-custom.min.js', '/marker/index.html', '/marker/'];

  self.addEventListener('install', function(event) {
    return event.waitUntil(caches.open($cacheName).then(function(cache) {
      return cache.addAll($urls);
    }));
  });

  clearPreviousCaches = async function() {
    var keys;
    keys = (await caches.keys());
    return Promise.all(keys.filter(function(key) {
      return key !== $cacheName && key.startsWith($prefix);
    }).map(function(key) {
      return caches.delete(key);
    }));
  };

  self.addEventListener('activate', function(event) {
    return event.waitUntil(clearPreviousCaches);
  });

  self.addEventListener('fetch', function(event) {
    return event.respondWith(caches.open($cacheName).then(function(cache) {
      return cache.match(event.request, {
        ignoreSearch: true
      });
    }).then(function(response) {
      return response || fetch(event.request);
    }));
  });

  self.addEventListener('message', function(event) {
    if (event.data.action === 'skipWaiting') {
      return self.skipWaiting();
    }
  });

}).call(this);
