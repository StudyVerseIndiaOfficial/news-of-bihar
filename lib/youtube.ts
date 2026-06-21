export function getYouTubeId(url: string) {
  if (!url) return "";

  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname.replace("www.", "");
    const pathnameParts = parsedUrl.pathname.split("/").filter(Boolean);

    if (hostname === "youtu.be") {
      return pathnameParts[0] || "";
    }

    if (hostname.includes("youtube.com")) {
      const videoId = parsedUrl.searchParams.get("v");
      if (videoId) return videoId;

      const shortsIndex = pathnameParts.indexOf("shorts");
      if (shortsIndex !== -1) return pathnameParts[shortsIndex + 1] || "";

      const embedIndex = pathnameParts.indexOf("embed");
      if (embedIndex !== -1) return pathnameParts[embedIndex + 1] || "";

      const liveIndex = pathnameParts.indexOf("live");
      if (liveIndex !== -1) return pathnameParts[liveIndex + 1] || "";
    }

    return "";
  } catch {
    const match = url.match(
      /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
    );

    return match?.[1] || "";
  }
}

export function getYouTubeThumbnail(url: string) {
  const videoId = getYouTubeId(url);

  if (!videoId) return "";

  return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
}

export function getYouTubeEmbedUrl(url: string) {
  const videoId = getYouTubeId(url);

  if (!videoId) return "";

  return `https://www.youtube.com/embed/${videoId}`;
}