import Link from "next/link";
import { allNews } from "@/data/newsData";
import ArticleShare from "@/components/ArticleShare";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = allNews.find((item) => item.slug === slug);

  if (!news) {
    return (
      <div className="bg-gray-50 px-4 py-10">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 text-center shadow-md">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl">
            ⚠️
          </div>

          <h1 className="mb-3 text-3xl font-black text-red-800">
            खबर नहीं मिली
          </h1>

          <p className="mb-6 text-sm font-semibold leading-7 text-gray-600">
            यह खबर उपलब्ध नहीं है या लिंक गलत है। कृपया Latest News page पर जाकर
            अन्य खबरें पढ़ें।
          </p>

          <Link
            href="/latest-news"
            className="rounded-2xl bg-red-800 px-5 py-3 text-sm font-black text-white"
          >
            Latest News पर जाएं
          </Link>
        </div>
      </div>
    );
  }

  const relatedNews = allNews
    .filter(
      (item) =>
        item.slug !== news.slug &&
        (item.category === news.category || item.district === news.district)
    )
    .slice(0, 4);

  const latestNews = allNews
    .filter((item) => item.slug !== news.slug)
    .slice(0, 5);

  const hasImage = news.imageUrl && news.imageUrl.trim() !== "";
  const hasOfficialLink = news.officialLink && news.officialLink.trim() !== "";
  const hasSourceLink = news.sourceLink && news.sourceLink.trim() !== "";

  return (
    <article className="bg-gray-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-red-950 via-red-800 to-orange-600 px-4 py-8 text-white">
        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-yellow-300/20 blur-3xl" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Link
              href="/"
              className="rounded-full bg-white/15 px-3 py-2 text-xs font-black text-white"
            >
              Home
            </Link>

            <span className="text-xs font-bold text-red-100">/</span>

            <Link
              href="/latest-news"
              className="rounded-full bg-white/15 px-3 py-2 text-xs font-black text-white"
            >
              Latest News
            </Link>

            <span className="text-xs font-bold text-red-100">/</span>

            <span className="rounded-full bg-yellow-300 px-3 py-2 text-xs font-black text-red-950">
              {news.category}
            </span>

            {news.isBreaking && (
              <span className="rounded-full bg-white px-3 py-2 text-xs font-black text-red-900">
                BREAKING
              </span>
            )}
          </div>

          <h1 className="max-w-4xl text-3xl font-black leading-tight md:text-5xl">
            {news.title}
          </h1>

          <p className="mt-4 max-w-3xl text-base font-semibold leading-8 text-red-50">
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
              📰 {news.source}
            </span>

            {news.priority && (
              <span className="rounded-full bg-white/15 px-3 py-2">
                ⭐ Priority: {news.priority}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="px-4 py-6">
        <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1fr_340px]">
          <main className="space-y-5">
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-md">
              {hasImage ? (
                <>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={news.imageUrl}
                    alt={news.imageTitle || news.title}
                    className="h-auto w-full object-cover"
                  />
                </>
              ) : (
                <div className="flex min-h-64 items-center justify-center bg-gradient-to-br from-red-900 via-red-700 to-orange-500 p-6 text-center text-white">
                  <div>
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-3xl bg-white/15 text-3xl font-black shadow-lg">
                      NOB
                    </div>

                    <p className="mb-2 text-sm font-black uppercase tracking-wider text-yellow-100">
                      News of Bihar
                    </p>

                    <h2 className="mx-auto max-w-2xl text-2xl font-black leading-tight md:text-4xl">
                      {news.imageTitle || news.title}
                    </h2>

                    <p className="mt-4 text-sm font-bold text-red-50">
                      सच बिहार का, आवाज जनता की
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-md">
              <div className="mb-3 inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-black text-red-800">
                खबर का सार
              </div>

              <p className="text-lg font-bold leading-9 text-gray-800">
                {news.description}
              </p>

              {news.tags && news.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {news.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-gray-100 px-3 py-1 text-xs font-black text-gray-700"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-3xl border border-orange-100 bg-orange-50 p-5 shadow-sm">
              <h2 className="mb-2 text-xl font-black text-orange-900">
                Source / Official Information
              </h2>

              <p className="text-sm font-bold leading-7 text-orange-950">
                Source: {news.source}
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                {hasOfficialLink && (
                  <a
                    href={news.officialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl bg-orange-800 px-4 py-3 text-xs font-black text-white"
                  >
                    Official Link खोलें
                  </a>
                )}

                {hasSourceLink && (
                  <a
                    href={news.sourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-orange-700 bg-white px-4 py-3 text-xs font-black text-orange-900"
                  >
                    Source Link खोलें
                  </a>
                )}
              </div>

              <p className="mt-4 text-sm font-semibold leading-7 text-orange-900">
                News of Bihar का प्रयास है कि खबर को साफ, सरल और जिम्मेदार भाषा
                में लोगों तक पहुँचाया जाए। सरकारी नौकरी, परीक्षा, योजना या
                official notice से जुड़ी जानकारी को final मानने से पहले official
                website से मिलान जरूर करें।
              </p>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-md md:p-7">
              <h2 className="mb-4 border-b border-red-100 pb-3 text-2xl font-black text-red-900">
                पूरी खबर विस्तार से
              </h2>

              <p className="whitespace-pre-line text-base font-medium leading-9 text-gray-800 md:text-lg">
                {news.content}
              </p>

              <div className="mt-6 rounded-3xl border border-red-100 bg-red-50 p-5">
                <p className="text-lg font-black text-red-900">
                  News of Bihar की बात
                </p>

                <p className="mt-2 text-sm font-bold leading-7 text-red-950">
                  हम खबर को तेज़ बनाने से पहले सही बनाने की कोशिश करते हैं।
                  अफवाह से दूर रहना और सही जानकारी तक पहुँचना हर नागरिक का
                  अधिकार है।
                </p>
              </div>
            </div>

            <ArticleShare title={news.title} />

            <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
              <h2 className="mb-2 text-xl font-black text-yellow-950">
                जरूरी Disclaimer
              </h2>

              <p className="text-sm font-bold leading-7 text-yellow-900">
                News of Bihar किसी सरकारी संस्था, विभाग, आयोग या official portal
                से संबंधित नहीं है। सरकारी नौकरी, परीक्षा, योजना, admit card,
                result, answer key या official notice से जुड़ी जानकारी को आवेदन
                करने या निर्णय लेने से पहले संबंधित official website से जरूर
                मिलान करें।
              </p>

              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/disclaimer"
                  className="rounded-2xl bg-yellow-900 px-4 py-3 text-xs font-black text-white"
                >
                  Full Disclaimer
                </Link>

                <Link
                  href="/contact"
                  className="rounded-2xl border border-yellow-700 bg-white px-4 py-3 text-xs font-black text-yellow-900"
                >
                  Correction भेजें
                </Link>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-5 shadow-md">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-gray-950">
                    Related News
                  </h2>
                  <p className="mt-1 text-sm font-semibold text-gray-600">
                    इसी category या district से जुड़ी खबरें
                  </p>
                </div>

                <Link
                  href="/latest-news"
                  className="rounded-full border border-red-200 px-3 py-2 text-xs font-black text-red-800"
                >
                  View All
                </Link>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {relatedNews.length > 0 ? (
                  relatedNews.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/news/${item.slug}`}
                      className="rounded-2xl border border-gray-100 bg-gray-50 p-4 hover:bg-red-50"
                    >
                      <span className="mb-2 inline-block rounded-full bg-red-100 px-3 py-1 text-[10px] font-black text-red-800">
                        {item.category}
                      </span>

                      <h3 className="text-sm font-black leading-6 text-gray-900">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-xs font-bold text-gray-500">
                        📍 {item.district} • 🗓️ {item.date}
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
          </main>

          <aside className="space-y-5">
            <div className="rounded-3xl bg-white p-5 shadow-md">
              <h3 className="mb-3 text-xl font-black text-red-900">
                Latest Updates
              </h3>

              <div className="space-y-3">
                {latestNews.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="block rounded-2xl border border-gray-100 bg-gray-50 p-3 hover:bg-red-50"
                  >
                    <span className="mb-1 inline-block rounded-full bg-red-100 px-2 py-1 text-[10px] font-black text-red-800">
                      {item.category}
                    </span>

                    <h4 className="text-sm font-black leading-6 text-gray-900">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-[11px] font-bold text-gray-500">
                      {item.date}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-gradient-to-br from-red-900 to-orange-600 p-5 text-white shadow-md">
              <h3 className="text-2xl font-black">News of Bihar</h3>

              <p className="mt-2 text-sm font-semibold leading-7 text-red-50">
                बिहार की खबर, बिहार के लोगों के लिए। साफ भाषा, सही जानकारी और
                जनता की आवाज।
              </p>

              <Link
                href="/contact"
                className="mt-5 inline-block rounded-2xl bg-white px-4 py-3 text-xs font-black text-red-900"
              >
                खबर / सुधार भेजें
              </Link>
            </div>

            <div className="rounded-3xl border border-yellow-200 bg-yellow-50 p-5 shadow-sm">
              <h3 className="text-lg font-black text-yellow-950">
                Official Check जरूरी
              </h3>

              <p className="mt-2 text-sm font-bold leading-7 text-yellow-900">
                Job, exam, result, yojana या notice से जुड़ी जानकारी को official
                source से verify करना न भूलें।
              </p>
            </div>
          </aside>
        </div>
      </section>
    </article>
  );
}