
// ════════════════════════════════════════════════
//  Manager Money Pro — Service Worker v2.0
//  תומך עבודה אופליין + מטמון חכם
// ════════════════════════════════════════════════

const CACHE = 'manager-money-v2';

const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://cdn.jsdelivr.net/npm/chart.js',
    'https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;700;900&family=Montserrat:wght@800;900&display=swap'
];

// ── Install: שמור קבצים ──────────────────────
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE).then(cache =>
            Promise.allSettled(ASSETS.map(url =>
                cache.add(url).catch(() => {})
            ))
        ).then(() => self.skipWaiting())
    );
});

// ── Activate: נקה מטמון ישן ─────────────────
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys.filter(k => k !== CACHE).map(k => caches.delete(k))
            )
        ).then(() => self.clients.claim())
    );
});

// ── Fetch: מטמון קודם, רשת אחר כך ──────────
self.addEventListener('fetch', event => {
    const url = event.request.url;

    // אל תתעסק עם Firebase — תמיד מהרשת
    if (url.includes('firebase') ||
        url.includes('firebaseio.com') ||
        url.includes('googleapis.com/identitytoolkit') ||
        url.includes('gstatic.com/firebasejs')) {
        return;
    }

    event.respondWith(
        caches.match(event.request).then(cached => {
            if (cached) return cached;

            return fetch(event.request).then(response => {
                if (response && response.status === 200) {
                    const clone = response.clone();
                    caches.open(CACHE).then(cache =>
                        cache.put(event.request, clone)
                    );
                }
                return response;
            }).catch(() => {
                // אופליין ואין מטמון — החזר index.html
                if (event.request.destination === 'document') {
                    return caches.match('./index.html');
                }
            });
        })
    );
});


// אל תתעסק עם Firebase — תמיד מהרשת
if (url.includes('firebase') ||
    url.includes('firebasedatabase.app') ||
    url.includes('googleapis.com') ||
    url.includes('gstatic.com')) {
    return; // ← חשוב מאוד!
}
