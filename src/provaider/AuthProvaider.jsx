import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,

  updateProfile,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import useAxiosPublic from "../hook/useAxiosPublic";

export const AuthContext = createContext(null);

const AuthProvaider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const googleProvaider = new GoogleAuthProvider();
  const yahooprovider = new OAuthProvider('yahoo.com');


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

  const handelYahooLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, yahooprovider);
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser?.email || currentUser.providerData[0].email) {
        // generate token
        const user = { email: currentUser.email };
        await axiosPublic.post("/jwt", user, {
          withCredentials: true,
        });
      } else {
        setUser(null);
        setLoading(false);
        // remove token
        await axiosPublic.post(
          "/logout",
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

  const userInfo = {
    loading,
    createUser,
    handelLogin,
    manageProfile,
    handelGoogleLogin,
    handelYahooLogin,
    handelLogout,
    user,
    setUser,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvaider;
