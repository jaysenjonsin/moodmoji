'use client';

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { createContext, useContext, useState } from 'react';
import { auth } from '../firebase';

const AuthContext = createContext(null);
//so we dont have to import useContext everytime we use context, instead use this useAuth hook
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children: any }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDataObj, setUserDataObj] = useState({});
  const [loading, setLoading] = useState(true);

  //auth handlers
  function signup(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setUserDataObj({});
    setCurrentUser(null);
    return signOut(auth);
  }
  
  const value = {};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
