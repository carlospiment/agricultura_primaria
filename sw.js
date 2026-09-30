const CACHE_NAME = 'meduca-agric-v1';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './base.css',
  './layout.css',
  './styles.css',
  './wordSearchEngine.js',
  './app.js',
  './assets/images/hero.webp',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Install event - Cache static assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Caching static assets');
        return cache.addAll(ASSETS_TO_CACHE);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch event - Stale-While-Revalidate strategy for offline support
self.addEventListener('fetch', event => {
  // Solo interceptamos peticiones GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      const fetchPromise = fetch(event.request).then(networkResponse => {
        // Cachear dinámicamente archivos PDF, otras imágenes o webfonts
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // Fallback for offline if not in cache (could serve a generic offline page)
        console.log('[Service Worker] Offline fallback for', event.request.url);
      });

      // Retorna del cache inmediatamente si existe, pero en el fondo actualiza el cache (Stale-While-Revalidate)
      return cachedResponse || fetchPromise;
    })
  );
});
