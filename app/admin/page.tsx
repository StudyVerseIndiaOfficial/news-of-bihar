"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { NewsItem, NewsPriority } from "@/data/newsData";
import { getYouTubeThumbnail } from "@/lib/youtube";
import {
  createNewsContent,
  createVideoContent,
  deleteContentItem,
  findContentBySlug,
  getRecentAdminItems,
  setContentLiveStatus,
  updateNewsContent,
  updateVideoContent,
  type AdminContentItem,
  type VideoContentInput,
} from "@/lib/adminContentService";

const newsCategories = [
  "Breaking",
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

const videoCategories = [
  "Video News",
  "Breaking",
  "District News",
  "Education",
  "Government Jobs",
  "Sarkari Yojana",
  "Politics",
  "Crime",
  "Agriculture",
  "Health",
];

const priorities: NewsPriority[] = ["High", "Medium", "Normal"];

type ActiveTab = "news" | "video";

type NewsForm = {
  slug: string;
  category: string;
  title: string;
  description: string;
  district: string;
  date: string;
  source: string;
  sourceLink: string;
  officialLink: string;
  imageTitle: string;
  imageUrl: string;
  priority: NewsPriority;
  isBreaking: boolean;
  tags: string;
  content: string;
};

type VideoForm = {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  source: string;
  youtubeUrl: string;
  priority: NewsPriority;
  isFeatured: boolean;
  tags: string;
};

type YouTubeMeta = {
  success?: boolean;
  title?: string;
  authorName?: string;
  thumbnailUrl?: string;
  description?: string;
  tags?: string[];
};

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

function tagsToArray(value: string) {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
}

function tagsToString(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag)).join(", ");
  }

  if (typeof value === "string") return value;

  return "";
}

function inputClass() {
  return "w-full max-w-full rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-red-500";
}

function textareaClass(size: "short" | "long") {
  const heightClass = size === "long" ? "min-h-56" : "min-h-24";

  return `${heightClass} w-full max-w-full resize-y overflow-x-hidden whitespace-pre-wrap break-words rounded-2xl border border-gray-200 px-4 py-3 text-sm font-bold leading-7 outline-none focus:border-red-500`;
}

function emptyNewsForm(): NewsForm {
  return {
    slug: "",
    category: "Breaking",
    title: "",
    description: "",
    district: "All Bihar",
    date: getTodayDate(),
    source: "News of Bihar Desk",
    sourceLink: "",
    officialLink: "",
    imageTitle: "",
    imageUrl: "",
    priority: "High",
    isBreaking: true,
    tags: "",
    content: "",
  };
}

function emptyVideoForm(): VideoForm {
  return {
    slug: "",
    category: "Video News",
    title: "",
    description: "",
    date: getTodayDate(),
    source: "News of Bihar YouTube",
    youtubeUrl: "",
    priority: "High",
    isFeatured: true,
    tags: "",
  };
}

