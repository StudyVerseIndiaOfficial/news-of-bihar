"use client";

import Link from "next/link";
import { useState } from "react";

const menuLinks = [
  { name: "Home", href: "/" },
  { name: "Latest News", href: "/latest-news" },
  { name: "District News", href: "/district-news" },
  { name: "Education", href: "/education" },
  { name: "Government Jobs", href: "/government-jobs" },
  { name: "Sarkari Yojana", href: "/sarkari-yojana" },
  { name: "Videos", href: "/videos" },
  { name: "Privacy Policy", href: "/privacy-policy" },
  { name: "Disclaimer", href: "/disclaimer" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-red-100 bg-white shadow-md">
      <div className="bg-gradient-to-r from-red-900 via-red-800 to-orange-600 px-3 py-1.5 text-center text-xs font-black text-white">
        हम खबर को तेज़ बनाने से पहले सही बनाने की कोशिश करते हैं
      </div>

      <div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <button
          onClick={() => setOpen(!open)}
          className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xl font-black text-red-800 shadow-sm hover:bg-red-100"
          aria-label="Open menu"
        >
          ☰
        </button>

        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-900 to-orange-500 text-lg font-black text-white shadow-md">
            NOB
          </div>

          <div>
            <h1 className="text-xl font-black leading-5 tracking-wide text-red-900 md:text-2xl">
              NEWS OF BIHAR
            </h1>
            <p className="text-xs font-bold text-gray-600">
              सच बिहार का, आवाज जनता की
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-4 text-sm font-black text-gray-700 md:flex">
          <Link href="/latest-news" className="hover:text-red-800">
            Latest
          </Link>
          <Link href="/district-news" className="hover:text-red-800">
            District
          </Link>
          <Link href="/education" className="hover:text-red-800">
            Education
          </Link>
          <Link href="/government-jobs" className="hover:text-red-800">
            Jobs
          </Link>
          <Link href="/videos" className="hover:text-red-800">
            Videos
          </Link>
        </nav>
      </div>

      {open && (
        <div className="mx-auto max-w-6xl px-4 pb-4">
          <div className="overflow-hidden rounded-2xl border border-red-100 bg-white shadow-xl">
            <div className="bg-red-50 px-4 py-3">
              <p className="text-sm font-black text-red-900">
                News of Bihar Menu
              </p>
              <p className="text-xs font-semibold text-gray-600">
                अफवाह से दूर, सच्चाई के करीब
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-gray-100 px-4 py-3 text-sm font-bold text-gray-800 hover:bg-red-50 hover:text-red-800"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}