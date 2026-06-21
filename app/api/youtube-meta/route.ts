import { NextResponse } from "next/server";

function getFallbackTitle(url: string) {
  if (url.includes("youtube") || url.includes("youtu.be")) {
    return "News of Bihar YouTube Video";
  }

  return "Video Update";
}

function getDefaultDescription(title: string) {
  return `${title} — बिहार की जरूरी खबरों, education updates, government jobs, sarkari yojana और जनता से जुड़ी महत्वपूर्ण जानकारी को सरल भाषा में समझने के लिए यह वीडियो देखें।`;
}

function getDefaultTags(authorName: string) {
  return [
    "Bihar News",
    "News of Bihar",
    "Bihar Latest News",
    "Video Update",
    authorName || "YouTube Video",
  ];
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const videoUrl = searchParams.get("url");

    if (!videoUrl || videoUrl.trim() === "") {
      return NextResponse.json(
        {
          success: false,
          message: "YouTube URL missing",
        },
        { status: 400 }
      );
    }

    const oembedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      videoUrl
    )}&format=json`;

    const response = await fetch(oembedUrl, {
      cache: "no-store",
    });

    if (!response.ok) {
      const fallbackTitle = getFallbackTitle(videoUrl);

      return NextResponse.json({
        success: true,
        title: fallbackTitle,
        authorName: "News of Bihar YouTube",
        thumbnailUrl: "",
        description: getDefaultDescription(fallbackTitle),
        tags: getDefaultTags("News of Bihar YouTube"),
      });
    }

    const data = await response.json();

    const title = data.title || getFallbackTitle(videoUrl);
    const authorName = data.author_name || "News of Bihar YouTube";
    const thumbnailUrl = data.thumbnail_url || "";

    return NextResponse.json({
      success: true,
      title,
      authorName,
      thumbnailUrl,
      description: getDefaultDescription(title),
      tags: getDefaultTags(authorName),
    });
  } catch (error) {
    console.error("YouTube meta fetch error:", error);

    const fallbackTitle = "News of Bihar YouTube Video";

    return NextResponse.json({
      success: true,
      title: fallbackTitle,
      authorName: "News of Bihar YouTube",
      thumbnailUrl: "",
      description: getDefaultDescription(fallbackTitle),
      tags: getDefaultTags("News of Bihar YouTube"),
    });
  }
}