function buildVideoDescription(title: string) {
  return `${title} — बिहार की जरूरी खबरों, education updates, government jobs, sarkari yojana और जनता से जुड़ी महत्वपूर्ण जानकारी को सरल भाषा में समझने के लिए यह वीडियो देखें।`;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [activeTab, setActiveTab] = useState<ActiveTab>("news");

  const [newsForm, setNewsForm] = useState<NewsForm>(emptyNewsForm());
  const [videoForm, setVideoForm] = useState<VideoForm>(emptyVideoForm());

  const [editingNewsId, setEditingNewsId] = useState("");
  const [editingVideoId, setEditingVideoId] = useState("");

  const [recentItems, setRecentItems] = useState<AdminContentItem[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [isSyncingVideo, setIsSyncingVideo] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [message, setMessage] = useState("");

  const autoNewsSlug = useMemo(
    () => createSlug(newsForm.title),
    [newsForm.title]
  );

  const finalNewsSlug =
    newsForm.slug.trim() || autoNewsSlug || "your-news-slug";

  const autoVideoSlug = useMemo(
    () => createSlug(videoForm.title),
    [videoForm.title]
  );

  const finalVideoSlug =
    videoForm.slug.trim() || autoVideoSlug || "your-video-slug";

  const youtubeThumbnail = getYouTubeThumbnail(videoForm.youtubeUrl);

  const loadRecentItems = async () => {
    setIsLoadingItems(true);
    const items = await getRecentAdminItems();
    setRecentItems(items);
    setIsLoadingItems(false);
  };

  useEffect(() => {
    if (isLogin) {
      loadRecentItems();
    }
  }, [isLogin]);

  const handleLogin = () => {
    if (password === "admin123") {
      setIsLogin(true);
      setMessage("");
    } else {
      alert("गलत password");
    }
  };

  const clearNewsForm = () => {
    setNewsForm(emptyNewsForm());
    setEditingNewsId("");
    setMessage("");
  };

  const clearVideoForm = () => {
    setVideoForm(emptyVideoForm());
    setEditingVideoId("");
    setMessage("");
  };

  const requestYouTubeMeta = async (youtubeUrl: string) => {
    const response = await fetch(
      `/api/youtube-meta?url=${encodeURIComponent(youtubeUrl)}`,
      { cache: "no-store" }
    );

    if (!response.ok) {
      throw new Error("YouTube details sync failed");
    }

    const data: YouTubeMeta = await response.json();

    const title = data.title?.trim() || "News of Bihar YouTube Video";
    const description =
      data.description?.trim() || buildVideoDescription(title);
    const source = data.authorName?.trim() || "News of Bihar YouTube";
    const tags =
      Array.isArray(data.tags) && data.tags.length > 0
        ? data.tags.join(", ")
        : "Bihar News, News of Bihar, Video Update";

    return {
      title,
      description,
      source,
      tags,
    };
  };

  const syncYouTubeDetails = async () => {
    try {
      setMessage("");

      if (!videoForm.youtubeUrl.trim()) {
        alert("पहले YouTube video link paste करें");
        return null;
      }

      setIsSyncingVideo(true);

      const meta = await requestYouTubeMeta(videoForm.youtubeUrl.trim());

      const updatedForm: VideoForm = {
        ...videoForm,
        title: meta.title,
        description: meta.description,
        source: meta.source,
        tags: meta.tags,
        slug: videoForm.slug.trim() || createSlug(meta.title),
      };

      setVideoForm(updatedForm);
      setMessage("✅ YouTube details auto sync हो गई। अब video publish करें।");

      return updatedForm;
    } catch (error) {
      console.error(error);
      setMessage("❌ YouTube details sync नहीं हुई। Link check करें।");
      return null;
    } finally {
      setIsSyncingVideo(false);
    }
  };

  const saveNews = async () => {
    try {
      setMessage("");

      if (!newsForm.title.trim()) {
        alert("News title जरूरी है");
        return;
      }

      if (!newsForm.description.trim()) {
        alert("Short description जरूरी है");
        return;
      }

      if (!newsForm.content.trim()) {
        alert("Full news content जरूरी है");
        return;
      }

      setIsSaving(true);

      const payload: NewsItem = {
        slug: finalNewsSlug,
        category: newsForm.category,
        title: newsForm.title.trim(),
        description: newsForm.description.trim(),
        district: newsForm.district.trim() || "All Bihar",
        date: newsForm.date.trim() || getTodayDate(),
        source: newsForm.source.trim() || "News of Bihar Desk",
        content: newsForm.content.trim(),
        imageTitle: newsForm.imageTitle.trim() || newsForm.title.trim(),
        imageUrl: newsForm.imageUrl.trim(),
        officialLink: newsForm.officialLink.trim(),
        sourceLink: newsForm.sourceLink.trim(),
        priority: newsForm.priority,
        isBreaking: newsForm.isBreaking,
        tags: tagsToArray(newsForm.tags),
      };

      if (editingNewsId) {
        await updateNewsContent(editingNewsId, payload);
        setMessage("✅ News edit होकर recent list में top पर आ गई।");
      } else {
        const existingNews = await findContentBySlug("news", finalNewsSlug);

        if (existingNews) {
          alert(
            "इस slug/URL से news पहले से मौजूद है। Custom Slug बदलें या old item को edit करें।"
          );
          setIsSaving(false);
          return;
        }

        await createNewsContent(payload);
        setMessage("✅ News live publish हो गई और recent list में top पर आ गई।");
      }

      clearNewsForm();
      await loadRecentItems();
    } catch (error) {
      console.error(error);
      setMessage("❌ News save नहीं हुई। Firestore Database और Rules check करें।");
    } finally {
      setIsSaving(false);
    }
  };

  const saveVideo = async () => {
    try {
      setMessage("");

      if (!videoForm.youtubeUrl.trim()) {
        alert("YouTube video link जरूरी है");
        return;
      }

      setIsSaving(true);

      let finalForm = videoForm;

      if (
        !videoForm.title.trim() ||
        !videoForm.description.trim() ||
        !videoForm.source.trim() ||
        !videoForm.tags.trim()
      ) {
        const meta = await requestYouTubeMeta(videoForm.youtubeUrl.trim());

        finalForm = {
          ...videoForm,
          title: meta.title,
          description: meta.description,
          source: meta.source,
          tags: meta.tags,
          slug: videoForm.slug.trim() || createSlug(meta.title),
        };

        setVideoForm(finalForm);
      }

      const finalSlug =
        finalForm.slug.trim() || createSlug(finalForm.title) || "video-update";

      const payload: VideoContentInput = {
        slug: finalSlug,
        category: finalForm.category,
        title: finalForm.title.trim(),
        description:
          finalForm.description.trim() || buildVideoDescription(finalForm.title),
        date: finalForm.date.trim() || getTodayDate(),
        source: finalForm.source.trim() || "News of Bihar YouTube",
        youtubeUrl: finalForm.youtubeUrl.trim(),
        priority: finalForm.priority,
        isFeatured: finalForm.isFeatured,
        tags: tagsToArray(finalForm.tags),
      };

      if (editingVideoId) {
        await updateVideoContent(editingVideoId, payload);
        setMessage("✅ YouTube video edit होकर recent list में top पर आ गया।");
      } else {
        const existingVideo = await findContentBySlug("video", finalSlug);

        if (existingVideo) {
          alert(
            "इस slug/URL से video पहले से मौजूद है। Custom Slug बदलें या old item को edit करें।"
          );
          setIsSaving(false);
          return;
        }

        await createVideoContent(payload);
        setMessage("✅ YouTube video live publish हो गया और recent list में top पर आ गया।");
      }

      clearVideoForm();
      await loadRecentItems();
    } catch (error) {
      console.error(error);
      setMessage("❌ Video save नहीं हुआ। YouTube link, Firestore Rules और internet check करें।");
    } finally {
      setIsSaving(false);
    }
  };

  const editItem = (item: AdminContentItem) => {
    setMessage("");

    if (item.type === "news") {
      setActiveTab("news");
      setEditingNewsId(item.id);
      setEditingVideoId("");

      setNewsForm({
        slug: item.slug,
        category: item.category || "Breaking",
        title: item.title,
        description: item.description,
        district: item.district || "All Bihar",
        date: item.date || getTodayDate(),
        source: item.source || "News of Bihar Desk",
        sourceLink: item.sourceLink || "",
        officialLink: item.officialLink || "",
        imageTitle: item.imageTitle || item.title,
        imageUrl: item.imageUrl || "",
        priority: item.priority || "Normal",
        isBreaking: Boolean(item.isBreaking),
        tags: tagsToString(item.tags),
        content: item.content || "",
      });

      setMessage("✍️ News edit mode खुल गया। बदलाव करके Update News दबाएँ।");
    } else {
      setActiveTab("video");
      setEditingVideoId(item.id);
      setEditingNewsId("");

      setVideoForm({
        slug: item.slug,
        category: item.category || "Video News",
        title: item.title,
        description: item.description,
        date: item.date || getTodayDate(),
        source: item.source || "News of Bihar YouTube",
        youtubeUrl: item.youtubeUrl || "",
        priority: item.priority || "Normal",
        isFeatured: Boolean(item.isFeatured),
        tags: tagsToString(item.tags),
      });

      setMessage("✍️ Video edit mode खुल गया। नया link डालकर Sync करें या Update Video दबाएँ।");
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleLiveStatus = async (item: AdminContentItem) => {
    const nextStatus = !item.isLive;

    const confirmText = nextStatus
      ? "क्या आप इसे फिर से publish करना चाहते हैं?"
      : "क्या आप इसे unpublish करना चाहते हैं?";

    if (!confirm(confirmText)) return;

    await setContentLiveStatus(item.type, item.id, nextStatus);
    setMessage(nextStatus ? "✅ Item publish हो गया।" : "✅ Item unpublish हो गया।");
    await loadRecentItems();
  };

  const removeItem = async (item: AdminContentItem) => {
    if (!confirm("क्या आप सच में इसे delete करना चाहते हैं? यह वापस नहीं आएगा।")) {
      return;
    }

    await deleteContentItem(item.type, item.id);
    setMessage("✅ Item delete हो गया।");
    await loadRecentItems();
  };

  const activePreviewTitle =
    activeTab === "news"
      ? newsForm.title || "यहाँ News Title दिखेगा"
      : videoForm.title || "YouTube link sync करने पर title यहाँ दिखेगा";

  const activePreviewDescription =
    activeTab === "news"
      ? newsForm.description || "यहाँ short description दिखेगा"
      : videoForm.description ||
        "YouTube link से details sync करने पर description यहाँ दिखेगा";

  if (!isLogin) {
    return (
      <div className="min-h-screen overflow-x-hidden bg-gray-50 px-3 py-10 sm:px-4">
        <div className="mx-auto w-full max-w-md rounded-3xl bg-white p-5 shadow-md sm:p-6">
          <div className="mb-5 rounded-3xl bg-gradient-to-br from-red-900 to-orange-600 p-5 text-white">
            <h1 className="break-words text-3xl font-black">Admin Login</h1>
            <p className="mt-2 break-words text-sm font-semibold leading-6 text-red-50">
              News of Bihar admin panel में जाने के लिए password डालें।
            </p>
          </div>

          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleLogin();
            }}
            className={inputClass()}
          />

          <button
            onClick={handleLogin}
            className="mt-4 w-full rounded-2xl bg-red-800 px-4 py-3 text-sm font-black text-white"
          >
            Login
          </button>

          <p className="mt-4 rounded-2xl bg-yellow-50 p-3 text-xs font-bold leading-5 text-yellow-900">
            Demo Password: admin123
            <br />
            बाद में इसे secure admin login से और मजबूत करेंगे।
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gray-50 px-3 py-4 sm:px-4 sm:py-6">
      <div className="mx-auto w-full max-w-7xl min-w-0">
        <div className="mb-5 rounded-[1.5rem] bg-gradient-to-r from-red-950 via-red-800 to-orange-600 p-4 text-white shadow-xl sm:mb-6 sm:rounded-[2rem] sm:p-6">
          <p className="mb-2 inline-block rounded-full bg-white/15 px-4 py-2 text-xs font-black">
            News of Bihar Admin
          </p>

          <h1 className="break-words text-3xl font-black leading-tight sm:text-4xl">
            Live Content Dashboard
          </h1>

          <p className="mt-2 max-w-3xl break-words text-sm font-semibold leading-7 text-red-50">
            News और YouTube video link यहाँ से upload करें। Video में सिर्फ
            YouTube link paste करें, बाकी title/source/description automatic
            sync होगा।
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-2xl bg-white px-4 py-3 text-xs font-black text-red-900"
            >
              Public Home
            </Link>

            <button
              onClick={loadRecentItems}
              className="rounded-2xl border border-white/40 bg-white/10 px-4 py-3 text-xs font-black text-white"
            >
              Refresh Recent
            </button>
          </div>
        </div>

        {message && (
          <div className="mb-5 rounded-3xl border border-red-100 bg-white p-4 text-sm font-black leading-6 text-red-900 shadow-sm">
            {message}
          </div>
        )}

        <div className="grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)]">
          <div className="min-w-0 rounded-[1.5rem] bg-white p-4 shadow-md sm:rounded-[2rem] sm:p-5">
            <div className="mb-5 grid grid-cols-2 gap-3">
              <button
                onClick={() => setActiveTab("news")}
                className={`rounded-2xl px-4 py-3 text-sm font-black ${
                  activeTab === "news"
                    ? "bg-red-800 text-white"
                    : "bg-red-50 text-red-900"
                }`}
              >
                📰 News Upload
              </button>

              <button
                onClick={() => setActiveTab("video")}
                className={`rounded-2xl px-4 py-3 text-sm font-black ${
                  activeTab === "video"
                    ? "bg-red-800 text-white"
                    : "bg-red-50 text-red-900"
                }`}
              >
                ▶️ YouTube Video
              </button>
            </div>

            {activeTab === "news" ? (
              <div>
                <h2 className="mb-5 break-words text-2xl font-black text-red-900">
                  {editingNewsId ? "Edit News Material" : "Add New Live News"}
                </h2>

                <div className="grid min-w-0 gap-4 md:grid-cols-2">
                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Category
                    </label>
                    <select
                      value={newsForm.category}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, category: e.target.value })
                      }
                      className={inputClass()}
                    >
                      {newsCategories.map((cat) => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Priority
                    </label>
                    <select
                      value={newsForm.priority}
                      onChange={(e) =>
                        setNewsForm({
                          ...newsForm,
                          priority: e.target.value as NewsPriority,
                        })
                      }
                      className={inputClass()}
                    >
                      {priorities.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4">
                  <label className="flex items-center gap-3 text-sm font-black leading-6 text-red-900">
                    <input
                      type="checkbox"
                      checked={newsForm.isBreaking}
                      onChange={(e) =>
                        setNewsForm({
                          ...newsForm,
                          isBreaking: e.target.checked,
                        })
                      }
                      className="h-5 w-5 shrink-0"
                    />
                    <span className="break-words">
                      इस खबर को Breaking / Highlight News बनाएं
                    </span>
                  </label>
                </div>

                <div className="mt-4 min-w-0">
                  <label className="mb-2 block text-sm font-black text-gray-700">
                    News Title
                  </label>
                  <input
                    type="text"
                    placeholder="यहाँ खबर का title लिखें"
                    value={newsForm.title}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, title: e.target.value })
                    }
                    className={inputClass()}
                  />
                </div>

                <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2">
                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Custom Slug / URL
                    </label>
                    <input
                      type="text"
                      placeholder={autoNewsSlug || "auto-generated-url"}
                      value={newsForm.slug}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, slug: e.target.value })
                      }
                      className={inputClass()}
                    />
                    <p className="mt-1 break-words text-xs font-bold text-gray-500">
                      Final URL: /news/{finalNewsSlug}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      District
                    </label>
                    <input
                      type="text"
                      placeholder="Patna / Gaya / All Bihar"
                      value={newsForm.district}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, district: e.target.value })
                      }
                      className={inputClass()}
                    />
                  </div>
                </div>

                <div className="mt-4 min-w-0">
                  <label className="mb-2 block text-sm font-black text-gray-700">
                    Short Description
                  </label>
                  <textarea
                    placeholder="यहाँ short description लिखें"
                    value={newsForm.description}
                    wrap="soft"
                    onChange={(e) =>
                      setNewsForm({
                        ...newsForm,
                        description: e.target.value,
                      })
                    }
                    className={textareaClass("short")}
                    style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
                  />
                </div>

                <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2">
                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Date
                    </label>
                    <input
                      type="text"
                      placeholder="20 June 2026"
                      value={newsForm.date}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, date: e.target.value })
                      }
                      className={inputClass()}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Source Name
                    </label>
                    <input
                      type="text"
                      placeholder="News of Bihar Desk"
                      value={newsForm.source}
                      onChange={(e) =>
                        setNewsForm({ ...newsForm, source: e.target.value })
                      }
                      className={inputClass()}
                    />
                  </div>
                </div>

                <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2">
                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Official Link
                    </label>
                    <input
                      type="text"
                      placeholder="https://official-website.com"
                      value={newsForm.officialLink}
                      onChange={(e) =>
                        setNewsForm({
                          ...newsForm,
                          officialLink: e.target.value,
                        })
                      }
                      className={inputClass()}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Source Link
                    </label>
                    <input
                      type="text"
                      placeholder="https://source-link.com"
                      value={newsForm.sourceLink}
                      onChange={(e) =>
                        setNewsForm({
                          ...newsForm,
                          sourceLink: e.target.value,
                        })
                      }
                      className={inputClass()}
                    />
                  </div>
                </div>

                <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2">
                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Image Title
                    </label>
                    <input
                      type="text"
                      placeholder="Image title / thumbnail title"
                      value={newsForm.imageTitle}
                      onChange={(e) =>
                        setNewsForm({
                          ...newsForm,
                          imageTitle: e.target.value,
                        })
                      }
                      className={inputClass()}
                    />
                  </div>

                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Image URL
                    </label>
                    <input
                      type="text"
                      placeholder="https://image-link.com/image.jpg"
                      value={newsForm.imageUrl}
                      onChange={(e) =>
                        setNewsForm({
                          ...newsForm,
                          imageUrl: e.target.value,
                        })
                      }
                      className={inputClass()}
                    />
                  </div>
                </div>

                <div className="mt-4 min-w-0">
                  <label className="mb-2 block text-sm font-black text-gray-700">
                    Tags / Keywords
                  </label>
                  <input
                    type="text"
                    placeholder="Bihar News, BPSC, Patna, Sarkari Yojana"
                    value={newsForm.tags}
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, tags: e.target.value })
                    }
                    className={inputClass()}
                  />
                </div>

                <div className="mt-4 min-w-0">
                  <label className="mb-2 block text-sm font-black text-gray-700">
                    Full News Content
                  </label>
                  <textarea
                    placeholder="पूरी खबर विस्तार से लिखें"
                    value={newsForm.content}
                    wrap="soft"
                    onChange={(e) =>
                      setNewsForm({ ...newsForm, content: e.target.value })
                    }
                    className={textareaClass("long")}
                    style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}
                  />
                </div>

                <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
                  <button
                    onClick={saveNews}
                    disabled={isSaving}
                    className="rounded-2xl bg-red-800 px-4 py-4 text-sm font-black text-white hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving
                      ? "Saving..."
                      : editingNewsId
                        ? "Update News"
                        : "Publish Live News"}
                  </button>

                  <button
                    onClick={clearNewsForm}
                    disabled={isSaving}
                    className="rounded-2xl border border-red-200 bg-white px-4 py-4 text-sm font-black text-red-800"
                  >
                    Clear / Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="mb-5 break-words text-2xl font-black text-red-900">
                  {editingVideoId
                    ? "Edit YouTube Video"
                    : "Upload YouTube Video Link"}
                </h2>

                <div className="rounded-3xl border border-red-100 bg-red-50 p-4">
                  <p className="text-sm font-black leading-6 text-red-900">
                    सिर्फ YouTube link paste करें। Title, channel/source,
                    description और tags automatic sync हो जाएंगे।
                  </p>
                </div>

                <div className="mt-4 min-w-0">
                  <label className="mb-2 block text-sm font-black text-gray-700">
                    YouTube Video Link
                  </label>
                  <input
                    type="text"
                    placeholder="https://youtu.be/... या https://www.youtube.com/watch?v=..."
                    value={videoForm.youtubeUrl}
                    onChange={(e) =>
                      setVideoForm({
                        ...videoForm,
                        youtubeUrl: e.target.value,
                      })
                    }
                    className={inputClass()}
                  />

                  <button
                    onClick={syncYouTubeDetails}
                    disabled={isSyncingVideo || !videoForm.youtubeUrl.trim()}
                    className="mt-3 w-full rounded-2xl bg-gray-900 px-4 py-3 text-sm font-black text-white disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSyncingVideo ? "Syncing..." : "Sync YouTube Details"}
                  </button>
                </div>

                <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2">
                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Video Category
                    </label>
                    <select
                      value={videoForm.category}
                      onChange={(e) =>
                        setVideoForm({ ...videoForm, category: e.target.value })
                      }
                      className={inputClass()}
                    >
                      {videoCategories.map((cat) => (
                        <option key={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Priority
                    </label>
                    <select
                      value={videoForm.priority}
                      onChange={(e) =>
                        setVideoForm({
                          ...videoForm,
                          priority: e.target.value as NewsPriority,
                        })
                      }
                      className={inputClass()}
                    >
                      {priorities.map((item) => (
                        <option key={item}>{item}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 rounded-2xl border border-red-100 bg-red-50 p-4">
                  <label className="flex items-center gap-3 text-sm font-black leading-6 text-red-900">
                    <input
                      type="checkbox"
                      checked={videoForm.isFeatured}
                      onChange={(e) =>
                        setVideoForm({
                          ...videoForm,
                          isFeatured: e.target.checked,
                        })
                      }
                      className="h-5 w-5 shrink-0"
                    />
                    <span className="break-words">
                      इस video को Featured बनाएं
                    </span>
                  </label>
                </div>

                <div className="mt-4 grid min-w-0 gap-4 md:grid-cols-2">
                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Custom Slug / URL
                    </label>
                    <input
                      type="text"
                      placeholder={autoVideoSlug || "auto-generated-video-url"}
                      value={videoForm.slug}
                      onChange={(e) =>
                        setVideoForm({ ...videoForm, slug: e.target.value })
                      }
                      className={inputClass()}
                    />
                    <p className="mt-1 break-words text-xs font-bold text-gray-500">
                      Final URL: /videos?watch={finalVideoSlug}
                    </p>
                  </div>

                  <div className="min-w-0">
                    <label className="mb-2 block text-sm font-black text-gray-700">
                      Date
                    </label>
                    <input
                      type="text"
                      placeholder="20 June 2026"
                      value={videoForm.date}
                      onChange={(e) =>
                        setVideoForm({ ...videoForm, date: e.target.value })
                      }
                      className={inputClass()}
                    />
                  </div>
                </div>

                {videoForm.title && (
                  <div className="mt-5 rounded-3xl border border-green-100 bg-green-50 p-4">
                    <h3 className="mb-3 text-lg font-black text-green-900">
                      ✅ Synced YouTube Details
                    </h3>

                    {youtubeThumbnail && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={youtubeThumbnail}
                        alt={videoForm.title}
                        className="mb-4 aspect-video w-full rounded-2xl object-cover"
                      />
                    )}

                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-black text-green-800">
                          Title
                        </p>
                        <p className="break-words text-sm font-bold leading-6 text-gray-900">
                          {videoForm.title}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-black text-green-800">
                          Source / Channel
                        </p>
                        <p className="break-words text-sm font-bold leading-6 text-gray-900">
                          {videoForm.source}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-black text-green-800">
                          Description
                        </p>
                        <p className="break-words text-sm font-bold leading-6 text-gray-900">
                          {videoForm.description}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs font-black text-green-800">
                          Tags
                        </p>
                        <p className="break-words text-sm font-bold leading-6 text-gray-900">
                          {videoForm.tags}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
                  <button
                    onClick={saveVideo}
                    disabled={isSaving || isSyncingVideo}
                    className="rounded-2xl bg-red-800 px-4 py-4 text-sm font-black text-white hover:bg-red-900 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving
                      ? "Saving..."
                      : editingVideoId
                        ? "Update Video"
                        : "Publish YouTube Video"}
                  </button>

                  <button
                    onClick={clearVideoForm}
                    disabled={isSaving || isSyncingVideo}
                    className="rounded-2xl border border-red-200 bg-white px-4 py-4 text-sm font-black text-red-800"
                  >
                    Clear / Cancel
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="min-w-0 space-y-5">
            <div className="min-w-0 rounded-[1.5rem] bg-white p-4 shadow-md sm:rounded-[2rem] sm:p-5">
              <h2 className="mb-4 break-words text-2xl font-black text-red-900">
                ✅ Live Preview
              </h2>

              <div className="min-w-0 overflow-hidden rounded-3xl border border-gray-100 bg-gray-50">
                {activeTab === "video" && youtubeThumbnail && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={youtubeThumbnail}
                    alt={videoForm.title || "YouTube thumbnail"}
                    className="aspect-video w-full object-cover"
                  />
                )}

                <div className="p-4">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-black text-red-800">
                      {activeTab === "news"
                        ? newsForm.category
                        : videoForm.category}
                    </span>

                    <span className="rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-black text-yellow-800">
                      {activeTab === "news"
                        ? newsForm.priority
                        : videoForm.priority}
                    </span>

                    {activeTab === "news" && newsForm.isBreaking && (
                      <span className="rounded-full bg-red-800 px-3 py-1 text-[10px] font-black text-white">
                        BREAKING
                      </span>
                    )}

                    {activeTab === "video" && videoForm.isFeatured && (
                      <span className="rounded-full bg-red-800 px-3 py-1 text-[10px] font-black text-white">
                        FEATURED
                      </span>
                    )}
                  </div>

                  <h3 className="mb-2 break-words text-xl font-black leading-snug text-gray-950">
                    {activePreviewTitle}
                  </h3>

                  <p className="mb-4 whitespace-pre-wrap break-words text-sm font-semibold leading-6 text-gray-600">
                    {activePreviewDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 text-xs font-black text-orange-700">
                    {activeTab === "news" ? (
                      <>
                        <span className="break-words">
                          📍 {newsForm.district}
                        </span>
                        <span className="break-words">
                          🗓️ {newsForm.date}
                        </span>
                        <span className="break-words">
                          📰 {newsForm.source}
                        </span>
                      </>
                    ) : (
                      <>
                        <span className="break-words">▶️ YouTube Video</span>
                        <span className="break-words">
                          🗓️ {videoForm.date}
                        </span>
                        <span className="break-words">
                          📰 {videoForm.source}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="min-w-0 rounded-[1.5rem] bg-white p-4 shadow-md sm:rounded-[2rem] sm:p-5">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="break-words text-2xl font-black text-red-900">
                    Recent Material
                  </h2>
                  <p className="mt-1 text-xs font-bold text-gray-500">
                    Recent upload/edit/publish/unpublish हमेशा top पर रहेगा।
                  </p>
                </div>

                <button
                  onClick={loadRecentItems}
                  disabled={isLoadingItems}
                  className="rounded-2xl bg-gray-900 px-4 py-2 text-xs font-black text-white disabled:opacity-60"
                >
                  {isLoadingItems ? "Loading..." : "Refresh"}
                </button>
              </div>

              <div className="max-h-[760px] space-y-3 overflow-y-auto pr-1">
                {recentItems.length > 0 ? (
                  recentItems.map((item) => (
                    <div
                      key={`${item.type}-${item.id}`}
                      className="rounded-3xl border border-gray-100 bg-gray-50 p-4"
                    >
                      <div className="mb-2 flex flex-wrap gap-2">
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-black text-white ${
                            item.type === "news"
                              ? "bg-red-800"
                              : "bg-orange-700"
                          }`}
                        >
                          {item.type === "news" ? "NEWS" : "VIDEO"}
                        </span>

                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-black ${
                            item.isLive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {item.isLive ? "LIVE" : "UNPUBLISHED"}
                        </span>

                        <span className="rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-black text-yellow-800">
                          {item.lastAction}
                        </span>
                      </div>

                      <h3 className="break-words text-sm font-black leading-6 text-gray-950">
                        {item.title}
                      </h3>

                      <p className="mt-1 line-clamp-2 break-words text-xs font-semibold leading-5 text-gray-600">
                        {item.description}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold text-gray-500">
                        <span>{item.category}</span>
                        <span>•</span>
                        <span>{item.date}</span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => editItem(item)}
                          className="rounded-2xl bg-blue-700 px-3 py-2 text-xs font-black text-white"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => toggleLiveStatus(item)}
                          className={`rounded-2xl px-3 py-2 text-xs font-black text-white ${
                            item.isLive ? "bg-gray-800" : "bg-green-700"
                          }`}
                        >
                          {item.isLive ? "Unpublish" : "Publish"}
                        </button>

                        <Link
                          href={
                            item.type === "news"
                              ? `/news/${item.slug}`
                              : `/videos?watch=${item.slug}`
                          }
                          className="rounded-2xl border border-red-200 bg-white px-3 py-2 text-center text-xs font-black text-red-800"
                        >
                          Open
                        </Link>

                        <button
                          onClick={() => removeItem(item)}
                          className="rounded-2xl bg-red-800 px-3 py-2 text-xs font-black text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-3xl bg-gray-50 p-6 text-center">
                    <p className="text-sm font-black text-gray-600">
                      अभी कोई recent material नहीं है।
                    </p>
                    <p className="mt-1 text-xs font-bold text-gray-500">
                      News या YouTube video publish करने के बाद यहाँ दिखेगा।
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}