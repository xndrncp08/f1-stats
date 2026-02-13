import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface TopDriversSectionProps {
  topDrivers: any[];
}

export default function TopDriversSection({ topDrivers }: TopDriversSectionProps) {
  if (!topDrivers || topDrivers.length === 0) return null;

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="flex items-center justify-between mb-10">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-1 bg-red-600" />
            <span className="text-sm font-bold text-red-500 uppercase tracking-wider">
              Championship
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Leaders
          </h2>
        </div>
        <Link href="/drivers">
          <Button
            variant="outline"
            className="border-zinc-700 text-white hover:bg-zinc-800 rounded-none group"
          >
            View All Drivers
            <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {topDrivers.map((standing: any, index: number) => (
          <div key={standing.Driver.driverId} className="relative group">
            {/* Position badge */}
            <div
              className={`absolute -top-4 -left-4 z-20 h-16 w-16 flex items-center justify-center font-black text-2xl rounded-full border-4 ${
                index === 0
                  ? "bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-300 text-black shadow-2xl shadow-yellow-500/50"
                  : index === 1
                    ? "bg-gradient-to-br from-gray-300 to-gray-500 border-gray-200 text-black shadow-xl shadow-gray-400/30"
                    : "bg-gradient-to-br from-amber-700 to-amber-900 border-amber-600 text-white shadow-xl shadow-amber-700/30"
              }`}
            >
              {standing.position}
            </div>

            <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-all duration-300 cursor-pointer group-hover:translate-y-[-4px] group-hover:shadow-2xl group-hover:shadow-red-600/20 rounded-none overflow-hidden">
              {/* Accent top border */}
              <div
                className={`h-1 ${index === 0 ? "bg-yellow-400" : index === 1 ? "bg-gray-400" : "bg-amber-700"}`}
              />

              <CardHeader className="pb-4 pt-8">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-7xl font-black text-white/5 leading-none">
                      {standing.Driver.permanentNumber}
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-black text-white mb-1 tracking-tight">
                        {standing.Driver.givenName}
                      </CardTitle>
                      <CardTitle className="text-2xl font-black text-white/70 tracking-tight uppercase">
                        {standing.Driver.familyName}
                      </CardTitle>
                      <p className="text-zinc-500 mt-2 text-sm font-semibold uppercase tracking-wider">
                        {standing.Driver.nationality}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6 pb-4 border-b border-zinc-800">
                  <div className="text-base font-bold text-zinc-400 uppercase tracking-wider">
                    {standing.Constructors[0]?.name}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 border border-blue-700/30 rounded-sm p-4 text-center">
                    <div className="text-3xl font-black text-blue-400 mb-1">
                      {standing.points}
                    </div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">
                      Points
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 border border-green-700/30 rounded-sm p-4 text-center">
                    <div className="text-3xl font-black text-green-400 mb-1">
                      {standing.wins}
                    </div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">
                      Wins
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-700/30 rounded-sm p-4 text-center">
                    <div className="text-3xl font-black text-purple-400 mb-1">
                      -
                    </div>
                    <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">
                      Podiums
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
}