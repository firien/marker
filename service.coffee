tag = 1
$prefix = 'MARKER'
$cacheName = "#{$prefix}-#{tag}"

$urls = [
  '/marker/icon-192.png'
  '/marker/icon-512.png'
  '/marker/touch-icon-ipad.png'
  '/marker/touch-icon-ipad-retina.png'
  '/marker/touch-icon-iphone-retina.png'
  '/marker/index.css'
  '/marker/github.css'
  '/marker/bundle.js'
  '/marker/pwa.js'
  '/marker/index.js'
  '/marker/rainbow-custom.min.js'
  '/marker/index.html'
  '/marker/'
]

self.addEventListener('install', (event) ->
  event.waitUntil(caches.open($cacheName).then((cache) ->
    cache.addAll($urls)
  ))
)

clearPreviousCaches = ->
  keys = await caches.keys()
  Promise.all(keys.filter((key) ->
    key != $cacheName and key.startsWith($prefix)
  ).map((key) ->
    caches.delete(key)
  ))

self.addEventListener('activate', (event) ->
  event.waitUntil(clearPreviousCaches)
)

self.addEventListener('fetch', (event) ->
  event.respondWith(
    caches.open($cacheName).then((cache) ->
      cache.match(event.request, ignoreSearch: true)
    ).then((response) ->
      response || fetch(event.request)
    )
  )
)

self.addEventListener('message', (event) ->
  if event.data.action == 'skipWaiting'
    self.skipWaiting()
)
