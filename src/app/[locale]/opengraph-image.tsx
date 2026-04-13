import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Olive Marketing — Beauty & Wellness Growth";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background:
            "linear-gradient(135deg, #f5f5e7 0%, #e8e5d4 50%, #dcdac6 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 96,
            height: 96,
            borderRadius: 24,
            background: "#5a6e2e",
            marginBottom: 32,
          }}
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
            <path d="M6.05 8.05a7 7 0 0 1 9.9 0L12 12l-5.95-3.95zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <h1
            style={{
              fontSize: 56,
              fontWeight: 700,
              color: "#1c1b16",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Olive Marketing
          </h1>
          <p
            style={{
              fontSize: 24,
              color: "#5a6e2e",
              margin: 0,
              fontWeight: 500,
              letterSpacing: "0.05em",
              textTransform: "uppercase",
            }}
          >
            Beauty & Wellness Growth
          </p>
          <p
            style={{
              fontSize: 20,
              color: "#49454f",
              margin: 0,
              marginTop: 8,
              maxWidth: 700,
              textAlign: "center",
              lineHeight: 1.5,
            }}
          >
            Websites, social, and paid media for salons, spas & beauty brands
          </p>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #5a6e2e, #8a9a5b, #5a6e2e)",
          }}
        />
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
