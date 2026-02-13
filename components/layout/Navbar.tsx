"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Flag, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full border-b sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/70 backdrop-blur-xl border-zinc-700/50 shadow-2xl shadow-black/40"
          : "bg-zinc-950/98 backdrop-blur-sm border-zinc-700"
      }`}
    >
      {/* Carbon fiber texture overlay - Enhanced */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          isScrolled ? "opacity-40" : "opacity-100"
        }`}
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(0, 0, 0, 0.8) 0px,
              rgba(0, 0, 0, 0.8) 1px,
              rgba(40, 40, 40, 0.9) 1px,
              rgba(40, 40, 40, 0.9) 2px,
              rgba(0, 0, 0, 0.8) 2px,
              rgba(0, 0, 0, 0.8) 3px,
              rgba(60, 60, 60, 0.7) 3px,
              rgba(60, 60, 60, 0.7) 4px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(0, 0, 0, 0.8) 0px,
              rgba(0, 0, 0, 0.8) 1px,
              rgba(40, 40, 40, 0.9) 1px,
              rgba(40, 40, 40, 0.9) 2px,
              rgba(0, 0, 0, 0.8) 2px,
              rgba(0, 0, 0, 0.8) 3px,
              rgba(60, 60, 60, 0.7) 3px,
              rgba(60, 60, 60, 0.7) 4px
            ),
            linear-gradient(
              180deg,
              rgba(80, 80, 80, 0.15) 0%,
              rgba(40, 40, 40, 0.2) 50%,
              rgba(20, 20, 20, 0.25) 100%
            )
          `,
          backgroundSize: "4px 4px, 4px 4px, 100% 100%",
        }}
      />

      {/* Carbon fiber shine/reflection */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
          isScrolled ? "opacity-50" : "opacity-100"
        }`}
        style={{
          background: `
            linear-gradient(
              90deg,
              transparent 0%,
              rgba(255, 255, 255, 0.03) 25%,
              rgba(255, 255, 255, 0.08) 50%,
              rgba(255, 255, 255, 0.03) 75%,
              transparent 100%
            )
          `,
        }}
      />

      {/* Glossy overlay when scrolled */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/5 to-transparent pointer-events-none" />
      )}

      <div className="container mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl font-black text-white tracking-tighter">
            F1<span className="text-red-600">DASH</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link
            href="/drivers"
            className="text-sm font-bold text-zinc-300 hover:text-white transition-colors uppercase tracking-wider relative group"
          >
            Drivers
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/calendar"
            className="text-sm font-bold text-zinc-300 hover:text-white transition-colors uppercase tracking-wider relative group"
          >
            Calendar
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link
            href="/compare"
            className="text-sm font-bold text-zinc-300 hover:text-white transition-colors uppercase tracking-wider relative group"
          >
            Compare
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300" />
          </Link>
          <Link href="/live">
            <Button className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-none uppercase tracking-wider text-sm px-6 shadow-lg shadow-red-600/20 hover:shadow-gray-600 transition-all">
              Live
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white hover:text-red-600 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-zinc-800 bg-black/95 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
            <Link
              href="/drivers"
              className="text-base font-bold text-zinc-300 hover:text-white transition-colors uppercase tracking-wider py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Drivers
            </Link>
            <Link
              href="/calendar"
              className="text-base font-bold text-zinc-300 hover:text-white transition-colors uppercase tracking-wider py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Calendar
            </Link>
            <Link
              href="/compare"
              className="text-base font-bold text-zinc-300 hover:text-white transition-colors uppercase tracking-wider py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Compare
            </Link>
            <Link href="/live" onClick={() => setIsMobileMenuOpen(false)}>
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-none uppercase tracking-wider">
                Live
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
