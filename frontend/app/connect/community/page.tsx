"use client";
import AuthComponent from "@/components/Auth/AuthComponent";
import { getSession, useSession } from "next-auth/react";
import React from "react";

const Community = () => {
  const { data: session } = useSession();

  return <div>{session?.user != null ? <div>hi</div> : <AuthComponent />}</div>;
};

export default Community;
