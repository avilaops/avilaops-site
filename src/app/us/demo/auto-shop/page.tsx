import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ramírez Auto Repair — sitio de ejemplo",
  description: "Sitio de ejemplo para un taller automotriz local en Miami.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AutoShopDemoPage() {
  return (
    <main style={{ margin: 0, minHeight: "100dvh", background: "#2B3138" }}>
      <iframe
        src="/demos/auto-shop.html"
        title="Ramírez Auto Repair — sitio de ejemplo"
        style={{
          display: "block",
          width: "100%",
          height: "100dvh",
          border: 0,
          background: "#F4F1EC",
        }}
      />
    </main>
  );
}
