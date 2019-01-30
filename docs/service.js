(function() {
  var $cacheName, $prefix, $urls, clearPreviousCaches, tag;

  tag = '7';

  $prefix = 'MARKER';

  $cacheName = `${$prefix}-${tag}`;

  $urls = ['bundle.1ade394ae044edc72a0d.js', 'javascripts/index.0b3537a54e1234dfcd64.js', 'javascripts/rainbow-custom.min.6aa03f3d10a414608f6d.js', 'stylesheets/github.d141b89ac61072a3f2ca.css', 'stylesheets/index.f1a4325a385edf5b2e04.css', 'images/icon-152.754897053343ea1ae84c.png', 'images/icon-167.e21117c1e97fb6727a8c.png', 'images/icon-180.4685c1b46790d3de3429.png', 'images/icon-192.4874a54cb614454e8f0d.png', 'images/icon-512.c6c022ce6a47bc7c09b0.png', 'pwa.ad29d7b873628beaef78.js', 'manifest.webmanifest', 'index.html', '/'];

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
