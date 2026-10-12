"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Menu, X, ArrowRight } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";
import { SpidermanThemeButton } from "./SpidermanThemeButton";

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

  const navLinks = [
    { label: "Collection", href: "/" },
    { label: "Clearance", href: "/clearance" },
    { label: "Stores & Reviews", href: "/stores" },
    { label: "Wishlist", href: "/favorites" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-border bg-background/95 backdrop-blur-md ${
          scrolled ? "py-3 shadow-xs" : "py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Wordmark: FOOTBALL TRACKING KIT */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="display-title shrink-0 text-base sm:text-lg md:text-xl font-bold tracking-[0.22em] uppercase text-foreground hover:opacity-75 transition-opacity flex items-center gap-2"
            >
              <span>FOOTBALL TRACKING KIT</span>
            </Link>
          </div>

          {/* Minimalist Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
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
                      ? "text-foreground after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1.5px] after:bg-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions: Dark Spider-Man Button + Search + Wishlist */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* Dark Spider-Man Theme Toggle Button */}
            <SpidermanThemeButton />

            <Link
              href="/#catalog"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-medium text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Search Collection"
            >
              <Search className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="hidden sm:inline">Search</span>
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] font-medium text-muted-foreground hover:text-foreground transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart className="w-3.5 h-3.5 stroke-[1.5]" />
              <span className="hidden sm:inline">Saved</span>
              {count > 0 && (
                <span className="text-[10px] font-semibold text-primary-foreground bg-primary px-1.5 py-0.5 rounded-full leading-none">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 text-foreground hover:text-muted-foreground transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[1.5]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 pt-24 pb-8 px-6 flex flex-col justify-between overflow-y-auto lg:hidden animate-fade-in border-b border-border">
          <div className="flex flex-col gap-2 pt-2">
            {/* Mobile Spider-Man Theme Switcher Banner */}
            <div className="pb-3 border-b border-border">
              <SpidermanThemeButton variant="banner" className="w-full" />
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
                  className={`display-title text-2xl py-3 border-b border-border/50 flex items-center justify-between tracking-[0.14em] uppercase ${
                    isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground font-normal"
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground stroke-[1.5]" />
                </Link>
              );
            })}
          </div>

          <div className="pt-8 border-t border-border mt-auto text-xs text-muted-foreground space-y-2 uppercase tracking-widest">
            <div className="flex justify-between">
              <span>Index Curation</span>
              <span className="text-foreground font-medium">22+ Indian Stores</span>
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
