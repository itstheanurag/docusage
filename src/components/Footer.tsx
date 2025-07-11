"use client";
import { X, Mail, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-auto border-t border-border bg-background text-foreground py-4 text-sm">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left side */}
        <div className="text-center md:text-left">
          <p className="font-semibold text-lg">Docusage</p>
          <p className="text-muted-foreground">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Center nav links */}
        <div className="flex gap-6 text-muted-foreground">
          <a href="/privacy" className="hover:text-primary transition">
            Privacy
          </a>
          <a href="/terms" className="hover:text-primary transition">
            Terms
          </a>
          <a href="/about" className="hover:text-primary transition">
            About
          </a>
        </div>

        {/* Right side social icons */}
        <div className="flex gap-4">
          <a
            href="https://github.com/itstheanurag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5 hover:text-primary transition" />
          </a>
          <a
            href="https://x.com/itstheanurag"
            target="_blank"
            rel="noopener noreferrer"
          >
            <X className="h-5 w-5 hover:text-primary transition" />
          </a>
          <a href="mailto:gauravanurag36@gmail.com">
            <Mail className="h-5 w-5 hover:text-primary transition" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
