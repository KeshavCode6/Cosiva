"use client";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useFirebaseAuth } from "@/hooks/useFirebaseAuth";
import React, { useEffect } from "react";

export default function Login() {
  const { userData, getUserData, status, signIn } = useFirebaseAuth();

  useEffect(() => {
    getUserData();
  }, [status]);

  return (
    <Navbar className="pt-32">
      <Button
        onClick={() => {
          signIn("google");
        }}
      >
        Sign up with google
      </Button>

      {userData?.uid}
    </Navbar>
  );
}
