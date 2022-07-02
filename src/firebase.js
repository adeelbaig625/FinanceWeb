import { initializeApp, } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getMessaging, getToken, onMessage, } from "firebase/messaging";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeecIWZDQl-0AdCWzNnSrE3CJbisCSaPk",
  authDomain: "payment-reminder-app.firebaseapp.com",
  projectId: "payment-reminder-app",
  storageBucket: "payment-reminder-app.appspot.com",
  messagingSenderId: "69026467279",
  appId: "1:69026467279:web:d833c68a8200bdd5d596ba"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);
export const getToken1 = (setTokenFound) => {
    return getToken(messaging, {vapidKey: 'BIkkdcCJs-uXRSEe3SHfhhcwc8RuJ_58bS5zAFEzEZDf2leqLbH9sEwvKLPJEwnXx7EHKqaSgGvM1K-rlv2bmNE'}).then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log('No registration token available. Request permission to generate one.');
        setTokenFound(false);
        // shows on the UI that permission is required 
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // catch error while creating client token
    })
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});