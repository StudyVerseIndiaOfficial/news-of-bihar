import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore/lite";
import { db } from "@/lib/firebase";
import type { NewsItem, NewsPriority } from "@/data/newsData";

const NEWS_COLLECTION = "newsItems";

export type LiveNewsItem = NewsItem & {
  id?: string;
  isLive?: boolean;
  lastAction?: string;
  createdAtMillis?: number;
  updatedAtMillis?: number;
};

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
    return value.map((tag) => String(tag)).filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((tag) => tag.trim())
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

function cleanNewsItem(id: string, data: Record<string, any>): LiveNewsItem {
  const createdAtMillis = getMillis(data.createdAt);
  const updatedAtMillis = getMillis(data.updatedAt) || createdAtMillis;

  return {
    id,
    slug: safeString(data.slug, id),
    category: safeString(data.category, "Breaking"),
    title: safeString(data.title, "Untitled News"),
    description: safeString(data.description, ""),
    district: safeString(data.district, "All Bihar"),
    date: safeString(data.date, ""),
    source: safeString(data.source, "News of Bihar Desk"),
    content: safeString(data.content, ""),

    imageTitle: safeString(data.imageTitle, data.title || ""),
    imageUrl: safeString(data.imageUrl, ""),
    officialLink: safeString(data.officialLink, ""),
    sourceLink: safeString(data.sourceLink, ""),
    priority: safePriority(data.priority),
    isBreaking: Boolean(data.isBreaking),
    tags: safeTags(data.tags),

    isLive: data.isLive !== false,
    lastAction: safeString(
      data.lastAction,
      data.isLive === false ? "Unpublished" : "Published"
    ),
    createdAtMillis,
    updatedAtMillis,
  };
}

function sortRecentFirst(a: LiveNewsItem, b: LiveNewsItem) {
  const updatedDiff = (b.updatedAtMillis || 0) - (a.updatedAtMillis || 0);

  if (updatedDiff !== 0) return updatedDiff;

  const breakingDiff = Number(b.isBreaking) - Number(a.isBreaking);

  if (breakingDiff !== 0) return breakingDiff;

  const priorityRank: Record<string, number> = {
    High: 3,
    Medium: 2,
    Normal: 1,
  };

  const priorityDiff =
    (priorityRank[b.priority || "Normal"] || 1) -
    (priorityRank[a.priority || "Normal"] || 1);

  if (priorityDiff !== 0) return priorityDiff;

  return (b.createdAtMillis || 0) - (a.createdAtMillis || 0);
}

export async function getNewsItems(): Promise<LiveNewsItem[]> {
  try {
    const snapshot = await getDocs(collection(db, NEWS_COLLECTION));

    const items = snapshot.docs
      .map((doc) => cleanNewsItem(doc.id, doc.data()))
      .filter((item) => item.isLive !== false)
      .sort(sortRecentFirst);

    return items;
  } catch (error) {
    console.error("Firebase news fetch error:", error);
    return [];
  }
}

export async function getNewsItemBySlug(
  slug: string
): Promise<LiveNewsItem | null> {
  try {
    const newsQuery = query(
      collection(db, NEWS_COLLECTION),
      where("slug", "==", slug)
    );

    const snapshot = await getDocs(newsQuery);

    if (snapshot.empty) return null;

    const firstDoc = snapshot.docs[0];

    const news = cleanNewsItem(firstDoc.id, firstDoc.data());

    if (news.isLive === false) return null;

    return news;
  } catch (error) {
    console.error("Firebase single news fetch error:", error);
    return null;
  }
}

export async function createNewsItem(news: NewsItem) {
  const payload = {
    ...news,
    isLive: true,
    lastAction: "Published",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };

  return addDoc(collection(db, NEWS_COLLECTION), payload);
}