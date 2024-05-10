//Custom worker logic


//listens to event "push", extracts the payload and,
// using .showNotification, displays the push notification to the user.


self.addEventListener('push', (event) => {
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: data.icon,
    badge: data.badge,
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

//Closes the notification once the user clicked on it

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow(event.notification.data.url));
});

//listen to event "message" sent to service worker and displays a notification

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'NOTIFICATION') {
    const { title, options } = event.data.payload;
    event.waitUntil(self.registration.showNotification(title, options));
  }
});