import Link from "next/link";
import NewsCard from "@/components/NewsCard";
import type { NewsItem } from "@/data/newsData";
import { getNewsItems } from "@/lib/newsService";

export const dynamic = "force-dynamic";

const categoryLinks = [
  {
    name: "Latest News",
    href: "/latest-news",
    icon: "⚡",
    line: "ताजा खबरें",
  },
  {
    name: "District News",
    href: "/district-news",
    icon: "📍",
    line: "हर जिले की आवाज",
  },
  {
    name: "Education",
    href: "/education",
    icon: "📚",
    line: "छात्रों के लिए अपडेट",
  },
  {
    name: "Government Jobs",
    href: "/government-jobs",
    icon: "🎓",
    line: "नौकरी की खबर",
  },
  {
    name: "Sarkari Yojana",
    href: "/sarkari-yojana",
    icon: "🏛️",
    line: "योजना की जानकारी",
  },
  {
    name: "Contact",
    href: "/contact",
    icon: "☎️",
    line: "सुधार / सूचना भेजें",
  },
];

const districts = [
  "Patna",
  "Gaya",
  "Muzaffarpur",
  "Bhagalpur",
  "Darbhanga",
  "Purnea",
  "Nalanda",
  "Begusarai",
  "Madhubani",
  "Saran",
  "Siwan",
  "Rohtas",
];

function SectionTitle({
  title,
  subtitle,
  href,
}: {
  title: string;
  subtitle: string;
  href?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-2xl font-black text-gray-950">{title}</h2>
        <p className="mt-1 text-sm font-semibold text-gray-600">{subtitle}</p>
      </div>

      {href && (
        <Link
          href={href}
          className="shrink-0 rounded-full border border-red-200 bg-white px-3 py-2 text-xs font-black text-red-800 shadow-sm hover:bg-red-50"
        >
          View All
        </Link>
      )}
    </div>
  );
}

function MiniNewsList({
  title,
  items,
  href,
}: {
  title: string;
  items: NewsItem[];
  href: string;
}) {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-4 shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-lg font-black text-red-900">{title}</h3>
        <Link href={href} className="text-xs font-black text-orange-700">
          More
        </Link>
      </div>

      <div className="space-y-3">
        {items.length > 0 ? (
          items.map((news) => (
            <Link
              key={news.slug}
              href={`/news/${news.slug}`}
              className="block rounded-2xl border border-gray-100 bg-gray-50 p-3 hover:bg-red-50"
            >
              <span className="mb-1 inline-block rounded-full bg-red-100 px-2 py-1 text-[10px] font-black text-red-800">
                {news.category}
              </span>

              <h4 className="text-sm font-black leading-6 text-gray-900">
                {news.title}
              </h4>

              <div className="mt-2 flex flex-wrap gap-2 text-[11px] font-bold text-gray-500">
                <span>📍 {news.district}</span>
                <span>🗓️ {news.date}</span>
              </div>
            </Link>
          ))
        ) : (
          <p className="rounded-2xl bg-gray-50 p-4 text-sm font-bold text-gray-500">
            अभी इस section में admin से live news add नहीं की गई है।
          </p>
        )}
      </div>
    </div>
  );
}

