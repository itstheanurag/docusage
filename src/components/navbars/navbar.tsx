"use client";

import { useState } from "react";
import { AuthModal } from "../(auth)/auth-modal";
import { ModeToggle } from "../theme/mode-toggle";


export default function Navbar() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 dark:bg-black/80 bg-white/80 backdrop-blur-md py-4 border-b dark:border-white/10 border-black/10`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="w-8 h-8 dark:bg-white dark:text-black bg-black text-white rounded flex items-center justify-center font-bold text-lg">D</div>
          <span className="text-xl font-bold tracking-tight dark:text-white text-black">Docusage</span>
        </div>
        
        <div className="flex items-center gap-4">
      <ModeToggle />
          
          <button 
            onClick={() => setIsAuthOpen(true)}
            className="px-5 py-2 dark:bg-white dark:text-black bg-black text-white text-sm font-semibold rounded-full dark:hover:bg-gray-200 hover:bg-gray-800 transition-colors"
          >
            Get Started
          </button>
        </div>
      </div>
    </nav>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
}
