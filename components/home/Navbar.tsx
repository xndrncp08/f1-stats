"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/drivers", label: "Drivers" },
    { href: "/calendar", label: "Calendar" },
    { href: "/compare", label: "Compare" },
  ];

  return (
    <nav
      className={`w-full sticky top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "carbon-bg border-b border-white/[0.07] shadow-[0_4px_24px_rgba(0,0,0,0.5)]"
          : "bg-transparent"
      }`}
    >
      {/* Top red rule */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E10600]" />

      <div className="max-w-7xl mx-auto px-6 h-[60px] flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-0 group">
          <span
            className="font-display font-black text-[1.4rem] tracking-tighter text-white leading-none select-none"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "-0.01em" }}
          >
            F1<span style={{ color: "#E10600" }}>DASH</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative px-4 py-2 text-[0.75rem] font-display font-700 tracking-[0.12em] uppercase transition-colors duration-150 ${
                  active ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
              >
                {active && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#E10600]" />
                )}
                {link.label}
              </Link>
            );
          })}

          <div className="w-px h-5 bg-white/10 mx-3" />

          <Link href="/live">
            <button className="btn-primary flex items-center gap-2">
              <span className="live-dot" />
              Live
            </button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-[1.5px] bg-white transition-transform duration-200 ${isMobileMenuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-white transition-opacity duration-200 ${isMobileMenuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-white transition-transform duration-200 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden carbon-bg border-t border-white/[0.07] animate-fade-in">
          <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-0 py-3 text-[0.8125rem] font-display font-700 tracking-[0.12em] uppercase text-white/60 hover:text-white border-b border-white/[0.05] last:border-0 transition-colors"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700 }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link href="/live" className="mt-3" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="btn-primary w-full justify-center gap-2">
                <span className="live-dot" />
                Live Telemetry
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
