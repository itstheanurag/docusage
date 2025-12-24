"use client";

import React from "react";
import Link from "next/link";

export const NewFooter: React.FC = () => {
  return (
    <footer className="py-20 border-t dark:border-white/10 border-black/10 dark:bg-black bg-white transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 dark:bg-white dark:text-black bg-black text-white rounded flex items-center justify-center font-bold text-lg">
                D
              </div>
              <span className="text-xl font-bold tracking-tight dark:text-white text-black">
                Docusage
              </span>
            </div>
            <p className="dark:text-gray-500 text-gray-600 max-w-xs mb-6">
              The professional alternative to proprietary document generation
              platforms.
            </p>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-5 h-5 dark:bg-white/10 bg-black/10 rounded dark:hover:bg-white/20 hover:bg-black/20 transition-colors cursor-pointer"></div>
              <div className="w-5 h-5 dark:bg-white/10 bg-black/10 rounded dark:hover:bg-white/20 hover:bg-black/20 transition-colors cursor-pointer"></div>
              <div className="w-5 h-5 dark:bg-white/10 bg-black/10 rounded dark:hover:bg-white/20 hover:bg-black/20 transition-colors cursor-pointer"></div>
            </div>
          </div>

          <div>
            <h4 className="dark:text-white text-black font-semibold mb-6">
              Product
            </h4>
            <ul className="space-y-4 dark:text-gray-500 text-gray-500 text-sm">
              <li>
                <Link
                  href="#features"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  Integrations
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="dark:text-white text-black font-semibold mb-6">
              Resources
            </h4>
            <ul className="space-y-4 dark:text-gray-500 text-gray-500 text-sm">
              <li>
                <Link
                  href="#"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  API Reference
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="dark:text-white text-black font-semibold mb-6">
              Open Source
            </h4>
            <ul className="space-y-4 dark:text-gray-500 text-gray-500 text-sm">
              <li>
                <Link
                  href="#"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  License
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  Contributing
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="dark:hover:text-white hover:text-black transition-colors"
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t dark:border-white/5 border-black/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs dark:text-gray-600 text-gray-400">
          <p>© 2024 Docusage Engine. Released under MIT License.</p>
          <div className="flex gap-6">
            <Link
              href="#"
              className="dark:hover:text-white hover:text-black transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="dark:hover:text-white hover:text-black transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="dark:hover:text-white hover:text-black transition-colors"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default NewFooter;
