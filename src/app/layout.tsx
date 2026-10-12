import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Archivo } from "next/font/google";
import "./globals.css";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0b0d13",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "KitScout — Compare Football Jersey Prices & Stock",
  description:
    "Compare football jersey prices and stock across 22+ stores in India. Player versions, fan editions, retro shirts, and clearance markdowns in one catalog.",
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
    "The Football Frenzy",
    "MS Retro",
    "KitKrew",
    "House of Goat",
    "Jaihind Sports",
  ],
  authors: [{ name: "KitScouts" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark h-full antialiased ${barlowCondensed.variable} ${archivo.variable}`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
        <FavoritesProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </FavoritesProvider>
      </body>
    </html>
  );
}
