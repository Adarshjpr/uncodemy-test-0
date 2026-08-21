// This is the "Offline page" service worker for Uncodemy

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "uncodemy-cache-v1";
const OFFLINE_FALLBACK_PAGE = "/offline"; // Replace with the actual offline page for Uncodemy

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(CACHE)
            .then((cache) => cache.addAll([
                OFFLINE_FALLBACK_PAGE,
                '/',
                '/index.html',
                '/css/styles.css',
                '/js/main.js',
                'https://uncodemy.com/img/Logo%20(1).png'
            ]))
    );
});

if (workbox.navigationPreload.isSupported()) {
    workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResp = await event.preloadResponse;

                if (preloadResp) {
                    return preloadResp;
                }

                const networkResp = await fetch(event.request);
                return networkResp;
            } catch (error) {
                const cache = await caches.open(CACHE);
                const cachedResp = await cache.match(OFFLINE_FALLBACK_PAGE);
                return cachedResp;
            }
        })());
    }
});

// This is the "Offline copy of pages" service worker for Uncodemy
const CACHE_PAGES = "uncodemy-pages-cache-v1";

workbox.routing.registerRoute(
    new RegExp('/.*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: CACHE_PAGES
    })
);

// This is the combined offline experience (Offline page + Offline copy of pages)
const COMBINED_CACHE = "uncodemy-combined-cache-v1";

self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting();
    }
});

self.addEventListener('install', async (event) => {
    event.waitUntil(
        caches.open(COMBINED_CACHE)
            .then((cache) => cache.addAll([
                OFFLINE_FALLBACK_PAGE,
                '/',
                '/index.html',
                '/css/styles.css',
                '/js/main.js',
                'https://uncodemy.com/img/Logo%20(1).png'
            ]))
    );
});

workbox.routing.registerRoute(
    new RegExp('/.*'),
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: COMBINED_CACHE
    })
);

self.addEventListener('fetch', (event) => {
    if (event.request.mode === 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResp = await event.preloadResponse;

                if (preloadResp) {
                    return preloadResp;
                }

                const networkResp = await fetch(event.request);
                return networkResp;
            } catch (error) {
                const cache = await caches.open(COMBINED_CACHE);
                const cachedResp = await cache.match(OFFLINE_FALLBACK_PAGE);
                return cachedResp;
            }
        })());
    }
});
