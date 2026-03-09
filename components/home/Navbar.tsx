"use client";

import Link from "next/link";
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
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="w-full sticky top-0 z-50">
      {/* Red top stripe */}
      <div style={{ height: "2px", background: "#E10600", width: "100%" }} />

      <div
        style={{
          background: isScrolled
            ? "rgba(8,8,8,0.97)"
            : "rgba(10,10,10,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          transition: "background 0.3s ease",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between h-14">

          {/* Logo — pure type */}
          <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "baseline", gap: "0" }}>
            <span
              style={{
                fontFamily: "'Russo One', sans-serif",
                fontSize: "1.3rem",
                color: "white",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              FJ
            </span>
            <span
              style={{
                fontFamily: "'Russo One', sans-serif",
                fontSize: "1.3rem",
                color: "#E10600",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              U
            </span>
            <span
              style={{
                fontFamily: "'Russo One', sans-serif",
                fontSize: "1.3rem",
                color: "white",
                letterSpacing: "-0.01em",
                lineHeight: 1,
              }}
            >
              AN
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-0">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.75rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: isActive ? "white" : "rgba(255,255,255,0.4)",
                    padding: "0 14px",
                    height: "56px",
                    display: "flex",
                    alignItems: "center",
                    position: "relative",
                    textDecoration: "none",
                    transition: "color 0.15s ease",
                    borderBottom: isActive ? "2px solid #E10600" : "2px solid transparent",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <span style={{
              display: "block", height: "2px", width: "22px", background: "white",
              transition: "transform 0.2s ease",
              transform: isMobileMenuOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
            }} />
            <span style={{
              display: "block", height: "2px", width: "22px", background: "white",
              transition: "opacity 0.2s ease",
              opacity: isMobileMenuOpen ? 0 : 1,
            }} />
            <span style={{
              display: "block", height: "2px", width: "22px", background: "white",
              transition: "transform 0.2s ease",
              transform: isMobileMenuOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
            }} />
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
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
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "14px 24px",
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: isActive ? "white" : "rgba(255,255,255,0.4)",
                    textDecoration: "none",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    background: isActive ? "rgba(225,6,0,0.06)" : "transparent",
                  }}
                >
                  {isActive && (
                    <span style={{ width: "3px", height: "16px", background: "#E10600", flexShrink: 0 }} />
                  )}
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;