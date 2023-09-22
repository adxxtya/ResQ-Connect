"use client";
import { getSession, useSession } from "next-auth/react";
import React from "react";

const Cli = () => {
  const { data: session, status } = useSession();

  return (
    <div>
      Cli
      <pre>{JSON.stringify(session)}</pre>
    </div>
  );
};

export default Cli;
