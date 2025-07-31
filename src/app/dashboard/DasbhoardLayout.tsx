"use client";

import { useState } from "react";
import FormBuilder from "@/components/forms/fromBuilder";
import DocumentBuilder from "@/components/Documents/document-builder";
import Sidebar from "./sidebar";
import { Menu } from "lucide-react"; // or any icon

const DashboardLayout = () => {
  const [selected, setSelected] = useState("create");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (selected) {
      case "forms":    return <FormBuilder />;
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
    <div className="h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Mobile Header with menu button */}
      <div className="md:hidden flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Dashboard</h1>
        <button onClick={() => setSidebarOpen((prev) => !prev)}>
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`
         ${sidebarOpen ? "w-64 block" : "hidden"} 
         md:block md:w-64 h-full absolute md:relative z-20 md:z-auto`}
      >
        <Sidebar selected={selected} setSelected={setSelected} />
      </div>
      {/* Overlay for mobile when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-6">{renderContent()}</div>
    </div>
  );
};

export default DashboardLayout;
