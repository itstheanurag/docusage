// app/dashboard/layout.tsx
"use client";

import { useState } from "react";
import Sidebar from "./page";
import FormBuilder from "@/components/forms/fromBuilder";

const DashboardLayout = () => {
  const [selected, setSelected] = useState("create");

  const renderContent = () => {
    switch (selected) {
      case "create":
        return <FormBuilder />;
      case "forms":
        return <p>Forms List Page</p>;
      case "analytics":
        return <p>Analytics Page</p>;
      case "user":
        return <p>User Settings Page</p>;
      default:
        return <p>Welcome to your dashboard!</p>;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar selected={selected} setSelected={setSelected} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto p-6 min-h-0 scrollbar-thin">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
