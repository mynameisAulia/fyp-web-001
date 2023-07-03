import { useState, useEffect } from "react";
import { auth } from "../firebase";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const signIn = async (email, password) => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setUser(user);
      setIsLoading(false);
    });
    return unsubscribe;
  }, []);

  return { user, signIn, signOut, isLoading };
};

export default useAuth;