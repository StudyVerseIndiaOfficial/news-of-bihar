import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-red-100 bg-white px-4 pb-24 pt-8 md:pb-8">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-red-900 to-orange-500 text-lg font-black text-white shadow-md">
              NOB
            </div>

            <div>
              <h2 className="text-xl font-black text-red-900">
                NEWS OF BIHAR
              </h2>
              <p className="text-xs font-bold text-gray-600">
                सच बिहार का, आवाज जनता की
              </p>
            </div>
          </div>

          <p className="max-w-xl text-sm font-medium leading-7 text-gray-600">
            News of Bihar का उद्देश्य बिहार की जरूरी खबरों, शिक्षा, सरकारी
            नौकरी, योजना, जिला अपडेट, video news और जनता से जुड़ी जानकारी को
            सरल, साफ और जिम्मेदार भाषा में लोगों तक पहुँचाना है।
          </p>

          <div className="mt-4 rounded-2xl border border-yellow-200 bg-yellow-50 p-4">
            <p className="text-xs font-bold leading-6 text-yellow-900">
              Disclaimer: यह वेबसाइट किसी सरकारी संस्था से संबंधित नहीं है।
              सरकारी नौकरी, परीक्षा, योजना या official notice से जुड़ी जानकारी
              को अंतिम मानने से पहले official website से जरूर मिलान करें।
            </p>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-base font-black text-red-900">
            Quick Links
          </h3>

          <div className="flex flex-col gap-2 text-sm font-bold text-gray-700">
            <Link href="/">Home</Link>
            <Link href="/latest-news">Latest News</Link>
            <Link href="/district-news">District News</Link>
            <Link href="/education">Education</Link>
            <Link href="/government-jobs">Government Jobs</Link>
            <Link href="/sarkari-yojana">Sarkari Yojana</Link>
            <Link href="/videos">Videos</Link>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-base font-black text-red-900">
            Legal & Contact
          </h3>

          <div className="flex flex-col gap-2 text-sm font-bold text-gray-700">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/disclaimer">Disclaimer</Link>
            <Link href="/contact">Contact</Link>
            <Link href="/admin">Admin News</Link>
            <Link href="/admin/videos">Admin Videos</Link>
          </div>

          <div className="mt-4 rounded-2xl bg-red-50 p-4">
            <p className="text-xs font-black text-red-900">
              Correction / News Submit
            </p>
            <p className="mt-1 text-xs font-semibold leading-5 text-gray-600">
              किसी खबर में सुधार या official update के लिए Contact page से
              संपर्क करें।
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 max-w-6xl border-t border-gray-100 pt-4 text-center">
        <p className="text-xs font-bold text-gray-500">
          © 2026 News of Bihar. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}