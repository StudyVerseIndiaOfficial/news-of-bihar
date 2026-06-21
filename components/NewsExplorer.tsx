"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import NewsCard from "@/components/NewsCard";
import type { NewsItem } from "@/data/newsData";

type NewsExplorerProps = {
  news: NewsItem[];
  title: string;
  subtitle: string;
  lockedCategory?: string;
  badgeText?: string;
};

const defaultDistricts = [
  "Patna",
  "Gaya",
  "Muzaffarpur",
  "Bhagalpur",
  "Darbhanga",
  "Purnea",
  "Nalanda",
  "Begusarai",
  "Madhubani",
  "Saran",
  "Siwan",
  "Rohtas",
  "Samastipur",
  "Vaishali",
  "Bhojpur",
  "Katihar",
];

const priorityRank: Record<string, number> = {
  High: 3,
  Medium: 2,
  Normal: 1,
};

export default function NewsExplorer({
  news,
  title,
  subtitle,
  lockedCategory,
  badgeText = "News Explorer",
}: NewsExplorerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(lockedCategory || "All");
  const [district, setDistrict] = useState("All");
  const [priority, setPriority] = useState("All");
  const [breakingOnly, setBreakingOnly] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const queryDistrict = params.get("district");
    const querySearch = params.get("q");
    const queryCategory = params.get("category");

    if (queryDistrict) setDistrict(queryDistrict);
    if (querySearch) setSearch(querySearch);
    if (queryCategory && !lockedCategory) setCategory(queryCategory);
  }, [lockedCategory]);

  const categories = useMemo(() => {
    const items = Array.from(new Set(news.map((item) => item.category)));
    return ["All", ...items];
  }, [news]);

  const districts = useMemo(() => {
    const fromNews = news
      .map((item) => item.district)
      .filter((item) => item && item !== "All Bihar");

    const unique = Array.from(new Set([...defaultDistricts, ...fromNews]));
    return ["All", "All Bihar", ...unique];
  }, [news]);

  const filteredNews = useMemo(() => {
    const query = search.trim().toLowerCase();

    return news
      .filter((item) => {
        const searchableText = `
          ${item.title}
          ${item.description}
          ${item.category}
          ${item.district}
          ${item.source}
          ${item.content}
          ${item.tags?.join(" ") || ""}
        `.toLowerCase();

        const matchSearch = query === "" || searchableText.includes(query);
        const matchCategory =
          category === "All" || item.category === category || lockedCategory;
        const matchDistrict =
          district === "All" ||
          item.district === district ||
          item.district === "All Bihar";
        const matchPriority =
          priority === "All" || item.priority === priority;
        const matchBreaking = !breakingOnly || item.isBreaking === true;

        return (
          matchSearch &&
          matchCategory &&
          matchDistrict &&
          matchPriority &&
          matchBreaking
        );
      })
      .sort((a, b) => {
        const breakingScore = Number(b.isBreaking) - Number(a.isBreaking);

        if (breakingScore !== 0) return breakingScore;

        return (
          (priorityRank[b.priority || "Normal"] || 1) -
          (priorityRank[a.priority || "Normal"] || 1)
        );
      });
  }, [news, search, category, district, priority, breakingOnly, lockedCategory]);

  const clearFilters = () => {
    setSearch("");
    setCategory(lockedCategory || "All");
    setDistrict("All");
    setPriority("All");
    setBreakingOnly(false);
  };

  return (
    <div className="bg-gray-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-red-800 to-orange-600 px-4 py-8 text-white">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-3 inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-black text-yellow-100">
            {badgeText}
          </div>

          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            {title}
          </h1>

          <p className="mt-3 max-w-3xl text-sm font-semibold leading-7 text-red-50 md:text-base">
            {subtitle}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs font-black">
            <span className="rounded-full bg-white/15 px-3 py-2">
              Total News: {news.length}
            </span>

            <span className="rounded-full bg-white/15 px-3 py-2">
              Showing: {filteredNews.length}
            </span>

            {lockedCategory && (
              <span className="rounded-full bg-yellow-300 px-3 py-2 text-red-950">
                Category: {lockedCategory}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 rounded-[2rem] border border-red-100 bg-white p-5 shadow-md">
            <h2 className="mb-4 text-2xl font-black text-red-900">
              Search & Filter News
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-black text-gray-700">
                  Search News
                </label>
                <input
                  type="text"
                  placeholder="खबर, जिला, परीक्षा, नौकरी या योजना खोजें..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
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
                    className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
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
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                >
                  {districts.map((item) => (
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
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                >
                  <option>All</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Normal</option>
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex w-full items-center gap-3 rounded-2xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-black text-red-900">
                  <input
                    type="checkbox"
                    checked={breakingOnly}
                    onChange={(e) => setBreakingOnly(e.target.checked)}
                    className="h-5 w-5"
                  />
                  Breaking Only
                </label>
              </div>

              <div className="flex items-end">
                <button
                  onClick={clearFilters}
                  className="w-full rounded-2xl bg-gray-900 px-4 py-3 text-sm font-black text-white"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {search && (
                <span className="rounded-full bg-red-100 px-3 py-2 text-xs font-black text-red-900">
                  Search: {search}
                </span>
              )}

              {category !== "All" && (
                <span className="rounded-full bg-orange-100 px-3 py-2 text-xs font-black text-orange-900">
                  Category: {category}
                </span>
              )}

              {district !== "All" && (
                <span className="rounded-full bg-yellow-100 px-3 py-2 text-xs font-black text-yellow-900">
                  District: {district}
                </span>
              )}

              {priority !== "All" && (
                <span className="rounded-full bg-blue-100 px-3 py-2 text-xs font-black text-blue-900">
                  Priority: {priority}
                </span>
              )}

              {breakingOnly && (
                <span className="rounded-full bg-red-800 px-3 py-2 text-xs font-black text-white">
                  Breaking Only
                </span>
              )}
            </div>
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredNews.map((item) => (
                <NewsCard key={item.slug} {...item} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] bg-white p-8 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                🔍
              </div>

              <h2 className="text-2xl font-black text-red-900">
                कोई खबर नहीं मिली
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-7 text-gray-600">
                आपकी search या filter के अनुसार अभी कोई खबर उपलब्ध नहीं है।
                Filter clear करके दोबारा search करें।
              </p>

              <button
                onClick={clearFilters}
                className="mt-5 rounded-2xl bg-red-800 px-5 py-3 text-sm font-black text-white"
              >
                Clear Filters
              </button>
            </div>
          )}

          <div className="mt-8 rounded-[2rem] border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
            <div className="grid gap-4 md:grid-cols-[1.5fr_1fr] md:items-center">
              <div>
                <h2 className="text-2xl font-black text-yellow-950">
                  जरूरी सूचना
                </h2>
                <p className="mt-2 text-sm font-bold leading-7 text-yellow-900">
                  सरकारी नौकरी, परीक्षा, योजना, admit card, result या official
                  notice से जुड़ी जानकारी को final मानने से पहले official
                  website से जरूर मिलान करें।
                </p>
              </div>

              <div className="flex flex-wrap gap-3 md:justify-end">
                <Link
                  href="/disclaimer"
                  className="rounded-2xl bg-yellow-900 px-4 py-3 text-sm font-black text-white"
                >
                  Disclaimer
                </Link>

                <Link
                  href="/contact"
                  className="rounded-2xl border border-yellow-700 bg-white px-4 py-3 text-sm font-black text-yellow-900"
                >
                  Correction भेजें
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}