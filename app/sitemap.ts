import type { MetadataRoute } from "next";
import { allNews } from "@/data/newsData";
import { youtubeVideos } from "@/data/youtubeVideos";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/latest-news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/district-news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/education`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/government-jobs`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/sarkari-yojana`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/videos`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/search`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const newsRoutes: MetadataRoute.Sitemap = allNews.map((news) => ({
    url: `${SITE_URL}/news/${news.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority:
      news.priority === "High" || news.isBreaking
        ? 0.9
        : news.priority === "Medium"
        ? 0.75
        : 0.65,
  }));

  const videoRoutes: MetadataRoute.Sitemap = youtubeVideos.map((video) => ({
    url: `${SITE_URL}/videos?watch=${video.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: video.isFeatured ? 0.8 : 0.65,
  }));

  return [...staticRoutes, ...newsRoutes, ...videoRoutes];
}