"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>; // show a loader while session is fetched
  }

  if (!session) {
    return <p>User not authenticated</p>; // or redirect to /login
  }

  return (
    <div>
      <h1>Welcome, {session.user?.name}</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
