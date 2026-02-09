import Link from "next/link";
import "@/app/calendar/page"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Calendar, TrendingUp, Zap, ChevronRight, Flag, Timer } from "lucide-react";

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

async function getNextRace() {
  try {
    const response = await fetch(
      "https://api.jolpi.ca/ergast/f1/current.json",
      {
        next: { revalidate: 3600 },
      },
    );
    const data = await response.json();
    const races = data.MRData.RaceTable.Races;
    const now = new Date();
    const upcoming = races.find((race: any) => new Date(race.date) > now);
    return upcoming || races[races.length - 1];
  } catch (error) {
    console.error("Error fetching races:", error);
    return null;
  }
}

export default async function Home() {
  // Fetch data from Jolpica F1 API
  const [standings, nextRace] = await Promise.all([
    getCurrentStandings(),
    getNextRace(),
  ]);

  const topDrivers = standings.slice(0, 3);

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-black">
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
              <span className="text-sm font-semibold text-white tracking-wider uppercase">2026 Season</span>
            </div>

            {/* Main heading */}
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter">
              F1<span className="text-red-400">DASH</span>
            </h1>
            


            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/drivers">
                <Button size="lg" className="bg-white text-black hover:bg-white/90 text-base font-bold px-8 py-6 rounded-none group">
                  Driver Standings
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/live">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-black text-base font-bold px-8 py-6 rounded-none group">
                  Live Telemetry
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom angle cut */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 120L1440 120L1440 0L0 60L0 120Z" fill="#000000"/>
          </svg>
        </div>
      </section>

      {/* Next Race Section */}
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
              <Timer className="h-8 w-8 text-red-500" />
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
                  <Flag className="h-5 w-5" />
                  <p>
                    {nextRace?.Circuit?.Location?.locality},{" "}
                    {nextRace?.Circuit?.Location?.country}
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col justify-between">
                <div className="bg-zinc-800/50 backdrop-blur rounded-sm p-6 border border-zinc-700/50">
                  <p className="text-sm text-zinc-500 mb-2 uppercase tracking-wider font-semibold">Race Date</p>
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

      {/* Top 3 Drivers */}
      <section className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="h-8 w-1 bg-red-600" />
              <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Championship</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
              Leaders
            </h2>
          </div>
          <Link href="/drivers">
            <Button variant="outline" className="border-zinc-700 text-white hover:bg-zinc-800 rounded-none group">
              View All Drivers
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {topDrivers.map((standing: any, index: number) => (
            <div key={standing.Driver.driverId} className="relative group">
              {/* Position badge */}
              <div className={`absolute -top-4 -left-4 z-20 h-16 w-16 flex items-center justify-center font-black text-2xl rounded-full border-4 ${
                index === 0 
                  ? 'bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-300 text-black shadow-2xl shadow-yellow-500/50' 
                  : index === 1
                  ? 'bg-gradient-to-br from-gray-300 to-gray-500 border-gray-200 text-black shadow-xl shadow-gray-400/30'
                  : 'bg-gradient-to-br from-amber-700 to-amber-900 border-amber-600 text-white shadow-xl shadow-amber-700/30'
              }`}>
                {standing.position}
              </div>

              <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-all duration-300 cursor-pointer group-hover:translate-y-[-4px] group-hover:shadow-2xl group-hover:shadow-red-600/20 rounded-none overflow-hidden">
                {/* Accent top border */}
                <div className={`h-1 ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'}`} />
                
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
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Points</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 border border-green-700/30 rounded-sm p-4 text-center">
                      <div className="text-3xl font-black text-green-400 mb-1">
                        {standing.wins}
                      </div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Wins</div>
                    </div>
                    
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 border border-purple-700/30 rounded-sm p-4 text-center">
                      <div className="text-3xl font-black text-purple-400 mb-1">
                        -
                      </div>
                      <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold">Podiums</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16 pb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-3">
            <div className="h-6 w-1 bg-red-600" />
            <span className="text-sm font-bold text-red-500 uppercase tracking-wider">Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Explore the Platform
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link href="/drivers">
            <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-red-600/20 cursor-pointer group rounded-none overflow-hidden h-full">
              <div className="h-1 bg-red-600" />
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">Driver Profiles</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 leading-relaxed">
                  Detailed statistics, career highlights, and performance metrics
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/live">
            <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-red-600/20 cursor-pointer group rounded-none overflow-hidden h-full">
              <div className="h-1 bg-red-600" />
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">Live Telemetry</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 leading-relaxed">
                  Real-time speed, RPM, and gear data during race sessions
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/compare">
            <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-red-600/20 cursor-pointer group rounded-none overflow-hidden h-full">
              <div className="h-1 bg-red-600" />
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">Compare Drivers</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 leading-relaxed">
                  Head-to-head statistics and performance comparisons
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/calendar">
            <Card className="bg-zinc-900 border-zinc-800 hover:border-red-600 transition-all duration-300 hover:translate-y-[-4px] hover:shadow-xl hover:shadow-red-600/20 cursor-pointer group rounded-none overflow-hidden h-full">
              <div className="h-1 bg-red-600" />
              <CardHeader className="pb-3">
                <CardTitle className="text-xl font-bold">Race Calendar</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-zinc-400 leading-relaxed">
                  Complete schedule with timezone conversion and countdowns
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 bg-zinc-950">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-black text-white mb-2">F1<span className="text-red-600">DASH</span></h3>
              <p className="text-zinc-500 text-sm">Built for you. UwU</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}