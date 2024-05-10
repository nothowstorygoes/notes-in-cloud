export default function sendNotification() {
    if(!("Notification" in window))
        alert("This browser doesn't support notifications :(");
    else if (Notification.permission == "granted")
        {
            var notification = new Notification("Yay! Your slide are ready!",
                {
                    body: "Your upload was completed successfully.",
                    vibrate: [200,100,200],
                    image: "/notes-in-cloud/icons/logo/ico192.png"
                }
            )
            Notification.requestPermission().then((result => {
                if(result=="granted")
                    {
                        navigator.serviceWorker.ready.then((registration) =>
                        registration.showNotification("Yay! Your slides are ready!",
                    {
                        body: "Your upload was completed successfully.",
                        vibrate: [200,100,200],
                    }))
                    }
            }))
        }
};