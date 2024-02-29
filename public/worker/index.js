// sw.js
// Import Workbox
importScripts('https://storage.googleapis.com/workbox-cdn/releases/6.1.5/workbox-sw.js');

// Use Workbox to precache assets
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST);

// Additional service worker code...

self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

// Listen for messages from the client
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'NOTIFICATION') {
    const { title, options } = event.data.payload;
    event.waitUntil(self.registration.showNotification(title, options));
  }
});