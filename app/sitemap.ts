import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { getNewsItems } from "@/lib/newsService";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_URL.replace(/\/$/, "");

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/latest-news`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/district-news`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/education`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/government-jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/sarkari-yojana`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  const liveNews = await getNewsItems();

  const newsRoutes: MetadataRoute.Sitemap = liveNews.map((news) => ({
    url: `${baseUrl}/news/${news.slug}`,
    lastModified: news.updatedAtMillis
      ? new Date(news.updatedAtMillis)
      : new Date(),
    changeFrequency: "daily",
    priority: news.isBreaking ? 0.9 : 0.75,
  }));

  return [...staticRoutes, ...newsRoutes];
}