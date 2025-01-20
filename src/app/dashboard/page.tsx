"use client";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import React, { useEffect } from "react";

export default function Login() {
  const { userData, getUserData, status, signIn } = useFirebaseAuth();

  useEffect(() => {
    getUserData();
  }, [status]);

  return (
    <div className="flex flex-col">
      <button
        onClick={() => {
          signIn("google");
        }}
      >
        Sign up with google
      </button>
    </div>
  );
}
