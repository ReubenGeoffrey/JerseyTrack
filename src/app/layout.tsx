import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "KitScouts — The Football Collection | Luxury Jersey Discovery",
  description:
    "An editorial football jersey discovery index. Compare authentic player editions, fan cuts, and rare archival retros across India's premier independent stockists.",
  keywords: [
    "football jerseys",
    "football kits",
    "jersey price comparison India",
    "player version jersey",
    "fan version jersey",
    "retro kits",
    "KitScouts",
    "Goal Thread",
    "Full Time Store",
    "Thayyil Sports",
    "Shopezzy",
    "Store 1914",
    "MS Retro",
    "KitKrew",
    "House of Goat",
  ],
  authors: [{ name: "KitScouts Editorial" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col font-sans bg-white text-neutral-900 selection:bg-black selection:text-white">
        <FavoritesProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
