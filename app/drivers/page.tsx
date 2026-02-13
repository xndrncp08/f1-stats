"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDriverStandings } from "@/lib/hooks/useDrivers";

// Generate array of years from 1950 to current year
const currentYear = new Date().getFullYear();
const SEASONS = Array.from(
  { length: currentYear - 1950 + 1 },
  (_, i) => currentYear - i,
);

export default function DriversPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>("current");
  const { data: drivers, isLoading, error } = useDriverStandings();

  // Function to fetch standings for a specific season
  const fetchSeasonStandings = async (season: string) => {
    try {
      const response = await fetch(
        `https://api.jolpi.ca/ergast/f1/${season}/driverStandings.json`,  
        { cache: "force-cache" },
      );
      const data = await response.json();
      return (
        data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || []
      );
    } catch (error) {
      console.error(`Error fetching ${season} standings:`, error);
      return [];
    }
  };

  const [seasonDrivers, setSeasonDrivers] = useState<any[]>([]);
  const [seasonLoading, setSeasonLoading] = useState(false);
  const [displaySeason, setDisplaySeason] = useState(currentYear.toString());

  // Load drivers when season changes
  useEffect(() => {
    const loadSeasonData = async () => {
      if (selectedSeason === "current") {
        setSeasonDrivers(drivers || []);
        setDisplaySeason(currentYear.toString());
        setSeasonLoading(false);
      } else {
        setSeasonLoading(true);
        const data = await fetchSeasonStandings(selectedSeason);
        setSeasonDrivers(data);
        setDisplaySeason(selectedSeason);
        setSeasonLoading(false);
      }
    };

    loadSeasonData();
  }, [selectedSeason, drivers]);

  const isDataLoading =
    (selectedSeason === "current" && isLoading) || seasonLoading;

  return (
    <main className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-red-700 to-black border-b border-zinc-800">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20" />

        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </div>

        <div className="relative container mx-auto px-4 py-12">
          <Link href="/">
            <Button className="mb-6 bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 rounded-none font-bold px-6">
              ← BACK
            </Button>
          </Link>

          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-black text-white mb-3 tracking-tight">
              DRIVER STANDINGS
            </h1>
            <p className="text-lg text-white/70 font-medium">
              {displaySeason} Championship Positions
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Season Selector - Simplified */}
        <div className="mb-8 bg-zinc-900 border border-zinc-800 p-6">
          <h2 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">
            Select Season
          </h2>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setSelectedSeason("current")}
              className={`font-bold ${
                selectedSeason === "current"
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
              }`}
            >
              Current
            </Button>

            {[2024, 2023, 2022, 2021, 2020].map((year) => (
              <Button
                key={year}
                onClick={() => setSelectedSeason(year.toString())}
                className={`font-bold ${
                  selectedSeason === year.toString()
                    ? "bg-red-600 text-white hover:bg-red-700"
                    : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                }`}
              >
                {year}
              </Button>
            ))}

            <select
              value={selectedSeason === "current" ? "" : selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value || "current")}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 text-white font-bold focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="">More years...</option>
              {SEASONS.map((year) => (
                <option key={year} value={year.toString()}>
                  {year}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Loading State */}
        {isDataLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-zinc-500 font-bold">Loading...</p>
          </div>
        ) : seasonDrivers.length === 0 ? (
          <div className="bg-zinc-900 border border-zinc-800 p-12 text-center">
            <p className="text-zinc-400 text-lg font-bold mb-2">
              No data available for {displaySeason}
            </p>
            <p className="text-zinc-600 text-sm">
              Try selecting a different season
            </p>
          </div>
        ) : (
          <>
            {/* Top 3 Podium - Featured */}
            {seasonDrivers.length >= 3 && (
              <div className="mb-12">
                <h2 className="text-2xl font-black text-white mb-6 tracking-tight">
                  TOP 3
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {seasonDrivers.slice(0, 3).map((standing, index) => {
                    const driver = standing.Driver;
                    const team = standing.Constructors[0]?.name || "Unknown";
                    const colors = [
                      {
                        bg: "from-yellow-500/20 to-yellow-600/10",
                        border: "border-yellow-500/30",
                        text: "text-yellow-500",
                        badge: "bg-yellow-500",
                      },
                      {
                        bg: "from-gray-400/20 to-gray-500/10",
                        border: "border-gray-400/30",
                        text: "text-gray-400",
                        badge: "bg-gray-400",
                      },
                      {
                        bg: "from-orange-600/20 to-orange-700/10",
                        border: "border-orange-600/30",
                        text: "text-orange-600",
                        badge: "bg-orange-600",
                      },
                    ];
                    const color = colors[index];

                    return (
                      <Link
                        key={driver.driverId}
                        href={`/drivers/${driver.driverId}`}
                        className="block"
                      >
                        <div
                          className={`bg-gradient-to-br ${color.bg} border ${color.border} p-6 hover:scale-105 transition-transform cursor-pointer`}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div
                              className={`${color.badge} text-white font-black text-sm px-3 py-1`}
                            >
                              P{standing.position}
                            </div>
                            <div className="text-5xl font-black text-white/10">
                              {driver.permanentNumber || "?"}
                            </div>
                          </div>
                          <h3 className="text-2xl font-black text-white mb-1">
                            {driver.givenName}
                          </h3>
                          <h3 className="text-2xl font-black text-white/70 uppercase mb-3">
                            {driver.familyName}
                          </h3>
                          <p className="text-sm text-zinc-400 font-bold mb-4">
                            {team}
                          </p>
                          <div className="flex gap-4 text-center">
                            <div>
                              <div
                                className={`text-3xl font-black ${color.text}`}
                              >
                                {standing.points}
                              </div>
                              <div className="text-xs text-zinc-500 uppercase font-bold">
                                Points
                              </div>
                            </div>
                            <div>
                              <div
                                className={`text-3xl font-black ${color.text}`}
                              >
                                {standing.wins}
                              </div>
                              <div className="text-xs text-zinc-500 uppercase font-bold">
                                Wins
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Rest of the Grid */}
            <div className="mb-6">
              <h2 className="text-2xl font-black text-white mb-6 tracking-tight">
                {seasonDrivers.length > 3 ? "FULL STANDINGS" : "STANDINGS"}
              </h2>
              <div className="grid gap-4">
                {(seasonDrivers.length > 3
                  ? seasonDrivers.slice(3)
                  : seasonDrivers
                ).map((standing) => {
                  const driver = standing.Driver;
                  const team = standing.Constructors[0]?.name || "Unknown";

                  return (
                    <Link
                      key={driver.driverId}
                      href={`/drivers/${driver.driverId}`}
                      className="block"
                    >
                      <div className="bg-zinc-900 border border-zinc-800 hover:border-red-600 p-6 transition-all cursor-pointer">
                        <div className="flex items-center gap-6">
                          {/* Position */}
                          <div className="text-center min-w-[60px]">
                            <div className="text-3xl font-black text-white">
                              {standing.position}
                            </div>
                            <div className="text-xs text-zinc-600 uppercase font-bold">
                              Pos
                            </div>
                          </div>

                          {/* Driver Info */}
                          <div className="flex-1">
                            <div className="flex items-baseline gap-2 mb-1">
                              <h3 className="text-xl font-black text-white">
                                {driver.givenName} {driver.familyName}
                              </h3>
                              <span className="text-sm text-zinc-500 font-bold">
                                #{driver.permanentNumber || "—"}
                              </span>
                            </div>
                            <p className="text-sm text-zinc-500 font-bold">
                              {team}
                            </p>
                          </div>

                          {/* Stats */}
                          <div className="flex gap-8 text-center">
                            <div>
                              <div className="text-2xl font-black text-blue-400">
                                {standing.points}
                              </div>
                              <div className="text-xs text-zinc-600 uppercase font-bold">
                                PTS
                              </div>
                            </div>
                            <div>
                              <div className="text-2xl font-black text-green-400">
                                {standing.wins}
                              </div>
                              <div className="text-xs text-zinc-600 uppercase font-bold">
                                Wins
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
