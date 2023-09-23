import AuthComponent from "@/components/Auth/AuthComponent";
import { getServerSession } from "next-auth";
import React from "react";

const Resources = async () => {
  const session = await getServerSession();

  return (
    <>{session?.user !== null ? <div> Resources</div> : <AuthComponent />};</>
  );
};

export default Resources;
