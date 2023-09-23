import AuthComponent from "@/components/Auth/AuthComponent";
import ECommerce from "@/components/Dashboard/E-commerce";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = async () => {
  const session = await getServerSession();

  return <>{session?.user != null ? <ECommerce /> : <AuthComponent />}</>;
};

export default Dashboard;
