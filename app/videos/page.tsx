import YouTubeVideoExplorer from "@/components/YouTubeVideoExplorer";
import { getVideoItems } from "@/lib/videoService";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Videos | News of Bihar",
  description:
    "News of Bihar YouTube videos, Bihar latest news videos, education updates, government jobs and sarkari yojana videos.",
};

export default async function VideosPage() {
  const videos = await getVideoItems();

  return <YouTubeVideoExplorer videos={videos} />;
}