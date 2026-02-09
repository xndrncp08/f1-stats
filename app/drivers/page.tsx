import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft } from "lucide-react";

async function getCurrentStandings() {
  try {
    const response = await fetch(
      "https://api.jolpi.ca/ergast/f1/current/driverStandings.json",
      {
        next: { revalidate: 3600 },
      },
    );
    const data = await response.json();
    return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
  } catch (error) {
    console.error("Error fetching standings:", error);
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

export default async function DriversPage() {
  const [drivers, season] = await Promise.all([
    getCurrentStandings(),
    getCurrentSeason(),
  ]);

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
            <Trophy className="h-10 w-10 text-f1-red" />
            {season} Driver Standings
          </h1>
          <p className="text-zinc-400">
            Current championship positions and statistics
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drivers.map((standing: any, index: number) => {
            const driver = standing.Driver;
            const team = standing.Constructors[0]?.name || "Unknown";

            return (
              <Card
                key={driver.driverId}
                className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all hover:scale-105"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-5xl font-bold text-white/10 leading-none">
                        {driver.permanentNumber || "?"}
                      </div>
                      <div>
                        <CardTitle className="text-xl font-bold text-white">
                          {driver.givenName} {driver.familyName}
                        </CardTitle>
                        <p className="text-zinc-400 text-sm mt-1">
                          {driver.nationality}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-2xl font-bold ${
                          index === 0
                            ? "text-yellow-500"
                            : index === 1
                              ? "text-zinc-400"
                              : index === 2
                                ? "text-orange-600"
                                : "text-white"
                        }`}
                      >
                        P{standing.position}
                      </div>
                      <div className="text-xs text-zinc-500">Position</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="text-sm font-medium text-zinc-300">
                      {team}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-f1-neon-blue">
                        {standing.points}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">Points</div>
                    </div>
                    <div className="bg-zinc-800/50 rounded-lg p-3">
                      <div className="text-2xl font-bold text-f1-neon-green">
                        {standing.wins}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">Wins</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}
