"use client";

import AuthComponent from "@/components/Auth/AuthComponent";
import { getServerSession } from "next-auth";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Resources = () => {
  const { data: session } = useSession();

  return (
    <>
      {session?.user != null ? (
        <div className="flex flex-col">
          {JSON.stringify(session)}
          <div onClick={() => signIn("google", { callbackUrl: "/" })}>
            Sign up
          </div>
          <div onClick={() => signOut()}>Logout</div>
        </div>
      ) : (
        <AuthComponent />
      )}
    </>
  );
};

export default Resources;
