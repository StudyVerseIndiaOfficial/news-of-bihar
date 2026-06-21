import { getYouTubeThumbnail } from "@/lib/youtube";
import type { YouTubeVideoItem } from "@/data/youtubeVideos";

type YouTubeVideoCardProps = {
  video: YouTubeVideoItem;
};

export default function YouTubeVideoCard({ video }: YouTubeVideoCardProps) {
  const thumbnail = getYouTubeThumbnail(video.youtubeUrl);

  return (
    <a
      href={`/videos?watch=${video.slug}`}
      className="group overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative bg-gray-200">
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={video.title}
            className="aspect-video w-full object-cover"
          />
        ) : (
          <div className="flex aspect-video items-center justify-center bg-gradient-to-br from-red-900 to-orange-500 text-white">
            <div className="text-center">
              <div className="text-4xl font-black">▶</div>
              <p className="mt-2 text-sm font-bold">Video Thumbnail</p>
            </div>
          </div>
        )}

        <div className="absolute inset-0 flex items-center justify-center bg-black/10 opacity-100">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-800 text-2xl font-black text-white shadow-xl">
            ▶
          </div>
        </div>

        {video.isFeatured && (
          <span className="absolute left-3 top-3 rounded-full bg-red-800 px-3 py-1 text-[10px] font-black text-white">
            FEATURED
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-2 flex flex-wrap gap-2">
          <span className="rounded-full bg-red-100 px-3 py-1 text-[10px] font-black text-red-800">
            {video.category}
          </span>

          {video.priority === "High" && (
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-[10px] font-black text-yellow-800">
              TOP VIDEO
            </span>
          )}
        </div>

        <h3 className="mb-2 text-lg font-black leading-snug text-gray-950 group-hover:text-red-800">
          {video.title}
        </h3>

        <p className="text-sm font-semibold leading-6 text-gray-600">
          {video.description}
        </p>

        <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold text-gray-500">
          <span>🗓️ {video.date}</span>
          <span>📰 {video.source}</span>
        </div>
      </div>
    </a>
  );
}