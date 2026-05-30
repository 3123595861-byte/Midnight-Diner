import type { Metadata } from "next";
import { Noto_Serif_SC, Press_Start_2P, VT323 } from "next/font/google";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({
  weight: ["300", "600"],
  subsets: ["latin"],
  variable: "--font-noto-serif-sc",
  display: "swap",
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
  display: "swap",
});

const vt323 = VT323({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-vt323",
  display: "swap",
});

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
      <body
        className={`${notoSerifSC.variable} ${pressStart2P.variable} ${vt323.variable} min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
