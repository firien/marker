const tag = '9';
const $prefix = 'MARKER';
const $cacheName = `${$prefix}-${tag}`;

const $urls = [
  
  'bundle.f8b42a472a993f39b114.js',
  
  'javascripts/index.2f00ae02915f094802c0.js',
  
  'javascripts/rainbow-custom.min.6aa03f3d10a414608f6d.js',
  
  'stylesheets/github.d141b89ac61072a3f2ca.css',
  
  'stylesheets/index.c7bbadc72402f099f48b.css',
  
  'images/icon-152.754897053343ea1ae84c.png',
  
  'images/icon-167.e21117c1e97fb6727a8c.png',
  
  'images/icon-180.4685c1b46790d3de3429.png',
  
  'images/icon-192.4874a54cb614454e8f0d.png',
  
  'images/icon-512.c6c022ce6a47bc7c09b0.png',
  
  'pwa.ba451b196f9dce938197.js',
  
  'manifest.webmanifest',
  
  'index.html',
  
  '/',
  
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
