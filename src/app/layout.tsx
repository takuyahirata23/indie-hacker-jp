import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IndieHackerJP",
  description: "Documenting my journey as an indie hacker, and sharing things I learned via this journey",
  icons: [{ rel: "icon", url: "/favicon-32x32.png" }, { rel: "apple-touch-icon", url: "/apple-touch-icon.png" }],
  authors: [{ name: "IndieHackerJP" }],
  robots: "index, follow",
  keywords: ["indie hacker", "startups", "productivity", "saas"],
  openGraph: {
    type: "article"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="bg-primary text-primary-foreground py-4">
          <div className="max-w-7xl mx-auto px-4">
            <div className="font-semibold">
              IndieHackerJP
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
