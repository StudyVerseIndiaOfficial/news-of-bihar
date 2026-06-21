"use client";

import { useEffect, useMemo, useState } from "react";
import type { YouTubeVideoItem } from "@/data/youtubeVideos";
import { getYouTubeEmbedUrl } from "@/lib/youtube";
import YouTubeVideoCard from "@/components/YouTubeVideoCard";

type YouTubeVideoExplorerProps = {
  videos: YouTubeVideoItem[];
};

const priorityRank: Record<string, number> = {
  High: 3,
  Medium: 2,
  Normal: 1,
};

export default function YouTubeVideoExplorer({
  videos,
}: YouTubeVideoExplorerProps) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [priority, setPriority] = useState("All");
  const [activeSlug, setActiveSlug] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const watch = params.get("watch");
    const q = params.get("q");
    const cat = params.get("category");

    if (watch) setActiveSlug(watch);
    if (q) setSearch(q);
    if (cat) setCategory(cat);
  }, []);

  const categories = useMemo(() => {
    const items = Array.from(new Set(videos.map((video) => video.category)));
    return ["All", ...items];
  }, [videos]);

  const filteredVideos = useMemo(() => {
    const query = search.trim().toLowerCase();

    return videos
      .filter((video) => {
        const text = `
          ${video.title}
          ${video.description}
          ${video.category}
          ${video.source}
          ${video.tags?.join(" ") || ""}
        `.toLowerCase();

        const matchSearch = query === "" || text.includes(query);
        const matchCategory = category === "All" || video.category === category;
        const matchPriority = priority === "All" || video.priority === priority;

        return matchSearch && matchCategory && matchPriority;
      })
      .sort((a, b) => {
        const featuredScore = Number(b.isFeatured) - Number(a.isFeatured);

        if (featuredScore !== 0) return featuredScore;

        return (
          (priorityRank[b.priority || "Normal"] || 1) -
          (priorityRank[a.priority || "Normal"] || 1)
        );
      });
  }, [videos, search, category, priority]);

  const activeVideo =
    videos.find((video) => video.slug === activeSlug) ||
    videos.find((video) => video.isFeatured) ||
    filteredVideos[0];

  const embedUrl = activeVideo ? getYouTubeEmbedUrl(activeVideo.youtubeUrl) : "";

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setPriority("All");
  };

  return (
    <div className="bg-gray-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-red-800 to-orange-600 px-4 py-8 text-white">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-3 inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-black text-yellow-100">
            Video News
          </div>

          <h1 className="text-4xl font-black leading-tight md:text-5xl">
            News of Bihar Videos
          </h1>

          <p className="mt-3 max-w-3xl break-words text-sm font-semibold leading-7 text-red-50 md:text-base">
  बिहार की जरूरी खबरें, शिक्षा अपडेट, सरकारी नौकरी, योजना और जनता से
  जुड़ी महत्वपूर्ण जानकारी अब वीडियो के रूप में देखें। यहाँ हर वीडियो
  को सरल भाषा, साफ समझ और भरोसेमंद जानकारी के साथ रखा जाता है, ताकि
  दर्शक सिर्फ खबर न देखें — उसे सही तरह समझ भी सकें।
</p>
          <div className="mt-5 flex flex-wrap gap-3 text-xs font-black">
            <span className="rounded-full bg-white/15 px-3 py-2">
              Total Videos: {videos.length}
            </span>

            <span className="rounded-full bg-white/15 px-3 py-2">
              Showing: {filteredVideos.length}
            </span>
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="mx-auto max-w-6xl">
          {activeVideo && (
            <div className="mb-6 overflow-hidden rounded-[2rem] bg-white shadow-xl">
              <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
                <div className="bg-black">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={activeVideo.title}
                      className="aspect-video w-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  ) : (
                    <div className="flex aspect-video items-center justify-center text-white">
                      Video link सही नहीं है
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-800">
                      {activeVideo.category}
                    </span>

                    {activeVideo.isFeatured && (
                      <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-black text-yellow-800">
                        FEATURED
                      </span>
                    )}
                  </div>

                  <h2 className="text-2xl font-black leading-snug text-gray-950">
                    {activeVideo.title}
                  </h2>

                  <p className="mt-3 text-sm font-semibold leading-7 text-gray-600">
                    {activeVideo.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-bold text-gray-500">
                    <span>🗓️ {activeVideo.date}</span>
                    <span>📰 {activeVideo.source}</span>
                  </div>

                  <a
                    href={activeVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-block rounded-2xl bg-red-800 px-4 py-3 text-sm font-black text-white"
                  >
                    YouTube पर देखें
                  </a>
                </div>
              </div>
            </div>
          )}

          <div className="mb-6 rounded-[2rem] border border-red-100 bg-white p-5 shadow-md">
            <h2 className="mb-4 text-2xl font-black text-red-900">
              Search & Filter Videos
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <div className="lg:col-span-2">
                <label className="mb-2 block text-sm font-black text-gray-700">
                  Search Videos
                </label>
                <input
                  type="text"
                  placeholder="Video title, category या tag search करें..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                />
              </div>

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
            </div>

            <div className="mt-4">
              <button
                onClick={clearFilters}
                className="rounded-2xl bg-gray-900 px-4 py-3 text-sm font-black text-white"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {filteredVideos.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredVideos.map((video) => (
                <YouTubeVideoCard key={video.slug} video={video} />
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] bg-white p-8 text-center shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
                🔎
              </div>

              <h2 className="text-2xl font-black text-red-900">
                कोई video नहीं मिला
              </h2>

              <p className="mx-auto mt-2 max-w-xl text-sm font-semibold leading-7 text-gray-600">
                आपकी search या filter के अनुसार अभी कोई video उपलब्ध नहीं है।
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}