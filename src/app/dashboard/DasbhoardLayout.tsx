// app/dashboard/layout.tsx
"use client";

import { useState } from "react";
import FormBuilder from "@/components/forms/fromBuilder";
import DocumentBuilder from "@/components/Documents/document-builder";
import Sidebar from "./sidebar";

const DashboardLayout = () => {
  const [selected, setSelected] = useState("create");

  const renderContent = () => {
    switch (selected) {
      case "create":
        return <FormBuilder />;
      case "forms":
        return <p>Forms List Page</p>;
      case "documents":
        return <DocumentBuilder />;
      case "analytics":
        return <p>Analytics Page</p>;
      case "user":
        return <p>User Settings Page</p>;
      default:
        return <p>Welcome to your dashboard!</p>;
    }
  };

  return (
    <div className="h-screen flex items-center overflow-hidden gap-4">
      <Sidebar selected={selected} setSelected={setSelected} />
      <div className="">
        <main className="">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
