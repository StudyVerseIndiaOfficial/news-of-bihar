import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-red-100 bg-white shadow-2xl md:hidden">
      <div className="grid grid-cols-5 text-center text-[11px] font-black text-gray-700">
        <Link href="/" className="py-2 hover:bg-red-50">
          <div className="text-lg">🏠</div>
          Home
        </Link>

        <Link href="/latest-news" className="py-2 hover:bg-red-50">
          <div className="text-lg">⚡</div>
          Latest
        </Link>

        <Link href="/district-news" className="py-2 hover:bg-red-50">
          <div className="text-lg">📍</div>
          District
        </Link>

        <Link href="/videos" className="py-2 hover:bg-red-50">
          <div className="text-lg">▶️</div>
          Videos
        </Link>

        <Link href="/government-jobs" className="py-2 hover:bg-red-50">
          <div className="text-lg">🎓</div>
          Jobs
        </Link>
      </div>
    </nav>
  );
}