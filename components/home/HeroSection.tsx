import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-black w-full">
      {/* Pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />

      {/* Animated speed lines */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 py-24 lg:py-32">
        <div className="text-center max-w-5xl mx-auto">
          {/* Overline */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
            <span className="text-sm font-semibold text-white tracking-wider uppercase">
              2026 Season
            </span>
          </div>

          {/* Main heading */}
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter">
            F1<span className="text-red-400">DASH</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/80 font-medium mb-10 max-w-2xl mx-auto leading-relaxed">
            Real-time analytics, live telemetry, and comprehensive statistics
            for the ultimate F1 experience
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link href="/drivers">
                <Button
                  size="lg"
                  className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-black rounded-none backdrop-blur-md hover:border-white"
                >
                  Driver Standings
                </Button>
              </Link>
              <Link href="/live">
                <Button
                  size="lg"
                  className="bg-white/10 border-2 border-white/30 text-white hover:bg-white hover:text-black rounded-none backdrop-blur-md hover:border-white"
                >
                  Live Telemetry
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-black text-white mb-2">20+</div>
              <div className="text-xs text-white/70 uppercase tracking-wider font-bold">
                Drivers
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-black text-white mb-2">24</div>
              <div className="text-xs text-white/70 uppercase tracking-wider font-bold">
                Races
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-all duration-300">
              <div className="text-4xl font-black text-white mb-2">10</div>
              <div className="text-xs text-white/70 uppercase tracking-wider font-bold">
                Teams
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom angle cut */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
        >
          <path d="M0 120L1440 120L1440 0L0 60L0 120Z" fill="#000000" />
        </svg>
      </div>
    </section>
  );
}
