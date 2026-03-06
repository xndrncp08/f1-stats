import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden hero-bg min-h-[88vh] flex items-center">
      {/* Speed lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[15, 38, 58, 72, 88].map((top, i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-px"
            style={{
              top: `${top}%`,
              background: `linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.03) 80%, transparent 100%)`,
            }}
          />
        ))}
        {/* Diagonal accent line */}
        <div
          className="absolute"
          style={{
            top: 0,
            right: "20%",
            width: "1px",
            height: "60%",
            background: "linear-gradient(180deg, rgba(225,6,0,0.4) 0%, transparent 100%)",
            transform: "skewX(-15deg)",
          }}
        />
        <div
          className="absolute"
          style={{
            top: 0,
            right: "22%",
            width: "1px",
            height: "40%",
            background: "linear-gradient(180deg, rgba(225,6,0,0.15) 0%, transparent 100%)",
            transform: "skewX(-15deg)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
        <div className="max-w-4xl">
          {/* Overline */}
          <div className="flex items-center gap-3 mb-8 animate-slide-up">
            <span className="label-overline">2026 Season</span>
            <div className="flex-1 h-px bg-white/10 max-w-[80px]" />
            <span className="data-readout">Formula 1</span>
          </div>

          {/* Main heading */}
          <h1
            className="font-display font-black text-white leading-none mb-6 animate-slide-up delay-100"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(5rem, 14vw, 10rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.92,
            }}
          >
            FJUAN<span style={{ color: "#E10600" }}>DASH</span>
          </h1>

          {/* Subtitle */}
          <p
            className="text-white/55 mb-10 animate-slide-up delay-200 max-w-xl"
            style={{ fontWeight: 400, fontSize: "1.0625rem", lineHeight: 1.6 }}
          >
            Real-time analytics, live telemetry, and comprehensive race statistics
            for the ultimate Formula 1 experience.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-20 animate-slide-up delay-300">
            <Link href="/drivers">
              <button className="btn-primary">Driver Standings</button>
            </Link>
            <Link href="/live">
              <button className="btn-ghost flex items-center gap-2">
                <span className="live-dot" />
                Live Telemetry
              </button>
            </Link>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-3 gap-0 border border-white/[0.07] max-w-lg animate-slide-up delay-400"
            style={{ borderRight: "none" }}
          >
            {[
              { value: "20+", label: "Drivers" },
              { value: "24", label: "Races" },
              { value: "10", label: "Teams" },
            ].map((stat, i) => (
              <div
                key={i}
                className="px-6 py-5 border-r border-white/[0.07]"
                style={{ borderRight: "1px solid rgba(255,255,255,0.07)" }}
              >
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to bottom, transparent, #080808)" }}
      />
    </section>
  );
}
