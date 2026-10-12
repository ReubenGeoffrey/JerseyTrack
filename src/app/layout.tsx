import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-bodoni",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07080c",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Football Tracking Kit — The Football Collection | 22+ Stores",
  description:
    "An editorial football jersey discovery index and multi-boutique price-comparison engine. Dark Spider-Man edition tracking player issues, fan versions, archival retros, and live prices across 22+ stores in India.",
  keywords: [
    "Football Tracking Kit",
    "football jerseys",
    "football shirts India",
    "jersey price comparison",
    "authentic football shirts",
    "player issue jersey",
    "fan version jersey",
    "archive football shirts",
    "Goal Thread",
    "The Third Store",
    "Full Time Store",
    "Thayyil Sports",
    "Shopezzy",
    "MS Retro",
    "Sansiro Sports",
    "Football Monk",
  ],
  authors: [{ name: "Football Tracking Kit" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark theme-spiderman h-full antialiased ${bodoniModa.variable} ${inter.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-white spider-web-bg">
        <FavoritesProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
