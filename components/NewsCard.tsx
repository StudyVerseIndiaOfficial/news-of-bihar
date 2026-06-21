import Link from "next/link";

type NewsCardProps = {
  slug: string;
  category: string;
  title: string;
  description: string;
  district: string;
  date: string;
  priority?: "High" | "Medium" | "Normal";
  isBreaking?: boolean;
};

export default function NewsCard({
  slug,
  category,
  title,
  description,
  district,
  date,
  priority = "Normal",
  isBreaking = false,
}: NewsCardProps) {
  return (
    <div className="group rounded-3xl border border-gray-100 bg-white p-4 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-2">
          {isBreaking && (
            <span className="rounded-full bg-red-800 px-3 py-1 text-[10px] font-black text-white">
              BREAKING
            </span>
          )}

          <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-black text-red-800">
            {category}
          </span>

          {priority === "High" && (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-black text-yellow-800">
              TOP UPDATE
            </span>
          )}
        </div>

        <span className="text-[11px] font-bold text-gray-500">{date}</span>
      </div>

      <Link href={`/news/${slug}`}>
        <h2 className="mb-2 text-lg font-black leading-snug text-gray-950 group-hover:text-red-800">
          {title}
        </h2>
      </Link>

      <p className="mb-4 text-sm font-semibold leading-6 text-gray-600">
        {description}
      </p>

      <div className="flex items-center justify-between gap-2">
        <span className="rounded-full bg-orange-50 px-3 py-2 text-xs font-black text-orange-700">
          📍 {district}
        </span>

        <Link
          href={`/news/${slug}`}
          className="rounded-2xl bg-red-800 px-4 py-3 text-xs font-black text-white shadow-sm hover:bg-red-900"
        >
          पूरी खबर पढ़ें
        </Link>
      </div>
    </div>
  );
}