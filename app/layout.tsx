import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI 深夜食堂",
  description: "像素风料理与奇妙评价的深夜食堂经营游戏",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
