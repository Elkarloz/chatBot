console.log('Service Worker Works');

self.addEventListener('push', e => {
    const data = e.data.json();
    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://cdn-icons-png.flaticon.com/512/167/167247.png'
    });
});