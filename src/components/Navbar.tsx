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

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "DISCOVER", href: "/#catalog" },
    { label: "FOOTBALL", href: "/?category=player#catalog" },
    { label: "RETRO", href: "/?category=retro#catalog" },
    { label: "NATIONAL TEAMS", href: "/?category=international#catalog" },
    { label: "CLEARANCE", href: "/clearance" },
    { label: "STORES & REVIEWS", href: "/stores" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md border-b border-neutral-200/80 py-3 text-black"
            : "bg-white/80 backdrop-blur-sm border-b border-neutral-200/40 py-4 text-black"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left: Brand Wordmark */}
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="text-lg sm:text-xl font-medium tracking-[0.25em] uppercase hover:opacity-70 transition-opacity"
            >
              KITSCOUTS
            </Link>
          </div>

          {/* Center: Editorial Navigation Links */}
          <nav className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/#catalog" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`text-[11px] font-medium tracking-[0.16em] uppercase transition-colors relative py-1 ${
                    isActive
                      ? "text-black after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-black"
                      : "text-neutral-500 hover:text-black"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right: Actions */}
          <div className="flex items-center gap-5 sm:gap-6">
            {onSearchClick ? (
              <button
                onClick={onSearchClick}
                className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-neutral-600 hover:text-black transition-colors"
                aria-label="Search Catalog"
              >
                <Search className="w-4 h-4 stroke-[1.5]" />
                <span className="hidden sm:inline">SEARCH</span>
              </button>
            ) : (
              <Link
                href="/#catalog"
                className="flex items-center gap-2 text-[11px] tracking-[0.14em] uppercase text-neutral-600 hover:text-black transition-colors"
                aria-label="Search Catalog"
              >
                <Search className="w-4 h-4 stroke-[1.5]" />
                <span className="hidden sm:inline">SEARCH</span>
              </Link>
            )}

            <Link
              href="/favorites"
              className="flex items-center gap-1.5 text-[11px] tracking-[0.14em] uppercase text-neutral-600 hover:text-black transition-colors relative"
              aria-label="Saved items"
            >
              <Heart className="w-4 h-4 stroke-[1.5]" />
              <span className="hidden sm:inline">WISHLIST</span>
              {count > 0 && (
                <span className="text-[10px] font-medium tracking-normal text-black bg-neutral-100 px-1.5 py-0.2 rounded-full border border-neutral-300">
                  {count}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1 text-black hover:opacity-60 transition-opacity"
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 pb-8 px-6 flex flex-col justify-between overflow-y-auto lg:hidden animate-fade-in">
          <div className="flex flex-col gap-6 pt-4">
            <span className="text-[10px] uppercase tracking-[0.25em] text-neutral-400">
              NAVIGATION
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xl font-light tracking-[0.18em] uppercase text-black hover:pl-2 transition-all flex items-center justify-between border-b border-neutral-100 pb-4"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 stroke-[1.2] text-neutral-400" />
              </Link>
            ))}
          </div>

          <div className="pt-8 border-t border-neutral-200 mt-auto flex flex-col gap-4 text-[11px] tracking-[0.15em] uppercase text-neutral-500">
            <div className="flex justify-between items-center">
              <span>LOCATION</span>
              <span className="text-black">INDIA (INR ₹)</span>
            </div>
            <div className="flex justify-between items-center">
              <span>CATALOG</span>
              <span className="text-black">13+ VERIFIED STORES</span>
            </div>
            <p className="text-[10px] normal-case text-neutral-400 tracking-normal pt-2">
              KitScouts aggregates live football shirts from top independent stockists. All product trademarks belong to their respective creators.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
