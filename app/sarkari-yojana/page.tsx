import NewsExplorer from "@/components/NewsExplorer";
import { getNewsItems } from "@/lib/newsService";

export const dynamic = "force-dynamic";

export default async function SarkariYojanaPage() {
  const liveNews = await getNewsItems();

  const yojanaNews = liveNews.filter(
    (item) => item.category === "Sarkari Yojana"
  );

  return (
    <NewsExplorer
      news={yojanaNews}
      title="Sarkari Yojana"
      subtitle="बिहार की सरकारी योजनाओं की जानकारी — कौन पात्र है, कैसे आवेदन करें और क्या जरूरी है।"
      lockedCategory="Sarkari Yojana"
      badgeText="Yojana Updates"
    />
  );
}