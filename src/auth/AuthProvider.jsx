import React, { useState, useContext, useEffect, createContext } from "react";
import { auth } from "../firebase/firebase"; // Import the auth instance
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Create a context for authentication
const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  // const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  // Function to handle user signup
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Function to handle user login
  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };
  // Function to login with Google Account
  // const loginWithGoogle = async () => {
  //   const provider = new GoogleAuthProvider();
  //   const result = await signInWithPopup(auth, provider);

  //   return result
  // };
  // Function to handle user logout
  const logout = () => {
    return signOut(auth);
  };


  // Effect to set the current user and loading state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {
        setCurrentUser(user);
        setLoading(false);
      },
      [auth]
    );

    return unsubscribe;

  }, []);


  // Value for the AuthContext provider
  const value = {
    currentUser,
    signup,
    login,
    logout,
    // loginWithGoogle,
    loading
  };

  // Return the AuthContext provider with the value
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };