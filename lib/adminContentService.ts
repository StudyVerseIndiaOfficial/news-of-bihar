import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore/lite";
import { db } from "@/lib/firebase";
import type { NewsItem, NewsPriority } from "@/data/newsData";

const NEWS_COLLECTION = "newsItems";
const VIDEO_COLLECTION = "videoItems";

export type AdminMaterialType = "news" | "video";

export type VideoContentInput = {
  slug: string;
  category: string;
  title: string;
  description: string;
  date: string;
  source: string;
  youtubeUrl: string;
  priority?: NewsPriority;
  isFeatured?: boolean;
  tags?: string[];
};

export type AdminContentItem = {
  id: string;
  type: AdminMaterialType;
  slug: string;
  category: string;
  title: string;
  description: string;
  district?: string;
  date: string;
  source: string;
  content?: string;
  imageTitle?: string;
  imageUrl?: string;
  officialLink?: string;
  sourceLink?: string;
  youtubeUrl?: string;
  priority: NewsPriority;
  isLive: boolean;
  lastAction: string;
  isBreaking?: boolean;
  isFeatured?: boolean;
  tags?: string[];
  createdAtMillis: number;
  updatedAtMillis: number;
};

function getCollectionName(type: AdminMaterialType) {
  return type === "news" ? NEWS_COLLECTION : VIDEO_COLLECTION;
}

function safeString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function safePriority(value: unknown): NewsPriority {
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

function cleanAdminItem(
  type: AdminMaterialType,
  id: string,
  data: Record<string, any>
): AdminContentItem {
  return {
    id,
    type,
    slug: safeString(data.slug, id),
    category: safeString(data.category, type === "news" ? "Breaking" : "Video News"),
    title: safeString(data.title, "Untitled"),
    description: safeString(data.description, ""),
    district: safeString(data.district, ""),
    date: safeString(data.date, ""),
    source: safeString(data.source, "News of Bihar Desk"),
    content: safeString(data.content, ""),
    imageTitle: safeString(data.imageTitle, ""),
    imageUrl: safeString(data.imageUrl, ""),
    officialLink: safeString(data.officialLink, ""),
    sourceLink: safeString(data.sourceLink, ""),
    youtubeUrl: safeString(data.youtubeUrl, ""),
    priority: safePriority(data.priority),
    isLive: data.isLive !== false,
    lastAction: safeString(
      data.lastAction,
      data.isLive === false ? "Unpublished" : "Published"
    ),
    isBreaking: Boolean(data.isBreaking),
    isFeatured: Boolean(data.isFeatured),
    tags: safeTags(data.tags),
    createdAtMillis: getMillis(data.createdAt),
    updatedAtMillis: getMillis(data.updatedAt) || getMillis(data.createdAt),
  };
}

export async function getRecentAdminItems(): Promise<AdminContentItem[]> {
  try {
    const [newsSnapshot, videoSnapshot] = await Promise.all([
      getDocs(collection(db, NEWS_COLLECTION)),
      getDocs(collection(db, VIDEO_COLLECTION)),
    ]);

    const newsItems = newsSnapshot.docs.map((item) =>
      cleanAdminItem("news", item.id, item.data())
    );

    const videoItems = videoSnapshot.docs.map((item) =>
      cleanAdminItem("video", item.id, item.data())
    );

    return [...newsItems, ...videoItems].sort((a, b) => {
      const updatedDiff = b.updatedAtMillis - a.updatedAtMillis;

      if (updatedDiff !== 0) return updatedDiff;

      return b.createdAtMillis - a.createdAtMillis;
    });
  } catch (error) {
    console.error("Recent admin items fetch error:", error);
    return [];
  }
}

export async function findContentBySlug(
  type: AdminMaterialType,
  slug: string
): Promise<AdminContentItem | null> {
  try {
    const collectionName = getCollectionName(type);

    const slugQuery = query(
      collection(db, collectionName),
      where("slug", "==", slug),
      limit(1)
    );

    const snapshot = await getDocs(slugQuery);

    if (snapshot.empty) return null;

    const firstDoc = snapshot.docs[0];

    return cleanAdminItem(type, firstDoc.id, firstDoc.data());
  } catch (error) {
    console.error("Find content by slug error:", error);
    return null;
  }
}

export async function createNewsContent(news: NewsItem) {
  return addDoc(collection(db, NEWS_COLLECTION), {
    ...news,
    isLive: true,
    lastAction: "Published",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateNewsContent(id: string, news: NewsItem) {
  return updateDoc(doc(db, NEWS_COLLECTION, id), {
    ...news,
    lastAction: "Edited",
    updatedAt: serverTimestamp(),
  });
}

export async function createVideoContent(video: VideoContentInput) {
  return addDoc(collection(db, VIDEO_COLLECTION), {
    ...video,
    isLive: true,
    lastAction: "Published",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
}

export async function updateVideoContent(id: string, video: VideoContentInput) {
  return updateDoc(doc(db, VIDEO_COLLECTION, id), {
    ...video,
    lastAction: "Edited",
    updatedAt: serverTimestamp(),
  });
}

export async function setContentLiveStatus(
  type: AdminMaterialType,
  id: string,
  isLive: boolean
) {
  const collectionName = getCollectionName(type);

  return updateDoc(doc(db, collectionName, id), {
    isLive,
    lastAction: isLive ? "Published" : "Unpublished",
    updatedAt: serverTimestamp(),
  });
}

export async function deleteContentItem(type: AdminMaterialType, id: string) {
  const collectionName = getCollectionName(type);

  return deleteDoc(doc(db, collectionName, id));
}