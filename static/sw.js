window.addEventListener('load', () => {
  setTimeout(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }

    if ('Notification' in window) {
      Notification.requestPermission()
        .then((permission) => {
          if (permission === 'granted') {
            const notification = new Notification('Instal Aplikasi', {
              body: 'Instal aplikasi untuk pengalaman terbaik',
              icon: '/android-chrome-512x512.png'
            });
          }
        });
    }
  }, 5000); // Menampilkan notifikasi setelah 5 detik
});
