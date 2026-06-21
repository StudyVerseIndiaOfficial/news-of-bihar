import NewsExplorer from "@/components/NewsExplorer";
import { getNewsItems } from "@/lib/newsService";

export const dynamic = "force-dynamic";

export default async function EducationPage() {
  const liveNews = await getNewsItems();

  const educationNews = liveNews.filter(
    (item) => item.category === "Education"
  );

  return (
    <NewsExplorer
      news={educationNews}
      title="Education News"
      subtitle="बिहार के छात्रों के लिए परीक्षा, रिजल्ट, एडमिट कार्ड और जरूरी शैक्षणिक अपडेट।"
      lockedCategory="Education"
      badgeText="Student Updates"
    />
  );
}