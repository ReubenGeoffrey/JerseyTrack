"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Heart, Menu, X, ArrowRight } from "lucide-react";
import { useFavorites } from "@/context/FavoritesContext";

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
    { label: "Browse", href: "/" },
    { label: "Clearance", href: "/clearance" },
    { label: "Reviews", href: "/stores" },
    { label: "Favorites", href: "/favorites" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 border-b border-border ${
          scrolled
            ? "bg-background/95 backdrop-blur-md py-2.5 shadow-lg"
            : "bg-background/85 backdrop-blur-md py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Brand Logo matching original */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="display-title shrink-0 text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight hover:opacity-90 transition-opacity"
            >
              Kit<span className="text-primary">Scout</span>
            </Link>
          </div>

          {/* Nav Links matching original */}
          <nav className="hidden sm:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/#catalog"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-secondary/60"
              aria-label="Search"
            >
              <Search className="w-4 h-4 stroke-[2]" />
              <span className="hidden md:inline">Search</span>
            </Link>

            <Link
              href="/favorites"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors p-1.5 rounded-md hover:bg-secondary/60 relative"
              aria-label="Favorites"
            >
              <Heart className="w-4 h-4 stroke-[2]" />
              <span className="hidden md:inline">Favorites</span>
              {count > 0 && (
                <span className="text-[10px] font-bold text-primary-foreground bg-primary px-1.5 py-0.2 rounded-full leading-none">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="sm:hidden p-1.5 text-foreground hover:text-primary transition-colors rounded-md"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 stroke-[2]" />
              ) : (
                <Menu className="w-5 h-5 stroke-[2]" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 pt-20 pb-8 px-6 flex flex-col justify-between overflow-y-auto sm:hidden animate-fade-in border-b border-border">
          <div className="flex flex-col gap-2 pt-4">
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
                  className={`display-title text-2xl font-bold py-3 px-3 rounded-lg flex items-center justify-between border-b border-border/50 ${
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-muted-foreground" />
                </Link>
              );
            })}
          </div>

          <div className="pt-6 border-t border-border mt-auto text-xs text-muted-foreground space-y-2">
            <div className="flex justify-between">
              <span>Catalog</span>
              <span className="text-foreground font-semibold">22+ Live Stores</span>
            </div>
            <div className="flex justify-between">
              <span>Currency</span>
              <span className="text-foreground font-semibold">INR (₹)</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
