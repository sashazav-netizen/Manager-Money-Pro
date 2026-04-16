// ════════════════════════════════════════════
//  Manager Money Pro — Service Worker
//  גרסה 1.0 — תומך עבודה אופליין
// ════════════════════════════════════════════

const CACHE_NAME = 'manager-money-v1';

// קבצים לשמירה במטמון
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  // ספריות חיצוניות
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700;900&family=Montserrat:wght@800;900&display=swap'
];

// ── Install: שמור קבצים בזמן התקנה ──────────
self.addEventListener('install', event => {
  console.log('[SW] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Caching assets');
      // cache one by one to avoid failing all if one fails
      return Promise.allSettled(
        ASSETS.map(url => cache.add(url).catch(() => console.log('[SW] Skip:', url)))
      );
    }).then(() => self.skipWaiting())
  );
});

// ── Activate: נקה מטמון ישן ──────────────────
self.addEventListener('activate', event => {
  console.log('[SW] Activating...');
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => {
          console.log('[SW] Deleting old cache:', k);
          return caches.delete(k);
        })
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: תחזיר מהמטמון, אחרת מהרשת ────────
self.addEventListener('fetch', event => {
  // אל תתעסק עם Firebase requests
  if (event.request.url.includes('firebase') ||
      event.request.url.includes('googleapis.com/identitytoolkit') ||
      event.request.url.includes('firebaseio.com')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // שמור תשובות טובות במטמון
        if (response && response.status === 200 && response.type === 'basic') {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // אם אופליין ואין מטמון — החזר index.html
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
