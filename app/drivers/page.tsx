'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, ArrowLeft, Calendar, Loader2 } from "lucide-react";
import { useDriverStandings } from "@/lib/hooks/useDrivers";

// Generate array of years from 1950 to current year
const currentYear = new Date().getFullYear();
const SEASONS = Array.from({ length: currentYear - 1950 + 1 }, (_, i) => currentYear - i);

export default function DriversPage() {
  const [selectedSeason, setSelectedSeason] = useState<string>('current');
  const { data: drivers, isLoading, error } = useDriverStandings();

  // Function to fetch standings for a specific season
  const fetchSeasonStandings = async (season: string) => {
    try {
      const response = await fetch(
        `https://api.jolpi.ca/ergast/f1/${season}/driverStandings.json`,
        { cache: 'force-cache' }
      );
      const data = await response.json();
      return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
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
      if (selectedSeason === 'current') {
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

  const isDataLoading = (selectedSeason === 'current' && isLoading) || seasonLoading;

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
            {displaySeason} Driver Standings
          </h1>
          <p className="text-zinc-400">
            Championship positions and statistics
          </p>
        </div>

        {/* Season Selector */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Select Season
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setSelectedSeason('current')}
                variant={selectedSeason === 'current' ? 'default' : 'outline'}
                className={
                  selectedSeason === 'current'
                    ? 'bg-f1-red hover:bg-f1-red/90'
                    : 'border-zinc-700 text-zinc-300 hover:bg-zinc-800'
                }
              >
                Current Season
              </Button>
              
              <select
                value={selectedSeason === 'current' ? '' : selectedSeason}
                onChange={(e) => setSelectedSeason(e.target.value || 'current')}
                className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-f1-red focus:border-transparent"
              >
                <option value="">Select a year...</option>
                {SEASONS.map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>

              {/* Quick access to recent seasons */}
              <div className="flex gap-2 ml-auto">
                <span className="text-zinc-500 text-sm self-center mr-2">Quick:</span>
                {[2023, 2022, 2021, 2020].map((year) => (
                  <Button
                    key={year}
                    onClick={() => setSelectedSeason(year.toString())}
                    variant="outline"
                    size="sm"
                    className={
                      selectedSeason === year.toString()
                        ? 'bg-f1-neon-blue text-white border-f1-neon-blue'
                        : 'border-zinc-700 text-zinc-400 hover:bg-zinc-800'
                    }
                  >
                    {year}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Loading State */}
        {isDataLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-f1-neon-blue animate-spin" />
          </div>
        ) : seasonDrivers.length === 0 ? (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="py-12 text-center">
              <p className="text-zinc-400 text-lg mb-2">
                No driver standings available for {displaySeason}.
              </p>
              <p className="text-zinc-500 text-sm">
                Try selecting a different season.
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-f1-neon-blue">
                      {seasonDrivers.length}
                    </div>
                    <div className="text-sm text-zinc-400 mt-1">Total Drivers</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-500">
                      {seasonDrivers[0]?.Driver?.familyName || '—'}
                    </div>
                    <div className="text-sm text-zinc-400 mt-1">Champion</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-f1-neon-green">
                      {seasonDrivers[0]?.wins || 0}
                    </div>
                    <div className="text-sm text-zinc-400 mt-1">Most Wins</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-500">
                      {seasonDrivers[0]?.points || 0}
                    </div>
                    <div className="text-sm text-zinc-400 mt-1">Top Points</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Driver Cards Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seasonDrivers.map((standing, index) => {
                const driver = standing.Driver;
                const team = standing.Constructors[0]?.name || "Unknown";

                return (
                  <Link
                    key={driver.driverId}
                    href={`/drivers/${driver.driverId}`}
                    className="block transition-transform hover:scale-105"
                  >
                    <Card className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all h-full">
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
                            <div className="text-xs text-zinc-500 mt-1">
                              Points
                            </div>
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
                  </Link>
                );
              })}
            </div>
          </>
        )}
      </div>
    </main>
  );
}