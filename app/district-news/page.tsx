import NewsExplorer from "@/components/NewsExplorer";
import { getNewsItems } from "@/lib/newsService";

export const dynamic = "force-dynamic";

export default async function DistrictNewsPage() {
  const liveNews = await getNewsItems();

  return (
    <NewsExplorer
      news={liveNews}
      title="District News"
      subtitle="बिहार के सभी जिलों की ताजा खबरें, स्थानीय अपडेट, प्रशासनिक सूचना और जनता से जुड़ी जरूरी जानकारी यहाँ आसानी से खोजें।"
      badgeText="All Bihar District Updates"
    />
  );
}