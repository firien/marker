(function() {
  var $cacheName, $prefix, $urls, clearPreviousCaches, tag;

  tag = '8';

  $prefix = 'MARKER';

  $cacheName = `${$prefix}-${tag}`;

  $urls = ['/marker/bundle.77598b6684162bd4df02.js', '/marker/javascripts/index.0b3537a54e1234dfcd64.js', '/marker/javascripts/rainbow-custom.min.6aa03f3d10a414608f6d.js', '/marker/stylesheets/github.d141b89ac61072a3f2ca.css', '/marker/stylesheets/index.f1a4325a385edf5b2e04.css', '/marker/images/icon-152.754897053343ea1ae84c.png', '/marker/images/icon-167.e21117c1e97fb6727a8c.png', '/marker/images/icon-180.4685c1b46790d3de3429.png', '/marker/images/icon-192.4874a54cb614454e8f0d.png', '/marker/images/icon-512.c6c022ce6a47bc7c09b0.png', '/marker/pwa.14dc996f1ac8dfa87816.js', '/marker/manifest.webmanifest', '/marker/index.html', '/marker/'];

  self.addEventListener('install', function(event) {
    return event.waitUntil(caches.open($cacheName).then(function(cache) {
      return cache.addAll($urls);
    }));
  });

  clearPreviousCaches = function() {
    return caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(key) {
        return (key !== $cacheName) && key.startsWith($prefix);
      }).map(function(key) {
        return caches.delete(key);
      }));
    });
  };

  self.addEventListener('activate', function(event) {
    return event.waitUntil(clearPreviousCaches());
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
