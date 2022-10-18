import {
  doc,
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
  setDoc,
  updateDoc,
  getDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "../../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

export const AddPaymentDB = (body) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authref = getAuth();
      onAuthStateChanged(authref, async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid);
          console.log(user.uid);
          const colRef = collection(docRef, "Payments");
          const addUser = await addDoc(colRef, {
            ...body,
            status: false,
            isDelete: false,
          });
          resolve({ status: 200 });
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
export const GetSinglePayment = (paymentId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const authref = getAuth();
      onAuthStateChanged(authref, async (user) => {
        if (user) {
          const docRef = doc(db, "Users", user.uid, "Payments", paymentId);

          const docSnap = await getDoc(docRef);
          console.log(docSnap.data());
          resolve(docSnap.data());
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};
