"use client";
import { useSession } from "next-auth/react";
import React from "react";

const Dashboard = () => {
  const { data: session } = useSession();

  if (!session) {
    return <div>User Session not found</div>;
  }

  return <div>{JSON.stringify(session)}</div>;
};

export default Dashboard;
