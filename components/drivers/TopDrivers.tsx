import Link from "next/link";
import { Button } from "@/components/ui/button";

interface TopDriversSectionProps {
  topDrivers: any[];
}

export default function TopDriversSection({
  topDrivers,
}: TopDriversSectionProps) {
  if (!topDrivers || topDrivers.length === 0) return null;

  const getPodiumGradient = (index: number) => {
    if (index === 0) return "from-yellow-400 via-yellow-500 to-yellow-600";
    if (index === 1) return "from-gray-300 via-gray-400 to-gray-500";
    return "from-amber-600 via-amber-700 to-amber-800";
  };

  const getPodiumShadow = (index: number) => {
    if (index === 0) return "shadow-yellow-500/50";
    if (index === 1) return "shadow-gray-400/30";
    return "shadow-amber-700/30";
  };

  return (
    <section className="px-4 py-16">
      <div className="mb-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-14 w-1.5 bg-gradient-to-b from-red-600 to-red-500 rounded-full" />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                  Championship
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                Current Leaders
              </h2>
            </div>
          </div>
          <Link href="/drivers">
            <Button className="hidden md:flex bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 px-6 rounded-xl shadow-lg shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-300 hover:scale-[1.02] group/btn backdrop-opacity-10">
              <span>View All Drivers</span>
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {topDrivers.map((standing: any, index: number) => (
          <div key={standing.Driver.driverId} className="relative group/driver">
            <div className="bg-zinc-800/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-700/30 hover:border-red-600/40 transition-all duration-300 group-hover/driver:translate-y-[-4px] h-full">
              {/* Accent top border */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                  index === 0
                    ? getPodiumGradient(0)
                    : index === 1
                      ? getPodiumGradient(1)
                      : getPodiumGradient(2)
                } rounded-t-xl`}
              />

              {/* Driver number watermark */}
              <div className="text-8xl font-black text-white/5 leading-none absolute top-4 right-4">
                {standing.Driver.permanentNumber}
              </div>

              <div className="relative z-10 pt-6">
                {/* Driver name */}
                <div className="mb-6">
                  <div className="text-xl font-black text-white mb-1 tracking-tight">
                    {standing.Driver.givenName}
                  </div>
                  <div className="text-3xl font-black bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent tracking-tight uppercase">
                    {standing.Driver.familyName}
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <div className="h-1 w-8 bg-red-600 rounded-full" />
                    <p className="text-zinc-500 text-sm font-semibold uppercase tracking-wider">
                      {standing.Driver.nationality}
                    </p>
                  </div>
                </div>

                {/* Team */}
                <div className="bg-zinc-800/30 backdrop-blur-sm rounded-xl p-4 border border-zinc-700/30 mb-6">
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2">
                    Team
                  </div>
                  <div className="text-white font-bold text-base">
                    {standing.Constructors[0]?.name}
                  </div>
                </div>

                {/* Stats grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-red-600/20 to-red-900/20 border border-red-700/30 rounded-xl p-4 text-center hover:from-red-600/30 hover:to-red-900/30 transition-all duration-300">
                    <div className="text-2xl font-black text-red-400 mb-1">
                      {standing.points}
                    </div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">
                      Points
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-600/20 to-red-900/20 border border-red-700/30 rounded-xl p-4 text-center hover:from-red-600/30 hover:to-red-900/30 transition-all duration-300">
                    <div className="text-2xl font-black text-red-400 mb-1">
                      {standing.wins}
                    </div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">
                      Wins
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-red-600/20 to-red-900/20 border border-red-700/30 rounded-xl p-4 text-center hover:from-red-600/30 hover:to-red-900/30 transition-all duration-300">
                    <div className="text-2xl font-black text-red-400 mb-1">
                      {index + 1}
                    </div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">
                      Rank
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile CTA Button */}
      <Link href="/drivers" className="md:hidden mt-8 block">
        <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 rounded-xl shadow-lg shadow-red-900/30 hover:shadow-red-900/50 transition-all duration-300 hover:scale-[1.02] group/btn">
          <span>View All Drivers</span>
        </Button>
      </Link>
    </section>
  );
}
