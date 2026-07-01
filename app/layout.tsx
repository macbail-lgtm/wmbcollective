import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WMB Collective",
  description:
    "WMB Collective covers the business behind the culture — music, sports, media, and entertainment.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-white text-navy">{children}</body>
    </html>
  );
}
