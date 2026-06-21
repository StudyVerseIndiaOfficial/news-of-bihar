import NewsExplorer from "@/components/NewsExplorer";
import { getNewsItems } from "@/lib/newsService";

export const dynamic = "force-dynamic";

export default async function GovernmentJobsPage() {
  const liveNews = await getNewsItems();

  const jobNews = liveNews.filter(
    (item) => item.category === "Government Jobs"
  );

  return (
    <NewsExplorer
      news={jobNews}
      title="Government Jobs"
      subtitle="BPSC, BSSC, Bihar Police, Railway, Teacher Vacancy और सरकारी नौकरी से जुड़ी जरूरी जानकारी।"
      lockedCategory="Government Jobs"
      badgeText="Job Updates"
    />
  );
}