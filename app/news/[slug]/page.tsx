import Link from "next/link";
import { getNewsItems } from "@/lib/newsService";
import NewsCard from "@/components/NewsCard";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function normalizeSlug(value: string) {
  try {
    return decodeURIComponent(value).trim();
  } catch {
    return value.trim();
  }
}

async function findLiveNews(slug: string) {
  const allNews = await getNewsItems();
  const cleanSlug = normalizeSlug(slug);

  const news =
    allNews.find((item) => item.slug === cleanSlug) ||
    allNews.find((item) => normalizeSlug(item.slug) === cleanSlug);

  return {
    news: news || null,
    allNews,
  };
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const { news } = await findLiveNews(slug);

  if (!news) {
    return {
      title: "खबर नहीं मिली | News of Bihar",
      description: "यह खबर उपलब्ध नहीं है या लिंक गलत है।",
    };
  }

  return {
    title: `${news.title} | News of Bihar`,
    description: news.description,
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { news, allNews } = await findLiveNews(slug);

  if (!news) {
    return (
      <main className="min-h-screen bg-gray-50 px-4 py-10">
        <section className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 text-center shadow-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 text-3xl">
            ⚠️
          </div>

          <h1 className="text-3xl font-black text-red-900">खबर नहीं मिली</h1>

          <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-gray-600">
            यह खबर उपलब्ध नहीं है या लिंक गलत है। कृपया Latest News page पर
            जाकर दूसरी खबर पढ़ें।
          </p>

          <Link
            href="/latest-news"
            className="mt-6 inline-block rounded-2xl bg-red-800 px-5 py-3 text-sm font-black text-white"
          >
            Latest News पर जाएं
          </Link>
        </section>
      </main>
    );
  }

  const relatedNews = allNews
    .filter((item) => item.slug !== news.slug)
    .filter(
      (item) =>
        item.category === news.category || item.district === news.district
    )
    .slice(0, 3);

  const latestNews = allNews
    .filter((item) => item.slug !== news.slug)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-red-950 via-red-800 to-orange-600 px-4 py-8 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="mb-4 flex flex-wrap gap-2">
            <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-red-950">
              {news.category}
            </span>

            {news.isBreaking && (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-red-900">
                BREAKING
              </span>
            )}

            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-black">
              {news.priority || "Normal"}
            </span>
          </div>

          <h1 className="break-words text-3xl font-black leading-tight md:text-5xl">
            {news.title}
          </h1>

          <p className="mt-4 max-w-4xl break-words text-base font-semibold leading-8 text-red-50">
            {news.description}
          </p>

          <div className="mt-5 flex flex-wrap gap-3 text-xs font-black text-red-50">
            <span className="rounded-full bg-white/15 px-3 py-2">
              📍 जिला: {news.district}
            </span>

            <span className="rounded-full bg-white/15 px-3 py-2">
              🗓️ {news.date}
            </span>

            <span className="rounded-full bg-white/15 px-3 py-2">
              📰 Source: {news.source}
            </span>
          </div>
        </div>
      </section>

      <section className="px-4 py-8">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
          <article className="min-w-0 rounded-[2rem] bg-white p-5 shadow-md md:p-8">
            {news.imageUrl && (
              <div className="mb-6 overflow-hidden rounded-[1.5rem] bg-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={news.imageUrl}
                  alt={news.imageTitle || news.title}
                  className="max-h-[460px] w-full object-cover"
                />
              </div>
            )}

            {news.imageTitle && (
              <p className="mb-5 rounded-2xl bg-red-50 p-4 text-sm font-black leading-6 text-red-900">
                {news.imageTitle}
              </p>
            )}

            <div className="whitespace-pre-wrap break-words text-base font-semibold leading-9 text-gray-800">
              {news.content}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {news.officialLink && (
                <a
                  href={news.officialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl bg-red-800 px-5 py-3 text-sm font-black text-white"
                >
                  Official Link खोलें
                </a>
              )}

              {news.sourceLink && (
                <a
                  href={news.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-black text-red-800"
                >
                  Source Link खोलें
                </a>
              )}

              <Link
                href="/latest-news"
                className="rounded-2xl bg-gray-900 px-5 py-3 text-sm font-black text-white"
              >
                और खबरें पढ़ें
              </Link>
            </div>

            {news.tags && news.tags.length > 0 && (
              <div className="mt-8 border-t border-gray-100 pt-5">
                <h3 className="mb-3 text-sm font-black text-gray-800">
                  Tags / Keywords
                </h3>

                <div className="flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-2 text-xs font-black text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </article>

          <aside className="min-w-0 space-y-5">
            <div className="rounded-[2rem] bg-white p-5 shadow-md">
              <h2 className="mb-4 text-xl font-black text-red-900">
                Related News
              </h2>

              <div className="space-y-3">
                {relatedNews.length > 0 ? (
                  relatedNews.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/news/${item.slug}`}
                      className="block rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-red-200 hover:bg-red-50"
                    >
                      <p className="mb-1 text-[10px] font-black text-red-700">
                        {item.category}
                      </p>

                      <h3 className="line-clamp-2 break-words text-sm font-black leading-6 text-gray-950">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs font-bold text-gray-500">
                        {item.date}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="rounded-2xl bg-gray-50 p-4 text-sm font-bold text-gray-500">
                    अभी related news उपलब्ध नहीं है।
                  </p>
                )}
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-5 shadow-md">
              <h2 className="mb-4 text-xl font-black text-red-900">
                Latest Updates
              </h2>

              <div className="space-y-3">
                {latestNews.length > 0 ? (
                  latestNews.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/news/${item.slug}`}
                      className="block rounded-2xl border border-gray-100 bg-gray-50 p-4 transition hover:border-red-200 hover:bg-red-50"
                    >
                      <p className="mb-1 text-[10px] font-black text-orange-700">
                        {item.category}
                      </p>

                      <h3 className="line-clamp-2 break-words text-sm font-black leading-6 text-gray-950">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-xs font-bold text-gray-500">
                        {item.date}
                      </p>
                    </Link>
                  ))
                ) : (
                  <p className="rounded-2xl bg-gray-50 p-4 text-sm font-bold text-gray-500">
                    अभी latest update उपलब्ध नहीं है।
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>

        {relatedNews.length > 0 && (
          <div className="mx-auto mt-8 max-w-6xl">
            <h2 className="mb-4 text-2xl font-black text-red-900">
              इसी तरह की खबरें
            </h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {relatedNews.map((item) => (
                <NewsCard
                  key={item.slug}
                  slug={item.slug}
                  category={item.category}
                  title={item.title}
                  description={item.description}
                  district={item.district}
                  date={item.date}
                  priority={item.priority}
                  isBreaking={item.isBreaking}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    </main>
  );
}