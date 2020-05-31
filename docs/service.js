const tag = '10';
const $prefix = 'MARKER';
const $cacheName = `${$prefix}-${tag}`;

const $urls = [
  
  '/marker/bundle.a22fd5ce00c856e96d1a.js',
  
  '/marker/javascripts/index.2f00ae02915f094802c0.js',
  
  '/marker/javascripts/rainbow-custom.min.6aa03f3d10a414608f6d.js',
  
  '/marker/stylesheets/github.d141b89ac61072a3f2ca.css',
  
  '/marker/stylesheets/index.c7bbadc72402f099f48b.css',
  
  '/marker/images/icon-152.754897053343ea1ae84c.png',
  
  '/marker/images/icon-167.e21117c1e97fb6727a8c.png',
  
  '/marker/images/icon-180.4685c1b46790d3de3429.png',
  
  '/marker/images/icon-192.4874a54cb614454e8f0d.png',
  
  '/marker/images/icon-512.c6c022ce6a47bc7c09b0.png',
  
  '/marker/pwa.af109189d927d4762bc2.js',
  
  '/marker/manifest.webmanifest',
  
  '/marker/index.html',
  
  '/marker/',
  
];

self.addEventListener('install', async (event) => {
  let cache = await event.waitUntil(caches.open($cacheName));
  await cache.addAll($urls);
})

const clearPreviousCaches = async () => {
  let keys = await caches.keys()
  keys = keys.filter((key) => {
    return (key != $cacheName) && key.startsWith($prefix)
  })
  for (let key of keys) {
   await caches.delete(key);
  }
}

self.addEventListener('activate', (event) => {
  return event.waitUntil(clearPreviousCaches())
})

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.open($cacheName).then((cache) => {
      return cache.match(event.request, {ignoreSearch: true})
    }).then((response) => {
      return response || fetch(event.request)
    })
  )
})

self.addEventListener('message', (event) => {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
})
