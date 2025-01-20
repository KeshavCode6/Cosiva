"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signOut,
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

import { auth } from "../lib/firebase/client";
import { useFirestore } from "./useFirestore";
import { BallistaUser } from "@/lib/interfaces";

interface AuthContextType {
  firebaseUser: User | null;
  userData: BallistaUser | null;
  getUserData: () => Promise<void>;
  status: "authenticated" | "unauthenticated" | "loading";
  signIn: (
    email?: string,
    password?: string,
    provider?: "google"
  ) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<BallistaUser | null>(null);
  const [status, setStatus] = useState<
    "authenticated" | "unauthenticated" | "loading"
  >("loading");

  const { getDocument, createDocument } = useFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setFirebaseUser(user);
        setStatus("authenticated");
        getUserData();
      } else {
        setFirebaseUser(null);
        setStatus("unauthenticated");
      }
    });

    return () => unsubscribe();
  }, []);

  const getUserData = async () => {
    if (!firebaseUser) {
      return;
    }
    try {
      const userData = await getDocument<BallistaUser>(
        "users",
        firebaseUser.uid
      );

      if (!userData) {
        const defaultUserData: BallistaUser = {
          uid: firebaseUser.uid,
        };
        await createDocument("users", defaultUserData, firebaseUser.uid);
        setUserData(defaultUserData);
      } else {
        setUserData(userData);
      }
    } catch (err: any) {
      console.error("Error fetching user data:", err);
    }
  };

  const signIn = async (
    provider?: string,
    email?: string,
    password?: string
  ) => {
    try {
      if (provider) {
        let providerType: any;

        switch (provider) {
          case "google":
            providerType = new GoogleAuthProvider();
            break;
          default:
            throw new Error(`Unsupported provider: ${provider}`);
        }

        await signInWithPopup(auth, providerType);
      } else {
        if (email && password) {
          await signInWithEmailAndPassword(auth, email, password);
        } else {
          throw new Error("Email and password are required for login.");
        }
      }
    } catch (error) {
      console.error("Error signing in:", error);
      throw error;
    }
  };

  const signUp = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        status,
        signIn,
        signUp,
        userData,
        getUserData,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useFirebaseAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
