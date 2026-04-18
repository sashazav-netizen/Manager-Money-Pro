const CACHE_NAME = 'manager-money-v1';
const ASSETS = [
  '/',
  '/index.html',
  'https://cdn.jsdelivr.net/npm/chart.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-database-compat.js',
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-auth-compat.js'
];

// התקנה ושמירת קבצים בסיסיים בזיכרון
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// ניהול בקשות רשת
self.addEventListener('fetch', (e) => {
  // נתעלם מבקשות של Firebase כדי לא להפריע לסנכרון בזמן אמת
  if (e.request.url.includes('google-analytics') || e.request.url.includes('googleapis')) {
    return;
  }

  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // אם הצלחנו להביא מהרשת, נשמור עותק בזיכרון לגיבוי
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
        return response;
      })
      .catch(() => caches.match(e.request)) // אם אין רשת, נביא מהזיכרון
  );
});
