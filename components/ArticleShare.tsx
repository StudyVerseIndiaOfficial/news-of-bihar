"use client";

import { useEffect, useState } from "react";

type ArticleShareProps = {
  title: string;
};

export default function ArticleShare({ title }: ArticleShareProps) {
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const shareText = `${title}\n\n${currentUrl}`;

  const copyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);
    alert("News link copy हो गया");
  };

  return (
    <div className="rounded-3xl border border-red-100 bg-white p-5 shadow-md">
      <h3 className="mb-3 text-lg font-black text-red-900">
        खबर शेयर करें
      </h3>

      <p className="mb-4 text-sm font-semibold leading-6 text-gray-600">
        अगर यह खबर उपयोगी लगे, तो इसे अपने दोस्तों और परिवार के साथ जरूर शेयर करें।
      </p>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
          target="_blank"
          className="rounded-2xl bg-green-600 px-4 py-3 text-center text-xs font-black text-white"
        >
          WhatsApp
        </a>

        <a
          href={`https://t.me/share/url?url=${encodeURIComponent(
            currentUrl
          )}&text=${encodeURIComponent(title)}`}
          target="_blank"
          className="rounded-2xl bg-sky-600 px-4 py-3 text-center text-xs font-black text-white"
        >
          Telegram
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            currentUrl
          )}`}
          target="_blank"
          className="rounded-2xl bg-blue-700 px-4 py-3 text-center text-xs font-black text-white"
        >
          Facebook
        </a>

        <button
          onClick={copyLink}
          className="rounded-2xl bg-red-800 px-4 py-3 text-xs font-black text-white"
        >
          Copy Link
        </button>
      </div>
    </div>
  );
}