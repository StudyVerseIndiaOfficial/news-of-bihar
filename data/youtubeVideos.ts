export type VideoPriority = "High" | "Medium" | "Normal";

export type YouTubeVideoItem = {
  slug: string;
  title: string;
  description: string;
  youtubeUrl: string;
  category: string;
  date: string;
  source: string;
  priority?: VideoPriority;
  isFeatured?: boolean;
  tags?: string[];
};

export const youtubeVideos: YouTubeVideoItem[] = [
  {
    slug: "bihar-latest-news-video",
    title: "बिहार की ताजा खबर | News of Bihar",
    description:
      "बिहार की जरूरी खबरों को सरल और साफ भाषा में समझने के लिए यह वीडियो देखें।",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Latest News",
    date: "20 June 2026",
    source: "News of Bihar YouTube",
    priority: "High",
    isFeatured: true,
    tags: ["Bihar News", "Latest News", "News of Bihar"],
  },
  {
    slug: "bihar-education-update-video",
    title: "छात्रों के लिए जरूरी अपडेट | Bihar Education News",
    description:
      "बिहार के छात्रों के लिए परीक्षा, रिजल्ट और शिक्षा से जुड़ी जरूरी जानकारी।",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Education",
    date: "20 June 2026",
    source: "News of Bihar YouTube",
    priority: "High",
    isFeatured: false,
    tags: ["Education", "Bihar Board", "Exam Update"],
  },
  {
    slug: "bihar-government-job-video",
    title: "सरकारी नौकरी अपडेट | Bihar Government Jobs",
    description:
      "BPSC, BSSC, Bihar Police और Teacher Vacancy से जुड़ी जरूरी जानकारी।",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "Government Jobs",
    date: "20 June 2026",
    source: "News of Bihar YouTube",
    priority: "High",
    isFeatured: false,
    tags: ["Government Jobs", "BPSC", "BSSC"],
  },
]