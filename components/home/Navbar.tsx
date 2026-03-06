"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/drivers", label: "Drivers" },
  { href: "/tracks", label: "Circuits" },
  { href: "/calendar", label: "Calendar" },
  { href: "/compare", label: "Compare" },
  { href: "/live", label: "Live" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

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
          }}
        />

        {/* Top red stripe */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

        <div className="relative flex items-center justify-between px-4 md:px-6 h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1">
            <span className="text-white font-black text-xl tracking-tight">
              FJuan
            </span>
            <span className="text-red-600 font-black text-xl tracking-tight">
              DASH
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors relative ${
                    isActive ? "text-white" : "text-zinc-500 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-red-600" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-opacity ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-white transition-transform ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden relative border-t border-zinc-800">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center px-6 py-3 text-sm font-bold uppercase tracking-widest border-b border-zinc-900 ${
                    isActive
                      ? "text-red-500 bg-zinc-900/50"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-900/30"
                  }`}
                >
                  {isActive && (
                    <span className="w-1 h-4 bg-red-600 mr-3 flex-shrink-0" />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </Card>
    </nav>
  );
};

export default Navbar;
