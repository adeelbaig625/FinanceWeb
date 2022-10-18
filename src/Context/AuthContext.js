import React from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    const authref = getAuth();
    const unregisterAuthObserver = onAuthStateChanged(authref, async (user) => {
      if (!user) {
        setUser(null);
      } else {
        setUser(user);
      }
    });

    return () => unregisterAuthObserver();
  });
  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return React.useContext(AuthContext);
};
