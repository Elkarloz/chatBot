console.log('Service Worker Works');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data);
    console.log('Notification Received');
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Archlinux-icon-crystal-64.svg/1024px-Archlinux-icon-crystal-64.svg.png'
    });
});

self.addEventListener('install', e => {
  console.log('Service Worker installed');
});

self.addEventListener('activate', e => {
  console.log('Service Worker activated');
});

self.addEventListener('fetch', e => {
  console.log('Fetching:', e.request.url);
});
