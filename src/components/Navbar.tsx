"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Menu, X, ArrowRight, Github } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { SpiderInsigniaIcon, SpiderMaskIcon } from "./SpiderIcons";

interface NavbarProps {
  onSearchClick?: () => void;
}

export function Navbar({ onSearchClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Collection", href: "/" },
    { label: "Clearance", href: "/clearance" },
    { label: "Stores & Reviews", href: "/stores" },
    { label: "Wishlist", href: "/favorites" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-border/80 bg-background/95 backdrop-blur-md ${
          scrolled ? "py-2.5 shadow-lg shadow-black/40" : "py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Spider-Man SVG Brand Wordmark: FOOTBALL TRACKING KIT */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="display-title shrink-0 text-base sm:text-lg md:text-xl font-bold tracking-[0.2em] uppercase text-foreground hover:text-primary transition-colors flex items-center gap-2.5 group"
            >
              {/* Spider-Man SVG Insignia */}
              <div className="relative size-7 sm:size-8 grid place-items-center rounded-full bg-primary/10 border border-primary/40 group-hover:border-primary group-hover:shadow-spider-glow transition-all">
                <SpiderInsigniaIcon className="size-4 sm:size-5 text-primary transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,23,68,0.7)]" />
              </div>
              <span className="tracking-[0.18em]">
                FOOTBALL <span className="text-primary drop-shadow-[0_0_10px_rgba(255,23,68,0.6)]">TRACKING</span> KIT
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] uppercase tracking-[0.2em] font-medium transition-colors relative py-1 ${
                    isActive
                      ? "text-primary font-bold after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-primary after:shadow-[0_0_8px_#ff1744]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons: Touch-optimized for Mobile Safari & Chrome */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            <Link
              href="/#catalog"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] font-medium text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-secondary/60 active:scale-95 touch-manipulation"
              aria-label="Search Collection"
            >
              <Search className="w-4 h-4 stroke-[1.8]" />
              <span className="hidden sm:inline">Search</span>
            </Link>

            <Link
              href="/favorites"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-2 text-[11px] uppercase tracking-[0.18em] font-medium text-muted-foreground hover:text-foreground transition-colors p-2 rounded-md hover:bg-secondary/60 relative active:scale-95 touch-manipulation"
              aria-label="Wishlist"
            >
              <Heart className="w-4 h-4 stroke-[1.8]" />
              <span className="hidden sm:inline">Saved</span>
              {count > 0 && (
                <span className="text-[10px] font-bold text-white bg-primary px-1.5 py-0.2 rounded-full leading-none shadow-[0_0_8px_rgba(255,23,68,0.8)] animate-pulse">
                  {count}
                </span>
              )}
            </Link>

            {/* GitHub Link */}
            <a
              href="https://github.com/reubengeoffrey/JerseyTrack"
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center gap-1.5 text-[11px] uppercase tracking-[0.18em] font-medium text-muted-foreground hover:text-primary transition-colors p-2 rounded-md hover:bg-secondary/60 active:scale-95 touch-manipulation"
              aria-label="GitHub Repository"
              title="GitHub Repository"
            >
              <Github className="w-4 h-4 stroke-[1.8]" />
              <span className="hidden xl:inline">GitHub</span>
            </a>

            {/* Mobile Hamburger (min 44x44px tap target for iOS Safari & Chrome Mobile) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-h-[44px] min-w-[44px] flex items-center justify-center lg:hidden p-2 text-foreground hover:text-primary transition-colors rounded-md active:bg-secondary touch-manipulation"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[2]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[2]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu: Cross-browser iOS Safari, Chrome Mobile & Firefox */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#07080c]/98 backdrop-blur-xl pt-20 pb-8 px-6 flex flex-col justify-between overflow-y-auto lg:hidden animate-fade-in border-b border-border spider-web-bg safe-bottom">
          <div className="flex flex-col gap-2 pt-4">
            {/* Spider-Man Mobile Hero Badge */}
            <div className="flex items-center gap-3 p-3.5 rounded-lg bg-card border border-border/80 mb-2">
              <SpiderMaskIcon size={34} />
              <div>
                <span className="text-xs font-bold tracking-wider uppercase text-foreground block">
                  Dark Spider Edition
                </span>
                <span className="text-[10px] text-muted-foreground tracking-widest uppercase">
                  6,569+ shirts · 22 stores live
                </span>
              </div>
            </div>

            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`display-title min-h-[48px] text-xl py-3.5 px-3 rounded-lg border-b border-border/50 flex items-center justify-between tracking-[0.14em] uppercase transition-colors active:bg-secondary ${
                    isActive
                      ? "text-primary font-bold bg-primary/10 border-primary/30 shadow-[0_0_12px_rgba(255,23,68,0.2)]"
                      : "text-foreground hover:text-primary font-normal"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="size-1.5 rounded-full bg-primary" />
                    <span>{link.label}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-muted-foreground stroke-[1.5]" />
                </Link>
              );
            })}

            {/* Mobile GitHub Button */}
            <a
              href="https://github.com/reubengeoffrey/JerseyTrack"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="display-title min-h-[48px] text-base py-3 px-3.5 rounded-lg border border-border/80 bg-card/70 flex items-center justify-between tracking-[0.14em] uppercase transition-all text-foreground hover:text-primary active:scale-98 mt-2 shadow-spider-glow"
            >
              <div className="flex items-center gap-2.5">
                <Github className="w-5 h-5 text-primary" />
                <span>GitHub Repository</span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground stroke-[1.5]" />
            </a>
          </div>

          <div className="pt-6 border-t border-border mt-auto text-xs text-muted-foreground space-y-2 uppercase tracking-widest safe-bottom">
            <div className="flex justify-between">
              <span>Sync Network</span>
              <span className="text-primary font-medium">22+ Indian Stores</span>
            </div>
            <div className="flex justify-between">
              <span>Currency</span>
              <span className="text-foreground font-medium">INR (₹)</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
