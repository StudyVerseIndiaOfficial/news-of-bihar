import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "@/lib/firebase";
import type { YouTubeVideoItem, VideoPriority } from "@/data/youtubeVideos";

const VIDEO_COLLECTION = "videoItems";

export type LiveYouTubeVideoItem = YouTubeVideoItem & {
  id?: string;
  isLive?: boolean;
  createdAtMillis?: number;
  updatedAtMillis?: number;
};

function safeString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function safePriority(value: unknown): VideoPriority {
  if (value === "High" || value === "Medium" || value === "Normal") {
    return value;
  }

  return "Normal";
}

function safeTags(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function getMillis(value: any) {
  if (!value) return 0;

  if (typeof value === "number") return value;

  if (typeof value?.toMillis === "function") {
    return value.toMillis();
  }

  if (typeof value?.seconds === "number") {
    return value.seconds * 1000;
  }

  const parsed = Date.parse(String(value));
  return Number.isNaN(parsed) ? 0 : parsed;
}

function cleanVideoItem(
  id: string,
  data: Record<string, any>
): LiveYouTubeVideoItem {
  return {
    id,
    slug: safeString(data.slug, id),
    title: safeString(data.title, "Untitled Video"),
    description: safeString(data.description, ""),
    youtubeUrl: safeString(data.youtubeUrl, ""),
    category: safeString(data.category, "Video News"),
    date: safeString(data.date, ""),
    source: safeString(data.source, "News of Bihar YouTube"),
    priority: safePriority(data.priority),
    isFeatured: Boolean(data.isFeatured),
    tags: safeTags(data.tags),
    isLive: data.isLive !== false,
    createdAtMillis: getMillis(data.createdAt),
    updatedAtMillis: getMillis(data.updatedAt) || getMillis(data.createdAt),
  };
}

export async function getVideoItems(): Promise<LiveYouTubeVideoItem[]> {
  try {
    const snapshot = await getDocs(collection(db, VIDEO_COLLECTION));

    const items = snapshot.docs
      .map((doc) => cleanVideoItem(doc.id, doc.data()))
      .filter((item) => item.isLive !== false)
      .filter((item) => item.youtubeUrl.trim() !== "")
      .sort((a, b) => {
        const updatedDiff =
          (b.updatedAtMillis || 0) - (a.updatedAtMillis || 0);

        if (updatedDiff !== 0) return updatedDiff;

        const featuredDiff = Number(b.isFeatured) - Number(a.isFeatured);

        if (featuredDiff !== 0) return featuredDiff;

        const priorityRank: Record<string, number> = {
          High: 3,
          Medium: 2,
          Normal: 1,
        };

        return (
          (priorityRank[b.priority || "Normal"] || 1) -
          (priorityRank[a.priority || "Normal"] || 1)
        );
      });

    return items;
  } catch (error) {
    console.error("Firebase video fetch error:", error);
    return [];
  }
}