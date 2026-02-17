import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RaceGridProps {
  races: any[];
  season: string;
  currentYear: number;
}

export default function RaceGrid({ races, season, currentYear }: RaceGridProps) {
  const now = new Date();

  if (races.length === 0) {
    return (
      <Card className="bg-zinc-900 border-zinc-800 rounded-none">
        <CardContent className="py-20 text-center">
          <p className="text-zinc-400 text-xl font-bold uppercase tracking-wider">
            No races scheduled for {season}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {races.map((race: any, index: number) => {
        const raceDate = new Date(race.date);
        const isUpcoming = raceDate > now && season === currentYear.toString();
        const isPast = raceDate < now || season !== currentYear.toString();

        const daysUntil = Math.ceil(
          (raceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        );

        return (
          <Card
            key={index}
            className={`bg-zinc-900 border-zinc-800 rounded-none overflow-hidden transition-all duration-300 hover:border-red-600 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-red-600/20 ${
              isPast ? "opacity-75" : ""
            }`}
          >
            <div
              className={`h-1 ${isUpcoming ? "bg-red-600" : "bg-zinc-700"}`}
            />
            <CardHeader className="pb-4 relative">
              <div className="absolute top-4 right-4 text-6xl font-black text-white/5 leading-none">
                {race.round}
              </div>
              <div className="relative">
                <div
                  className={`inline-block px-3 py-1 mb-3 ${
                    isUpcoming
                      ? "bg-red-600/20 border border-red-600/30"
                      : "bg-zinc-800 border border-zinc-700"
                  }`}
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-wider ${
                      isUpcoming ? "text-red-400" : "text-zinc-500"
                    }`}
                  >
                    Round {race.round}
                  </span>
                </div>
                <CardTitle className="text-xl font-black text-white tracking-tight leading-tight">
                  {race.raceName}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 border-t border-zinc-800 pt-4">
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">
                    Location
                  </div>
                  <div className="text-white font-bold">
                    {race.Circuit.Location.locality}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {race.Circuit.Location.country}
                  </div>
                </div>
                <div>
                  <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-1">
                    Race Date
                  </div>
                  <div className="text-white font-bold">
                    {raceDate.toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {raceDate.toLocaleDateString("en-US", {
                      year: "numeric",
                    })}
                  </div>
                </div>
                {isUpcoming && daysUntil > 0 && (
                  <div className="bg-red-600/10 border border-red-600/20 p-3 rounded-sm">
                    <div className="text-red-400 font-black text-lg">
                      {daysUntil === 1 ? "TOMORROW!" : `${daysUntil} DAYS`}
                    </div>
                    <div className="text-xs text-red-400/70 uppercase tracking-wider">
                      To Go
                    </div>
                  </div>
                )}
                {isPast && (
                  <div className="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-sm">
                    <div className="text-zinc-500 font-bold text-sm uppercase tracking-wider">
                      Race Completed
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}