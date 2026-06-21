import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          background: "linear-gradient(135deg, #450a0a, #991b1b, #f97316)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            right: "-80px",
            width: "360px",
            height: "360px",
            borderRadius: "999px",
            background: "rgba(255,255,255,0.12)",
          }}
        />

        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            left: "-100px",
            width: "460px",
            height: "460px",
            borderRadius: "999px",
            background: "rgba(253,224,71,0.22)",
          }}
        />

        <div
          style={{
            width: "1000px",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "32px",
                background: "rgba(255,255,255,0.16)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "40px",
                fontWeight: 900,
              }}
            >
              NOB
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ fontSize: "64px", fontWeight: 900 }}>
                {SITE_NAME}
              </div>
              <div style={{ fontSize: "30px", color: "#fef3c7" }}>
                {SITE_TAGLINE}
              </div>
            </div>
          </div>

          <div
            style={{
              fontSize: "54px",
              lineHeight: 1.18,
              fontWeight: 900,
              maxWidth: "950px",
            }}
          >
            बिहार की हर जरूरी खबर अब आपके हाथों में
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
              fontSize: "24px",
              fontWeight: 800,
            }}
          >
            <div
              style={{
                background: "rgba(255,255,255,0.16)",
                padding: "14px 22px",
                borderRadius: "999px",
              }}
            >
              Latest News
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.16)",
                padding: "14px 22px",
                borderRadius: "999px",
              }}
            >
              Jobs
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.16)",
                padding: "14px 22px",
                borderRadius: "999px",
              }}
            >
              Education
            </div>

            <div
              style={{
                background: "rgba(255,255,255,0.16)",
                padding: "14px 22px",
                borderRadius: "999px",
              }}
            >
              Yojana
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}