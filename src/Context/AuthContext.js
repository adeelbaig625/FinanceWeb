import React from "react";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getToken1, onMessageListener, db, auth } from "../firebase";
import { doc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
const AuthContext = React.createContext(null);
const authref = getAuth();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const unregisterAuthObserver = onAuthStateChanged(authref, async (user) => {
      if (!user) {
        setUser(null);
      } else {
        console.log(user);
        setUser(user);
      }
    });

    return () => unregisterAuthObserver();
  });
  const onLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
      setUser(user);
      console.log(email, password);
      const token = await getToken1();
      try {
        const SignInAuth = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const authref = await getAuth();
        onAuthStateChanged(authref, async (user) => {
          if (user) {
            const uid = user.uid;
            const docRef = doc(db, "Users", uid);
            if (token) {
              const addUser = await updateDoc(docRef, {
                token: arrayUnion(token),
              });
            }

            resolve();
          }
        });
      } catch (e) {
        console.log(e);
        reject(e);
      }
    });
  };
  const onLogout = () => {
    return new Promise((resolve, reject) => {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const token = await getToken1();
            const docRef = doc(db, "Users", user.uid);
            if (token) {
              const DeleteTokenUser = await updateDoc(docRef, {
                token: arrayRemove(token),
              });
            }
            const signoutref = await signOut(auth);
            setUser(null);
            resolve();
          } catch (e) {
            console.log(e);
            reject(e);
          }
        }
      });
    });
  };
  return (
    <AuthContext.Provider value={{ user, onLogout, onLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
