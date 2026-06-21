"use client";

import { useMemo, useState } from "react";
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/lib/youtube";

const categories = [
  "Latest News",
  "District News",
  "Education",
  "Government Jobs",
  "Sarkari Yojana",
  "Politics",
  "Crime",
  "Agriculture",
  "Health",
  "Weather Alert",
];

const priorities = ["High", "Medium", "Normal"];

function getTodayDate() {
  return new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function createSlug(title: string) {
  return title
    .toLowerCase()
    .replace(/[^\u0900-\u097Fa-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 90);
}

function codeString(value: string) {
  return JSON.stringify(value || "");
}

export default function AdminVideosPage() {
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const [form, setForm] = useState({
    slug: "",
    title: "",
    description: "",
    youtubeUrl: "",
    category: "Latest News",
    date: getTodayDate(),
    source: "News of Bihar YouTube",
    priority: "High",
    isFeatured: true,
    tags: "",
  });

  const autoSlug = useMemo(() => createSlug(form.title), [form.title]);
  const finalSlug = form.slug.trim() || autoSlug || "your-video-slug";
  const thumbnail = getYouTubeThumbnail(form.youtubeUrl);
  const embedUrl = getYouTubeEmbedUrl(form.youtubeUrl);

  const tagArray = form.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  const generatedCode = `{
  slug: ${codeString(finalSlug)},
  title: ${codeString(form.title || "यहाँ Video Title लिखें")},
  description: ${codeString(form.description || "यहाँ video description लिखें")},
  youtubeUrl: ${codeString(form.youtubeUrl || "https://www.youtube.com/watch?v=VIDEO_ID")},
  category: ${codeString(form.category)},
  date: ${codeString(form.date || getTodayDate())},
  source: ${codeString(form.source || "News of Bihar YouTube")},
  priority: ${codeString(form.priority)},
  isFeatured: ${form.isFeatured},
  tags: [${tagArray.map((tag) => codeString(tag)).join(", ")}],
},`;

  const handleLogin = () => {
    if (password === "admin123") {
      setIsLogin(true);
    } else {
      alert("गलत password");
    }
  };

  const copyCode = async () => {
    await navigator.clipboard.writeText(generatedCode);
    alert("Video code copy हो गया");
  };

  const clearForm = () => {
    setForm({
      slug: "",
      title: "",
      description: "",
      youtubeUrl: "",
      category: "Latest News",
      date: getTodayDate(),
      source: "News of Bihar YouTube",
      priority: "High",
      isFeatured: true,
      tags: "",
    });
  };

  if (!isLogin) {
    return (
      <div className="min-h-screen bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-md rounded-3xl bg-white p-6 shadow-md">
          <div className="mb-5 rounded-3xl bg-gradient-to-br from-red-900 to-orange-600 p-5 text-white">
            <h1 className="text-3xl font-black">Video Admin Login</h1>
            <p className="mt-2 text-sm font-semibold leading-6 text-red-50">
              YouTube video generator खोलने के लिए password डालें।
            </p>
          </div>

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
          />

          <button
            onClick={handleLogin}
            className="w-full rounded-2xl bg-red-800 px-4 py-3 text-sm font-black text-white"
          >
            Login
          </button>

          <p className="mt-4 rounded-2xl bg-yellow-50 p-3 text-xs font-bold leading-5 text-yellow-900">
            Demo Password: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 rounded-[2rem] bg-gradient-to-r from-red-950 via-red-800 to-orange-600 p-6 text-white shadow-xl">
          <p className="mb-2 inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-black">
            News of Bihar Video Admin
          </p>

          <h1 className="text-4xl font-black leading-tight">
            YouTube Video Sync Generator
          </h1>

          <p className="mt-2 max-w-3xl text-sm font-semibold leading-7 text-red-50">
            YouTube video link paste करें। Thumbnail और embed player automatic
            detect होगा। Final code copy करके data/youtubeVideos.ts में paste करें।
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_480px]">
          <div className="rounded-[2rem] bg-white p-5 shadow-md">
            <h2 className="mb-5 text-2xl font-black text-red-900">
              Add YouTube Video
            </h2>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-700">
                YouTube Video Link
              </label>
              <input
                type="text"
                placeholder="https://www.youtube.com/watch?v=VIDEO_ID"
                value={form.youtubeUrl}
                onChange={(e) =>
                  setForm({ ...form, youtubeUrl: e.target.value })
                }
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-black text-gray-700">
                  Category
                </label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm({ ...form, category: e.target.value })
                  }
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                >
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-gray-700">
                  Priority
                </label>
                <select
                  value={form.priority}
                  onChange={(e) =>
                    setForm({ ...form, priority: e.target.value })
                  }
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                >
                  {priorities.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4">
              <label className="flex items-center gap-3 text-sm font-black text-red-900">
                <input
                  type="checkbox"
                  checked={form.isFeatured}
                  onChange={(e) =>
                    setForm({ ...form, isFeatured: e.target.checked })
                  }
                  className="h-5 w-5"
                />
                इस video को Featured Video बनाएं
              </label>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-black text-gray-700">
                Video Title
              </label>
              <input
                type="text"
                placeholder="यहाँ video title लिखें"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
              />
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-black text-gray-700">
                Custom Slug / URL
              </label>
              <input
                type="text"
                placeholder={autoSlug || "auto-generated-url"}
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
              />
              <p className="mt-1 text-xs font-bold text-gray-500">
                Final URL: /videos?watch={finalSlug}
              </p>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-black text-gray-700">
                Description
              </label>
              <textarea
                placeholder="Video description लिखें"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                className="min-h-24 w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold leading-6 outline-none focus:border-red-500"
              />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-black text-gray-700">
                  Date
                </label>
                <input
                  type="text"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-black text-gray-700">
                  Source
                </label>
                <input
                  type="text"
                  value={form.source}
                  onChange={(e) =>
                    setForm({ ...form, source: e.target.value })
                  }
                  className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="mb-2 block text-sm font-black text-gray-700">
                Tags / Keywords
              </label>
              <input
                type="text"
                placeholder="Bihar News, BPSC, Education"
                value={form.tags}
                onChange={(e) => setForm({ ...form, tags: e.target.value })}
                className="w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500"
              />
              <p className="mt-1 text-xs font-bold text-gray-500">
                Tags comma से अलग करें।
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-[2rem] bg-white p-5 shadow-md">
              <h2 className="mb-4 text-2xl font-black text-red-900">
                Video Preview
              </h2>

              <div className="overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                {thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={thumbnail}
                    alt={form.title || "Video Thumbnail"}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-red-900 to-orange-500 text-white">
                    <p className="font-black">YouTube thumbnail यहाँ दिखेगा</p>
                  </div>
                )}

                <div className="p-4">
                  <h3 className="text-xl font-black leading-snug text-gray-950">
                    {form.title || "यहाँ Video Title दिखेगा"}
                  </h3>

                  <p className="mt-2 text-sm font-semibold leading-6 text-gray-600">
                    {form.description || "यहाँ description दिखेगा"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-gray-500">
                    <span>{form.category}</span>
                    <span>{form.date}</span>
                  </div>
                </div>
              </div>

              {embedUrl && (
                <div className="mt-4 overflow-hidden rounded-3xl bg-black">
                  <iframe
                    src={embedUrl}
                    title={form.title || "Video Preview"}
                    className="aspect-video w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
              )}
            </div>

            <div className="rounded-[2rem] bg-white p-5 shadow-md">
              <div className="mb-4 flex items-center justify-between gap-3">
                <h2 className="text-2xl font-black text-red-900">
                  Copy Video Code
                </h2>

                <button
                  onClick={clearForm}
                  className="rounded-2xl border border-red-200 px-4 py-2 text-xs font-black text-red-800"
                >
                  Clear
                </button>
              </div>

              <pre className="mb-4 max-h-[420px] overflow-auto rounded-3xl bg-gray-950 p-4 text-xs font-semibold leading-6 text-white">
                {generatedCode}
              </pre>

              <button
                onClick={copyCode}
                className="w-full rounded-2xl bg-red-800 px-4 py-3 text-sm font-black text-white hover:bg-red-900"
              >
                Copy Video Code
              </button>

              <div className="mt-4 rounded-2xl bg-yellow-50 p-4 text-sm font-bold leading-6 text-yellow-900">
                Copy करने के बाद इसे data/youtubeVideos.ts में youtubeVideos
                array के अंदर सबसे ऊपर paste करें।
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}