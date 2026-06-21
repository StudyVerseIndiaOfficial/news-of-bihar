import NewsExplorer from "@/components/NewsExplorer";
import { allNews } from "@/data/newsData";

export default function SearchPage() {
  return (
    <NewsExplorer
      news={allNews}
      title="Search Bihar News"
      subtitle="बिहार की खबर, जिला अपडेट, शिक्षा, नौकरी और योजना से जुड़ी जानकारी एक जगह search करें।"
      badgeText="Search News"
    />
  );
}