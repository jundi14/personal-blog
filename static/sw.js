// Nama cache
const CACHE_NAME = 'my-pwa-cache-v1';

// Daftar file yang ingin Anda cache
const urlsToCache = [
  '/',
  '/index.html',
  '/css/main.bundle.min.fbc83612bd2fcc6752eb12b055551f67f86a6b7216aa3264538229deb4b78e8d5bbcad44671b4d3fccd0c94b940472716aed6c4c915.css',
  '/posts/**/index.html',
  '/favicon.ico'
  '/js/*.js'
  // Tambahkan file-file lain yang ingin Anda cache di sini
];

// Instalasi service worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// Menggunakan cache saat offline
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Menghapus cache yang sudah kadaluarsa
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(name) {
          return name !== CACHE_NAME;
        }).map(function(name) {
          return caches.delete(name);
        })
      );
    })
  );
});
               
