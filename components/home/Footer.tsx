import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="relative border-t border-white/[0.06] mt-8">
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#E10600]" />

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-[1fr_auto_auto] gap-10 items-start">
          {/* Brand */}
          <div>
            <span
              className="font-display font-black text-white text-xl leading-none select-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 900, letterSpacing: "-0.01em" }}
            >
              FJUAN<span style={{ color: "#E10600" }}>DASH</span>
            </span>
            <p className="text-white/35 text-[0.8125rem] mt-3 max-w-[220px] leading-relaxed">
              Comprehensive Formula 1 statistics and analytics platform.
            </p>
            <p className="text-white/20 text-xs mt-3">Built by Xander Ranc</p>
          </div>

          {/* Nav */}
          <div>
            <div className="label-overline mb-4">Navigate</div>
            <div className="flex flex-col gap-2">
              {[
                { href: "/drivers", label: "Drivers" },
                { href: "/calendar", label: "Calendar" },
                { href: "/compare", label: "Compare" },
                { href: "/live", label: "Live" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/40 hover:text-white/70 transition-colors text-sm"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase" }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Data */}
          <div>
            <div className="label-overline mb-4">Data Sources</div>
            <div className="flex flex-col gap-2">
              {["Jolpica API", "OpenF1 API", "RSS News"].map((src) => (
                <span key={src} className="data-readout">{src}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/[0.05] flex items-center justify-between">
          <span className="data-readout">© 2026 FJUANDASH</span>
          <span className="data-readout">Not affiliated with Formula 1 or FIA</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
