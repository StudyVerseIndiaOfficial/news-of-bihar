import NewsExplorer from "@/components/NewsExplorer";
import { getNewsItems } from "@/lib/newsService";

export const dynamic = "force-dynamic";

export default async function LatestNewsPage() {
  const liveNews = await getNewsItems();

  return (
    <NewsExplorer
      news={liveNews}
      title="Latest Bihar News"
      subtitle="बिहार की ताजा और जरूरी खबरें — साफ भाषा में, बिना अफवाह के।"
      badgeText="Latest Updates"
    />
  );
}