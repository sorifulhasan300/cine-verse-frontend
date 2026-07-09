import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "CineVerse - Stream Your Favorites",
  description:
    "Discover and stream unlimited movies and content. Explore diverse genres, create personalized watchlists, and enjoy premium entertainment.",
  keywords: "movies, streaming, cinema, films, watch online, entertainment",
  authors: [{ name: "CineVerse" }],
  openGraph: {
    title: "CineVerse - Stream Your Favorites",
    description: "Discover and stream unlimited movies and content.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", poppins.variable, "font-poppins")}
    >
      <body
        className="min-h-full flex flex-col"
        suppressHydrationWarning={true}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
