const PUBLIC_VAPID_KEY = "BLJZy0MYo7AMs4JYuMMLgJ2oiSwTYDb-AUV8xMpriMVOzKQrGBHSp1-tnHFT0OsCaQnEL7Iw0auZn0L8Lp47Ckk";

const subscription = async () => {
  // Service Worker
  console.log("Registering a Service worker");
  const register = await navigator.serviceWorker.register("/js/worker.js", {
    scope: "/js/",
  });
  console.log("New Service Worker");

  // Listen Push Notifications
  console.log("Listening Push Notifications");
  const subscription = await register.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY),
  });

  console.log(subscription);

  // Send Notification
  await fetch("/Api/Push/subscription", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log("Subscribed!");
};

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// Service Worker Support
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.addEventListener("install", event => {
    console.log("Service Worker installed");
  });

  navigator.serviceWorker.addEventListener("activate", event => {
    console.log("Service Worker activated");
  });

  subscription().catch((err) => console.log(err));
}
