importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
    apiKey: "AIzaSyCeecIWZDQl-0AdCWzNnSrE3CJbisCSaPk",
    authDomain: "payment-reminder-app.firebaseapp.com",
    projectId: "payment-reminder-app",
    storageBucket: "payment-reminder-app.appspot.com",
    messagingSenderId: "69026467279",
    appId: "1:69026467279:web:d833c68a8200bdd5d596ba"
  };
  

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});