import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "News of Bihar",
    short_name: "News Bihar",
    description:
      "News of Bihar - Bihar ki latest news, breaking news, government updates aur important information.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    icons: [
      {
        src: "/icons/app-icon.jpeg?v=10",
        sizes: "192x192",
        type: "image/jpeg",
        purpose: "any",
      },
      {
        src: "/icons/maskable-icon.jpeg?v=10",
        sizes: "512x512",
        type: "image/jpeg",
        purpose: "maskable",
      },
    ],
  };
}