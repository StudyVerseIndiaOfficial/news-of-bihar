import NewsExplorer from "@/components/NewsExplorer";
import { getNewsItems } from "@/lib/newsService";

export const dynamic = "force-dynamic";

export default async function DistrictNewsPage() {
  const liveNews = await getNewsItems();

  const districtNews = liveNews.filter(
    (item) => item.category === "District News"
  );

  return (
    <NewsExplorer
      news={districtNews}
      title="District Wise News"
      subtitle="बिहार के हर जिले की आवाज — हर गाँव, हर शहर और हर नागरिक की खबर।"
      lockedCategory="District News"
      badgeText="District Updates"
    />
  );
}