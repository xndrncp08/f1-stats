import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";

async function getRaceCalendar() {
  try {
    const response = await fetch(
      "https://api.jolpi.ca/ergast/f1/current.json",  
      {
        next: { revalidate: 3600 },
      },
    );
    const data = await response.json();
    return data.MRData.RaceTable.Races || [];
  } catch (error) {
    console.error("Error fetching calendar:", error);
    return [];
  }
}

async function getCurrentSeason() {
  try {
    const response = await fetch("https://api.jolpi.ca/ergast/f1/current.json");
    const data = await response.json();
    return data.MRData.RaceTable.season;
  } catch (error) {
    return new Date().getFullYear();
  } 
}

export default async function CalendarPage() {
  const [races, season] = await Promise.all([
    getRaceCalendar(),
    getCurrentSeason(),
  ]);

  const now = new Date();

  return (
    <main className="min-h-screen bg-gradient-to-b from-f1-carbon to-f1-dark">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            {/* <Calendar className="h-10 w-10 text-amber-500" /> */}
            {season} Race Calendar
          </h1>
          <p className="text-zinc-400">Complete Formula 1 season schedule</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {races.map((race: any, index: number) => {
            const raceDate = new Date(race.date);
            const isUpcoming = raceDate > now;
            const daysUntil = Math.ceil(
              (raceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
            );

            return (
              <Card
                key={index}
                className={`bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all ${
                  isUpcoming ? "hover:scale-105" : "opacity-75"
                }`}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`text-xs px-2 py-1 rounded-full ${
                            isUpcoming
                              ? "bg-f1-neon-green/20 text-f1-neon-green"
                              : "bg-zinc-700 text-zinc-300"
                          }`}
                        >
                          {isUpcoming ? "Upcoming" : "Completed"}
                        </div>
                      </div>
                      <CardTitle className="text-xl text-white">
                        {race.raceName}
                      </CardTitle>
                    </div>
                    <div className="text-3xl font-bold text-white/10">
                      R{race.round}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-zinc-400">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {race.Circuit.Location.locality},{" "}
                        {race.Circuit.Location.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {raceDate.toLocaleDateString("en-US", {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    {isUpcoming && daysUntil > 0 && (
                      <div className="pt-3 border-t border-zinc-800">
                        <p className="text-sm text-f1-neon-blue">
                          {daysUntil === 1
                            ? "Tomorrow!"
                            : `${daysUntil} days to go`}
                        </p>
                      </div>
                    )}
                    {!isUpcoming && (
                      <div className="pt-3 border-t border-zinc-800">
                        <p className="text-sm text-zinc-500">Race completed</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {races.length === 0 && (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="py-12 text-center">
              <Calendar className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400">No races scheduled</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
