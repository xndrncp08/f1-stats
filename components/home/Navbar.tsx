"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
    <nav className="w-full sticky top-0 z-50">
      <Card
        className={`bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-zinc-800/95 backdrop-blur-xl border-zinc-700/50 overflow-hidden shadow-2xl rounded-none transition-all duration-500 ${
          isScrolled ? "shadow-red-900/20" : ""
        }`}
      >
        {/* Carbon fiber texture overlay */}
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

        {/* Animated background gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl transition-all duration-700 opacity-50" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl transition-all duration-700 opacity-50" />

        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 animate-pulse" />

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
              className="text-sm font-bold text-zinc-300 hover:text-red-400 transition-colors uppercase tracking-wider"
            >
              Drivers
            </Link>
            <Link
              href="/calendar"
              className="text-sm font-bold text-zinc-300 hover:text-red-400 transition-colors uppercase tracking-wider"
            >
              Calendar
            </Link>
            <Link
              href="/compare"
              className="text-sm font-bold text-zinc-300 hover:text-red-400 transition-colors uppercase tracking-wider"
            >
              Compare
            </Link>
            <Link href="/live">
              <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl uppercase tracking-wider text-sm px-6 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-300 hover:scale-[1.02]">
                Live
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white hover:text-red-400 transition-colors text-sm font-bold uppercase tracking-wider"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800/50 bg-zinc-900/50 backdrop-blur">
            <div className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link
                href="/drivers"
                className="text-base font-bold text-zinc-300 hover:text-red-400 transition-colors uppercase tracking-wider py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Drivers
              </Link>
              <Link
                href="/calendar"
                className="text-base font-bold text-zinc-300 hover:text-red-400 transition-colors uppercase tracking-wider py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Calendar
              </Link>
              <Link
                href="/compare"
                className="text-base font-bold text-zinc-300 hover:text-red-400 transition-colors uppercase tracking-wider py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Compare
              </Link>
              <Link href="/live" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl uppercase tracking-wider shadow-lg shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-300">
                  Live
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </nav>
  );
};

export default Navbar;