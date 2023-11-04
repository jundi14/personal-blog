// sw.js

// Nama cache untuk menyimpan sumber daya website
const CACHE_NAME = 'cool-cache';

// Daftar sumber daya yang akan disimpan di cache
const urlsToCache = [
  '/assets'
];

self.addEventListener('install', function(event) {
  // Melakukan instalasi service worker dan menyimpan sumber daya di cache
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  // Mengecek apakah sumber daya tersedia di cache, jika tidak, memuatnya dari server
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Jika ada respons di cache, kembalikan dari cache
        if (response) {
          return response;
        }
        // Jika tidak ada respons di cache, ambil dari server
        return fetch(event.request);
      })
  );
});

self.addEventListener('notificationclick', function(event) {
  // Menangani saat pengguna mengklik notifikasi
  event.notification.close();
  clients.openWindow('/');
});

self.addEventListener('install', function(event) {
  // Menampilkan pesan untuk menginstal website setelah 60 detik
  event.waitUntil(
    setTimeout(function() {
      self.registration.showNotification('Instal Aplikasi', {
        body: 'Instal aplikasi kami untuk pengalaman membaca yang lebih baik.',
        icon: '/android-chrome-512x512.png',
        data: {
          url: '/'
        }
      });
    }, 60000) // 60 detik
  );
});
            
