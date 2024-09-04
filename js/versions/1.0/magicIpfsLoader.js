// service-worker.js

const CACHE_NAME = 'virtual-cache-v1';
let virtualFileSystem = {};

// Install Event: Triggered when the service worker is installed
self.addEventListener('install', event => {
    console.log('Service Worker: Install Event');
    self.skipWaiting(); // Immediately activate the service worker
});

// Activate Event: Triggered after the service worker is installed
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            return self.clients.claim();
        })
    );
});

// Event listener for incoming messages from the main thread
self.addEventListener('message', event => {
    if (event.data.type === 'SET_VIRTUAL_FS') {


        if (virtualFileSystem === null || Object.keys(virtualFileSystem).length === 0) {
            console.log("The variable is either null or an empty object.");
            virtualFileSystem = event.data.virtualFileSystem;
            console.log('Service Worker: Virtual file system set:', virtualFileSystem);
        } else {
            console.log("The object is not empty.");
        }
        // Send a confirmation message back to the main thread
        event.source.postMessage({ type: 'VIRTUAL_FS_SET' });
    } else if (event.data.type === 'CHECK_VIRTUAL_FS') {
        const isEmpty = virtualFileSystem === null || Object.keys(virtualFileSystem).length === 0;
        // Send the result back to the main thread
        event.source.postMessage({ type: 'VIRTUAL_FS_STATUS', isEmpty: isEmpty });
    }
});

// Handle fetch events to intercept requests
self.addEventListener('fetch', event => {
    if (virtualFileSystem === null || Object.keys(virtualFileSystem).length === 0) {
        console.log('skip cache and fetch due to empty directory');
        return;
    }

    const url = new URL(event.request.url);

    console.log(`Service Worker: Intercepting request for: ${url.pathname}`);

    // Handle virtual directory prefix or files from the same origin
    if (url.origin === location.origin || url.protocol === 'virtual:') {
        let pathname = url.pathname.startsWith('/') ? url.pathname.substring(1) : url.pathname;
        pathname = pathname.startsWith('virtual://') ? pathname.replace('virtual://', '') : pathname;

        console.log(`Service Worker: Processed pathname: ${pathname}`);

        // Check if the file exists in the virtual file system
        if (virtualFileSystem[pathname]) {
            console.log(`Service Worker: Serving ${pathname} from virtual directory`);
            event.respondWith(
                new Response(virtualFileSystem[pathname], {
                    headers: { 'Content-Type': getContentType(pathname) }
                })
            );

            return;
        }
        else {
            console.warn(`Service Worker: File ${pathname} not found in virtual directory`);
        }
    } else {
        console.log(`Service Worker: Request for ${url.pathname} does not match origin or virtual protocol.`);
    }

    // Fallback to network request or cache
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(`Service Worker: Serving ${event.request.url} from cache`);
                return response;
            }
            return fetch(event.request).then(networkResponse => {
                return caches.open(CACHE_NAME).then(cache => {
                    console.log(`Service Worker: Caching new resource: ${event.request.url}`);
                    cache.put(event.request, networkResponse.clone());
                    return networkResponse;
                });
            });
        }).catch(error => {
            console.error('Service Worker: Fetch failed; returning offline page instead.', error);
            return caches.match('offline.html');
        })
    );
});

// Utility function to get MIME type based on file extension
function getContentType(filePath) {
    const mimeTypes = {
        'js': 'application/javascript',
        'wasm': 'application/wasm',
        'json': 'application/json',
        'pdb': 'application/octet-stream',
        'pdf': 'application/pdf',
        'xml': 'application/xml',
        'zip': 'application/zip',
        'jsonld': 'application/ld+json',
        'dll': 'application/octet-stream',
        'eot': 'application/vnd.ms-fontobject',
        'docx': 'application/msword',
        'otf': 'font/otf',
        'ttf': 'font/ttf',
        'woff': 'font/woff',
        'woff2': 'font/woff2',
        'png': 'image/png',
        'jpg': 'image/jpeg',
        'jpeg': 'image/jpeg',
        'gif': 'image/gif',
        'ico': 'image/x-icon',
        'svg': 'image/svg+xml',
        'webp': 'image/webp',
        'mp3': 'audio/mpeg',
        'ogg': 'audio/ogg',
        'wav': 'audio/wav',
        'mp4': 'video/mp4',
        'webm': 'video/webm',
        'css': 'text/css',
        'html': 'text/html',
        'htm': 'text/html',
        'csv': 'text/csv',
    };

    const extension = filePath.split('.').pop().toLowerCase();
    return mimeTypes[extension] || 'application/octet-stream';
}
