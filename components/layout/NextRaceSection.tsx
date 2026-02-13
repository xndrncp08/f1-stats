import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface NextRaceSectionProps {
  nextRace: any;
}

export default function NextRaceSection({ nextRace }: NextRaceSectionProps) {
  return (
    <section className="container mx-auto px-4 py-16 -mt-12 relative z-10">
      <Card className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 border-zinc-700/50 overflow-hidden shadow-2xl rounded-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />

        <CardHeader className="border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-3 text-3xl font-bold">
              <div className="h-12 w-1 bg-red-600" />
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                Next Race
              </span>
            </CardTitle>
          </div>
        </CardHeader>

        <CardContent className="p-8 relative">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="mb-2">
                <span className="inline-block px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase tracking-wider rounded-sm">
                  Round {nextRace?.round || "-"}
                </span>
              </div>
              <h3 className="text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight">
                {nextRace?.raceName || "Season Concluded"}
              </h3>
              <div className="flex items-center gap-2 text-zinc-400 text-lg">
                <p>
                  {nextRace?.Circuit?.Location?.locality},{" "}
                  {nextRace?.Circuit?.Location?.country}
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <div className="bg-zinc-800/50 backdrop-blur rounded-sm p-6 border border-zinc-700/50">
                <p className="text-sm text-zinc-500 mb-2 uppercase tracking-wider font-semibold">
                  Race Date
                </p>
                <p className="text-2xl font-bold text-white">
                  {nextRace
                    ? new Date(nextRace.date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })
                    : "TBD"}
                </p>
                <p className="text-lg text-zinc-400 mt-1">
                  {nextRace
                    ? new Date(nextRace.date).toLocaleDateString("en-US", {
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>

              <Link href="/calendar" className="mt-4">
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold rounded-none group">
                  Full Calendar
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
