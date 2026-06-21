"use client";

import { useMemo, useState } from "react";
import NewsCard from "@/components/NewsCard";
import type { NewsItem } from "@/data/newsData";

type NewsExplorerProps = {
  news: NewsItem[];
  title: string;
  subtitle: string;
  lockedCategory?: string;
  badgeText?: string;
};

const biharDistricts = [
  "All Districts",
  "Araria",
  "Arwal",
  "Aurangabad",
  "Banka",
  "Begusarai",
  "Bhagalpur",
  "Bhojpur",
  "Buxar",
  "Darbhanga",
  "East Champaran",
  "Gaya",
  "Gopalganj",
  "Jamui",
  "Jehanabad",
  "Kaimur",
  "Katihar",
  "Khagaria",
  "Kishanganj",
  "Lakhisarai",
  "Madhepura",
  "Madhubani",
  "Munger",
  "Muzaffarpur",
  "Nalanda",
  "Nawada",
  "Patna",
  "Purnea",
  "Rohtas",
  "Saharsa",
  "Samastipur",
  "Saran",
  "Sheikhpura",
  "Sheohar",
  "Sitamarhi",
  "Siwan",
  "Supaul",
  "Vaishali",
  "West Champaran",
  "All Bihar",
];

const priorityRank: Record<string, number> = {
  High: 3,
  Medium: 2,
  Normal: 1,
};

function normalizeText(value: string) {
  return value.trim().toLowerCase();
}

export default function NewsExplorer({
  news,
  title,
  subtitle,
  lockedCategory,
  badgeText = "Latest Updates",
}: NewsExplorerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(lockedCategory || "All");
  const [district, setDistrict] = useState("All Districts");
  const [priority, setPriority] = useState("All");
  const [breakingOnly, setBreakingOnly] = useState(false);

  const categories = useMemo(() => {
    const dynamicCategories = Array.from(
      new Set(news.map((item) => item.category).filter(Boolean))
    );

    return ["All", ...dynamicCategories];
  }, [news]);

  const filteredNews = useMemo(() => {
    const query = normalizeText(search);

    return news
      .filter((item) => {
        const itemText = normalizeText(`
          ${item.title}
          ${item.description}
          ${item.category}
          ${item.district}
          ${item.source}
          ${item.tags?.join(" ") || ""}
          ${item.content || ""}
        `);

        const matchSearch = query === "" || itemText.includes(query);

        const matchCategory = lockedCategory
          ? item.category === lockedCategory
          : category === "All" || item.category === category;

        const matchDistrict =
          district === "All Districts" ||
          normalizeText(item.district || "") === normalizeText(district) ||
          normalizeText(item.district || "") === "all bihar";

        const matchPriority =
          priority === "All" || item.priority === priority;

        const matchBreaking = !breakingOnly || item.isBreaking;

        return (
          matchSearch &&
          matchCategory &&
          matchDistrict &&
          matchPriority &&
          matchBreaking
        );
      })
      .sort((a, b) => {
        const updatedA = Number((a as any).updatedAtMillis || 0);
        const updatedB = Number((b as any).updatedAtMillis || 0);

        if (updatedB - updatedA !== 0) return updatedB - updatedA;

        const breakingDiff = Number(b.isBreaking) - Number(a.isBreaking);

        if (breakingDiff !== 0) return breakingDiff;

        return (
          (priorityRank[b.priority || "Normal"] || 1) -
          (priorityRank[a.priority || "Normal"] || 1)
        );
      });
  }, [news, search, category, district, priority, breakingOnly, lockedCategory]);

  const clearFilters = () => {
    setSearch("");
    setCategory(lockedCategory || "All");
    setDistrict("All Districts");
    setPriority("All");
    setBreakingOnly(false);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-red-800 to-orange-600 px-4 py-8 text-white">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl animate-soft-fade-up">
          <div className="mb-3 inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-black text-yellow-100">
            {badgeText}
          </div>

          <h1 className="break-words text-4xl font-black leading-tight md:text-5xl">
            {title}
          </h1>

          <p className="mt-3 max-w-3xl break-words text-sm font-semibold leading-7 text-red-50 md:text-base">
            {subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs font-black">
            <span className="rounded-full bg-white/15 px-3 py-2">
              Total: {news.length}
            </span>

            <span className="rounded-full bg-white/15 px-3 py-2">
              Showing: {filteredNews.length}
            </span>

            {lockedCategory && (
              <span className="rounded-full bg-yellow-300 px-3 py-2 text-red-950">
                {lockedCategory}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 animate-soft-fade-up rounded-[2rem] border border-red-100 bg-white p-5 shadow-md">
            <h2 className="mb-4 text-2xl font-black text-red-900">
              Search & Filter
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-black text-gray-700">
                  Search News
                </label>
                <input
                  type="text"
                  placeholder="Title, district, source या keyword search करें..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none transition duration-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                />
              </div>

              {!lockedCategory && (
                <div>
                  <label className="mb-2 block text-sm font-black text-gray-700">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none transition duration-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                  >
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm font-black text-gray-700">
                  District
                </label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none transition duration-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                >
                  {biharDistricts.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-gray-700">
                  Priority
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none transition duration-300 focus:border-red-500 focus:ring-4 focus:ring-red-100"
                >
                  <option>All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Normal</option>
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <button
                onClick={() => setBreakingOnly(!breakingOnly)}
                className={`rounded-2xl px-4 py-3 text-sm font-black transition duration-300 active:scale-95 ${
                  breakingOnly
                    ? "bg-red-800 text-white shadow-lg"
                    : "bg-red-50 text-red-900"
                }`}
              >
                {breakingOnly ? "Breaking ON" : "Breaking Only"}
              </button>

              <button
                onClick={clearFilters}
                className="rounded-2xl bg-gray-900 px-4 py-3 text-sm font-black text-white transition duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((item, index) => (
                <div
                  key={item.slug}
                  className="animate-soft-fade-up"
                  style={{ animationDelay: `${Math.min(index * 35, 300)}ms` }}
                >
                  <NewsCard
                    slug={item.slug}
                    category={item.category}
                    title={item.title}
                    description={item.description}
                    district={item.district}
                    date={item.date}
                    priority={item.priority}
                    isBreaking={item.isBreaking}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="animate-soft-fade-up rounded-[2rem] bg-white p-8 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                🔎
              </div>

              <h2 className="text-2xl font-black text-red-900">
                कोई खबर नहीं मिली
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-7 text-gray-600">
                Search या filter बदलकर दोबारा try करें।
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 rounded-2xl bg-red-800 px-5 py-3 text-sm font-black text-white transition duration-300 active:scale-95"
              >
                All News दिखाएं
              </button>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}