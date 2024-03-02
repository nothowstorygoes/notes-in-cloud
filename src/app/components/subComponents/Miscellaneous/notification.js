import { useEffect } from 'react';

function useNotificationPermission() {
  useEffect(() => {
    // Check if the browser supports notifications
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // If permission is already granted
      console.log("Permission to receive notifications has been granted");
    } else if (Notification.permission !== "denied") {
      // Otherwise, we need to ask the user for permission
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          console.log("Permission to receive notifications has been granted");
        }
      });
    }
  }, []); // Empty dependency array ensures this runs once on mount
}

export default useNotificationPermission;