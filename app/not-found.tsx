import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 text-center shadow-md">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-red-100 text-4xl">
          🔍
        </div>

        <h1 className="text-4xl font-black text-red-900">Page नहीं मिला</h1>

        <p className="mx-auto mt-3 max-w-xl text-sm font-semibold leading-7 text-gray-600">
          जिस page को आप खोलना चाहते हैं, वह उपलब्ध नहीं है या link गलत है।
          Latest News page पर जाकर नई खबरें पढ़ें।
        </p>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-2xl bg-red-800 px-5 py-3 text-sm font-black text-white"
          >
            Home
          </Link>

          <Link
            href="/latest-news"
            className="rounded-2xl border border-red-200 bg-white px-5 py-3 text-sm font-black text-red-800"
          >
            Latest News
          </Link>
        </div>
      </div>
    </div>
  );
}