"use client";

import { useState } from "react";

export default function HeroSearch() {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const finalQuery = query.trim();

    if (finalQuery) {
      window.location.href = `/latest-news?q=${encodeURIComponent(finalQuery)}`;
    } else {
      window.location.href = "/latest-news";
    }
  };

  return (
    <form onSubmit={handleSearch} className="rounded-2xl bg-white p-3 shadow-xl">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="खबर, जिला, नौकरी या योजना खोजें..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold text-gray-800 outline-none focus:border-red-500"
        />

        <button
          type="submit"
          className="rounded-xl bg-red-800 px-4 py-3 text-sm font-black text-white"
        >
          Search
        </button>
      </div>
    </form>
  );
}