"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import navigationData from "@/app/lib/navigation-data.json";
import { commandFeatures } from "@/app/lib/command-features";
import { Search } from "./Search";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
    const features = commandFeatures[href];

    return (
      <Link href={href} className="group flex items-center justify-between py-0.5">
        <code>{children}</code>
        <span className="flex gap-1.5 ml-2">
          {features?.hasExamples && (
            <div className="relative flex items-center group/tooltip">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              <div className="absolute right-0 top-0 -mt-8 px-2 py-1 bg-neutral-800 text-white text-xs rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Extra examples
              </div>
            </div>
          )}
          {features?.hasOnlineExecution && (
            <div className="relative flex items-center group/tooltip">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <div className="absolute right-0 top-0 -mt-8 px-2 py-1 bg-neutral-800 text-white text-xs rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                Run the command online
              </div>
            </div>
          )}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-neutral-100"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
        </svg>
      </button>

      {/* Navigation sidebar */}
      <nav
        className={`${
          isOpen ? "fixed inset-0 z-40" : "hidden"
        } sm:relative sm:block w-full sm:w-64 h-full overflow-y-auto bg-white border-r border-b  border-neutral-900 p-4`}
      >
        <div className="mb-4">
          <Link href="/">
            <Image src="/quickcast-logo.png" alt="QuickCast" width={300} height={45} priority />
          </Link>
        </div>

        <div className="mb-4">
          <Search />
        </div>

        <div className="mb-4 mt-2 text-sm text-neutral-500 space-y-1">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <span>Extra examples</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Run the command online</span>
          </div>
        </div>

        {/* Generate navigation from data */}
        {Object.entries(navigationData.categories).map(([category, commands]) => (
          <div key={category}>
            <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-2 bg-[#e0e0e0]">{category}</h3>
            <ul className="text-sm space-y-1">
              {(commands as any[]).map((command) => (
                <li key={command.href}>
                  <NavLink href={command.href}>{command.text}</NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Add the General section with cast command */}
        <h3 className="text-m font-semibold m-0 my-2 -mx-4 px-4 py-2 bg-[#e0e0e0]">General</h3>
        <ul className="text-sm space-y-1">
          <li>
            <Link href="/cast" className="group flex items-center justify-between py-0.5">
              <code>cast</code>
            </Link>
          </li>
        </ul>
      </nav>

      {/* Mobile overlay */}
      {isOpen && <div className="sm:hidden fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />}
    </>
  );
}