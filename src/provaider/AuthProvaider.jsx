import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from "axios";

export const AuthContext = createContext(null);

const AuthProvaider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const googleProvaider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const handelLogin = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const handelGoogleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvaider);
  };

  const manageProfile = (name, image) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: image,
    });
  };

  const handelLogout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const userInfo = {
    loading,
    createUser,
    handelLogin,
    manageProfile,
    handelGoogleLogin,
    handelLogout,
    user,
    setUser,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        const user = { email: currentUser.email };
        // generate token
        await axios.post("https://backend-sigma-tawny.vercel.app/jwt", user, {
          withCredentials: true,
        });
      } else {
        setUser(null);
        setLoading(false);
        // remove token
        await axios.post(
          "https://backend-sigma-tawny.vercel.app/logout",
          {},
          {
            withCredentials: true,
          }
        );
      }
      setLoading(false);
      return () => {
        unsubscribe();
      };
    });
  }, []);
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvaider;
