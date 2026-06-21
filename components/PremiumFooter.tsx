import Link from "next/link";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Latest News", href: "/latest-news" },
  { label: "District News", href: "/district-news" },
  { label: "Videos", href: "/videos" },
];

const updateLinks = [
  { label: "Education", href: "/education" },
  { label: "Government Jobs", href: "/government-jobs" },
  { label: "Sarkari Yojana", href: "/sarkari-yojana" },
  { label: "Important Links", href: "/important-links" },
];

const districts = [
  "Patna",
  "Gaya",
  "Muzaffarpur",
  "Bhagalpur",
  "Darbhanga",
  "Purnea",
  "Nalanda",
  "Bhojpur",
];

export default function PremiumFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-red-100 bg-gradient-to-br from-red-950 via-red-900 to-orange-700 text-white">
      <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-yellow-300/20 blur-3xl" />
      <div className="absolute -bottom-28 -right-24 h-80 w-80 rounded-full bg-red-300/20 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr_1fr_1.1fr]">
          <div className="animate-soft-fade-up rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-300 to-orange-500 text-lg font-black text-red-950 shadow-xl">
                NOB
              </div>

              <div>
                <h2 className="text-2xl font-black leading-tight">
                  {SITE_NAME}
                </h2>
                <p className="text-xs font-bold text-yellow-100">
                  {SITE_TAGLINE}
                </p>
              </div>
            </div>

            <p className="mt-4 max-w-md text-sm font-semibold leading-7 text-red-50">
              बिहार की ताजा खबरें, जिला अपडेट, शिक्षा, सरकारी नौकरी, योजना और
              जरूरी जानकारी सरल भाषा में — भरोसे के साथ।
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-black text-yellow-100">
                Bihar News
              </span>
              <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-black text-yellow-100">
                Live Updates
              </span>
              <span className="rounded-full bg-white/15 px-3 py-2 text-xs font-black text-yellow-100">
                Public Voice
              </span>
            </div>
          </div>

          <div className="animate-soft-fade-up rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur [animation-delay:80ms]">
            <h3 className="mb-4 text-lg font-black text-yellow-100">
              Quick Links
            </h3>

            <div className="space-y-2">
              {quickLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl px-3 py-2 text-sm font-bold text-red-50 hover:bg-white/10"
                >
                  <span>{item.label}</span>
                  <span className="transition duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="animate-soft-fade-up rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur [animation-delay:160ms]">
            <h3 className="mb-4 text-lg font-black text-yellow-100">
              Updates
            </h3>

            <div className="space-y-2">
              {updateLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-center justify-between rounded-2xl px-3 py-2 text-sm font-bold text-red-50 hover:bg-white/10"
                >
                  <span>{item.label}</span>
                  <span className="transition duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="animate-soft-fade-up rounded-[2rem] border border-white/10 bg-white/10 p-5 backdrop-blur [animation-delay:240ms]">
            <h3 className="mb-4 text-lg font-black text-yellow-100">
              Bihar Districts
            </h3>

            <div className="flex flex-wrap gap-2">
              {districts.map((district) => (
                <Link
                  key={district}
                  href={`/district-news?q=${encodeURIComponent(district)}`}
                  className="rounded-full bg-white/10 px-3 py-2 text-xs font-black text-red-50 hover:bg-yellow-300 hover:text-red-950"
                >
                  {district}
                </Link>
              ))}
            </div>

            <Link
              href="/district-news"
              className="mt-5 inline-block rounded-2xl bg-yellow-300 px-4 py-3 text-xs font-black text-red-950 shadow-lg hover:-translate-y-0.5"
            >
              सभी District News देखें
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-[2rem] border border-white/10 bg-black/20 p-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="text-sm font-black text-white">
              © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-red-100">
              News of Bihar पर दी गई जानकारी जागरूकता और समाचार उद्देश्य के लिए
              है। Official confirmation के लिए संबंधित official source जरूर
              देखें।
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-black text-yellow-100">
              Fast
            </span>
            <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-black text-yellow-100">
              Trusted
            </span>
            <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-black text-yellow-100">
              Bihar Focused
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}