export default async function Home() {
  const newsList: NewsItem[] = await getNewsItems();

  const featuredNews = newsList[0];
  const latestNews = newsList.slice(0, 6);

  const educationNews = newsList
    .filter((news) => news.category === "Education")
    .slice(0, 3);

  const jobNews = newsList
    .filter((news) => news.category === "Government Jobs")
    .slice(0, 3);

  const yojanaNews = newsList
    .filter((news) => news.category === "Sarkari Yojana")
    .slice(0, 3);

  const districtNews = newsList
    .filter((news) => news.category === "District News")
    .slice(0, 3);

  return (
    <div className="bg-gray-50">
      {/* Breaking Ticker */}
      <section className="border-b border-red-100 bg-white px-4 py-3">
        <div className="mx-auto flex max-w-6xl items-center gap-3 overflow-hidden">
          <div className="shrink-0 rounded-full bg-red-800 px-3 py-2 text-xs font-black text-white">
            BREAKING
          </div>

          <div className="flex gap-3 overflow-x-auto whitespace-nowrap text-sm font-bold text-gray-800">
            {newsList.length > 0 ? (
              newsList.slice(0, 5).map((news) => (
                <Link
                  key={news.slug}
                  href={`/news/${news.slug}`}
                  className="rounded-full bg-red-50 px-3 py-2 text-red-900"
                >
                  {news.title}
                </Link>
              ))
            ) : (
              <span className="rounded-full bg-gray-50 px-3 py-2 text-gray-600">
                अभी admin से कोई live news publish नहीं की गई है।
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-red-800 to-orange-600 px-4 py-10 text-white">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-yellow-300/20 blur-3xl" />

        <div className="relative mx-auto grid max-w-6xl gap-6 md:grid-cols-2 md:items-center">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-black text-yellow-100">
              बिहार की सच्ची और जरूरी खबरें
            </div>

            <h1 className="mb-4 text-4xl font-black leading-tight md:text-6xl">
              बिहार की हर जरूरी खबर अब आपके हाथों में
            </h1>

            <p className="mb-6 max-w-xl text-base font-semibold leading-8 text-red-50 md:text-lg">
              News of Bihar पर आपको मिलेगी साफ, सरल और जिम्मेदार भाषा में
              बिहार की खबरें — शिक्षा, नौकरी, योजना, जिला अपडेट और जनता से
              जुड़ी हर महत्वपूर्ण जानकारी।
            </p>

            <div className="mb-6 rounded-3xl border border-white/20 bg-white/10 p-4 backdrop-blur">
              <p className="text-lg font-black text-white">
                हम खबर को तेज़ बनाने से पहले सही बनाने की कोशिश करते हैं।
              </p>
              <p className="mt-1 text-sm font-semibold text-red-50">
                अफवाह से दूर, सच्चाई के करीब।
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/latest-news"
                className="rounded-2xl bg-white px-5 py-3 text-sm font-black text-red-900 shadow-lg"
              >
                आज की बड़ी खबर देखें
              </Link>

              <Link
                href="/district-news"
                className="rounded-2xl border border-white/40 bg-white/10 px-5 py-3 text-sm font-black text-white"
              >
                अपने जिले की खबर
              </Link>
            </div>
          </div>

          {/* Featured News */}
          {featuredNews ? (
            <Link
              href={`/news/${featuredNews.slug}`}
              className="rounded-[2rem] border border-white/20 bg-white p-5 text-gray-900 shadow-2xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-800">
                  Featured News
                </span>
                <span className="text-xs font-bold text-gray-500">
                  {featuredNews.date}
                </span>
              </div>

              <h2 className="mb-3 text-2xl font-black leading-snug text-gray-950">
                {featuredNews.title}
              </h2>

              <p className="mb-4 text-sm font-semibold leading-7 text-gray-600">
                {featuredNews.description}
              </p>

              <div className="mb-4 rounded-2xl bg-red-50 p-4">
                <p className="text-sm font-bold leading-6 text-red-900">
                  📍 जिला: {featuredNews.district}
                </p>
                <p className="mt-1 text-sm font-bold leading-6 text-red-900">
                  📰 Source: {featuredNews.source}
                </p>
              </div>

              <div className="inline-flex rounded-2xl bg-red-800 px-4 py-3 text-sm font-black text-white">
                पूरी खबर पढ़ें
              </div>
            </Link>
          ) : (
            <div className="rounded-[2rem] border border-white/20 bg-white p-5 text-gray-900 shadow-2xl">
              <div className="mb-3 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-800">
                No Live News
              </div>

              <h2 className="mb-3 text-2xl font-black leading-snug text-gray-950">
                अभी कोई live news publish नहीं है
              </h2>

              <p className="mb-4 text-sm font-semibold leading-7 text-gray-600">
                Admin dashboard से news publish करते ही यहाँ latest featured news
                दिखाई देगी।
              </p>

              <Link
                href="/admin"
                className="inline-flex rounded-2xl bg-red-800 px-4 py-3 text-sm font-black text-white"
              >
                Admin Dashboard
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Category Cards */}
      <section className="px-4 py-6">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            title="News Categories"
            subtitle="अपनी जरूरत के हिसाब से खबर चुनें"
          />

          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
            {categoryLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-3xl border border-red-100 bg-white p-4 text-center shadow-md hover:bg-red-50"
              >
                <div className="mb-2 text-3xl">{item.icon}</div>
                <h3 className="text-sm font-black text-red-900">
                  {item.name}
                </h3>
                <p className="mt-1 text-xs font-bold leading-5 text-gray-500">
                  {item.line}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="px-4 pb-6">
        <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-3">
          <div className="rounded-3xl border border-orange-100 bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-red-900">साफ</p>
            <p className="mt-1 text-sm font-bold text-gray-600">
              सरल भाषा में खबर
            </p>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-red-900">सही</p>
            <p className="mt-1 text-sm font-bold text-gray-600">
              जिम्मेदार जानकारी
            </p>
          </div>

          <div className="rounded-3xl border border-orange-100 bg-white p-5 text-center shadow-sm">
            <p className="text-3xl font-black text-red-900">समय पर</p>
            <p className="mt-1 text-sm font-bold text-gray-600">
              जरूरी अपडेट
            </p>
          </div>
        </div>
      </section>

      {/* Latest News */}
      <section className="px-4 pb-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            title="Latest Bihar News"
            subtitle="बिहार की ताजा और जरूरी खबरें"
            href="/latest-news"
          />

          {latestNews.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {latestNews.map((news) => (
                <NewsCard key={news.slug} {...news} />
              ))}
            </div>
          ) : (
            <div className="rounded-3xl bg-white p-6 text-center text-sm font-bold text-gray-500 shadow-md">
              अभी admin से कोई live news publish नहीं की गई है।
            </div>
          )}
        </div>
      </section>

      {/* District Section */}
      <section className="bg-white px-4 py-8">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            title="District Wise News"
            subtitle="हर जिले की आवाज, हर नागरिक की खबर"
            href="/district-news"
          />

          <div className="mb-6 grid grid-cols-3 gap-2 md:grid-cols-6">
            {districts.map((district) => (
              <Link
                key={district}
                href={`/district-news?district=${district}`}
                className="rounded-2xl border border-red-100 bg-red-50 px-3 py-3 text-center text-xs font-black text-red-900 hover:bg-red-100"
              >
                {district}
              </Link>
            ))}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <MiniNewsList
              title="District Updates"
              items={districtNews}
              href="/district-news"
            />

            <MiniNewsList
              title="Education Updates"
              items={educationNews}
              href="/education"
            />

            <MiniNewsList
              title="Job Updates"
              items={jobNews}
              href="/government-jobs"
            />
          </div>
        </div>
      </section>

      {/* Jobs + Yojana Highlight */}
      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
          <div className="rounded-[2rem] bg-gradient-to-br from-red-900 to-red-700 p-5 text-white shadow-xl">
            <div className="mb-3 text-4xl">🎓</div>
            <h2 className="text-3xl font-black">Government Jobs</h2>
            <p className="mt-2 text-sm font-semibold leading-7 text-red-50">
              BPSC, BSSC, Bihar Police, Railway, Teacher Vacancy और सरकारी
              नौकरी से जुड़ी जरूरी जानकारी।
            </p>

            <div className="mt-5 grid gap-3">
              {jobNews.length > 0 ? (
                jobNews.map((news) => (
                  <Link
                    key={news.slug}
                    href={`/news/${news.slug}`}
                    className="rounded-2xl bg-white/10 p-3 text-sm font-black leading-6 text-white hover:bg-white/20"
                  >
                    {news.title}
                  </Link>
                ))
              ) : (
                <p className="rounded-2xl bg-white/10 p-3 text-sm font-bold">
                  अभी admin से कोई live job update add नहीं है।
                </p>
              )}
            </div>

            <Link
              href="/government-jobs"
              className="mt-5 inline-block rounded-2xl bg-white px-4 py-3 text-sm font-black text-red-900"
            >
              सभी नौकरी अपडेट देखें
            </Link>
          </div>

          <div className="rounded-[2rem] bg-gradient-to-br from-orange-600 to-yellow-500 p-5 text-white shadow-xl">
            <div className="mb-3 text-4xl">🏛️</div>
            <h2 className="text-3xl font-black">Sarkari Yojana</h2>
            <p className="mt-2 text-sm font-semibold leading-7 text-orange-50">
              बिहार की सरकारी योजनाओं की जानकारी — कौन पात्र है, कैसे आवेदन
              करें और क्या जरूरी है।
            </p>

            <div className="mt-5 grid gap-3">
              {yojanaNews.length > 0 ? (
                yojanaNews.map((news) => (
                  <Link
                    key={news.slug}
                    href={`/news/${news.slug}`}
                    className="rounded-2xl bg-white/15 p-3 text-sm font-black leading-6 text-white hover:bg-white/25"
                  >
                    {news.title}
                  </Link>
                ))
              ) : (
                <p className="rounded-2xl bg-white/15 p-3 text-sm font-bold">
                  अभी admin से कोई live योजना update add नहीं है।
                </p>
              )}
            </div>

            <Link
              href="/sarkari-yojana"
              className="mt-5 inline-block rounded-2xl bg-white px-4 py-3 text-sm font-black text-orange-700"
            >
              सभी योजना अपडेट देखें
            </Link>
          </div>
        </div>
      </section>

      {/* Official Links / Disclaimer CTA */}
      <section className="px-4 pb-10">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
          <div className="grid gap-4 md:grid-cols-[1.5fr_1fr] md:items-center">
            <div>
              <h2 className="text-2xl font-black text-yellow-950">
                जरूरी सूचना
              </h2>
              <p className="mt-2 text-sm font-bold leading-7 text-yellow-900">
                सरकारी नौकरी, परीक्षा, योजना, admit card, result या official
                notice से जुड़ी जानकारी को अंतिम मानने से पहले संबंधित official
                website से जरूर मिलान करें। News of Bihar किसी सरकारी संस्था से
                संबंधित नहीं है।
              </p>
            </div>

            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/disclaimer"
                className="rounded-2xl bg-yellow-900 px-4 py-3 text-sm font-black text-white"
              >
                Disclaimer पढ़ें
              </Link>

              <Link
                href="/contact"
                className="rounded-2xl border border-yellow-700 bg-white px-4 py-3 text-sm font-black text-yellow-900"
              >
                Correction भेजें
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}