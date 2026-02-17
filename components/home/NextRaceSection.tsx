import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface NextRaceSectionProps {
  nextRace: any;
}

export default function NextRaceSection({ nextRace }: NextRaceSectionProps) {
  return (
    <section className="px-4 py-16 -mt-12 relative z-10">
      <Card className="bg-gradient-to-br from-zinc-900/95 via-zinc-900/90 to-zinc-800/95 backdrop-blur-xl border-zinc-700/50 overflow-hidden shadow-2xl rounded-2xl group hover:shadow-red-900/20 transition-all duration-500">
        {/* Animated background gradients */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all duration-700" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl group-hover:bg-red-600/20 transition-all duration-700" />

        {/* Accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 animate-pulse" />

        <CardHeader className="border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur pb-6 pt-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="h-14 w-1.5 bg-gradient-to-b from-red-600 to-red-500 rounded-full" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-red-500 uppercase tracking-wider">
                    Next Event
                  </span>
                </div>
                <CardTitle className="text-3xl md:text-4xl font-black bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                  Upcoming Race
                </CardTitle>
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8 lg:p-10 relative">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <div className="md:col-span-2 space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-600/20 border border-red-600/30 rounded-lg mb-4 backdrop-blur-sm">
                  <span className="text-sm font-black text-red-400 uppercase tracking-wider">
                    Round {nextRace?.round || "-"}
                  </span>
                </div>
                <h3 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tight leading-tight">
                  {nextRace?.raceName || "Season Concluded"}
                </h3>
                <div className="flex items-center gap-3 text-zinc-400 text-lg">
                  <p className="font-semibold">
                    {nextRace?.Circuit?.Location?.locality},{" "}
                    {nextRace?.Circuit?.Location?.country}
                  </p>
                </div>
              </div>

              {/* Circuit info */}
              <div className="bg-zinc-800/30 backdrop-blur-sm rounded-xl p-6 border border-zinc-700/30">
                <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2">
                  Circuit
                </div>
                <div className="text-white font-bold text-lg">
                  {nextRace?.Circuit?.circuitName || "TBD"}
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6">
              {/* Date card */}
              <div className="bg-gradient-to-br from-zinc-800/60 to-zinc-800/40 backdrop-blur-md rounded-xl p-6 border border-zinc-700/40 hover:border-red-600/40 transition-all duration-300 group/date">
                <div className="flex items-center gap-2 text-sm text-zinc-500 mb-3 uppercase tracking-wider font-bold">
                  Race Date
                </div>
                <p className="text-3xl font-black text-white mb-2 group-hover/date:text-red-400 transition-colors">
                  {nextRace
                    ? new Date(nextRace.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })
                    : "TBD"}
                </p>
                <p className="text-lg text-zinc-400 font-semibold">
                  {nextRace
                    ? new Date(nextRace.date).toLocaleDateString("en-US", {
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>

              {/* CTA Button */}
              <Link href="/calendar" className="group/btn">
                <Button className="w-full bg-gradient-to-br from-red-900/20 to-red-950/10 backdrop-blur-xl border border-red-700/30 hover:border-red-600/50 text-white font-bold py-6 rounded-xl shadow-[0_8px_32px_0_rgba(127,29,29,0.2)] hover:shadow-[0_8px_32px_0_rgba(127,29,29,0.4)] transition-all duration-300 hover:scale-[1.02] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-0 hover:before:opacity-100 before:transition-opacity">
                  <span className="relative z-10">Full Calendar</span>
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
