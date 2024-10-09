/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //log out
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // create a observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (loggedUser) => {
      setUser(loggedUser);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  githubProvider.addScope("user:email"); // Add the scope to request the user's email

  //google log in

  const googleLogin = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // github log in

  const githubLogin = () => {
    return signInWithPopup(auth, githubProvider);
  };

  const authDetails = {
    user,
    loading,
    logOut,
    googleLogin,
    githubLogin,
  };
  return (
    <AuthContext.Provider value={authDetails}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
