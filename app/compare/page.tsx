"use client";

import { useState } from "react";
import CompareHero from "@/components/compare/CompareHero";
import DriverSelector from "@/components/compare/DriverSelector";
import DriverProfileCard from "@/components/compare/DriverProfileCard";
import StatComparison from "@/components/compare/StatComparison";
import AdditionalStats from "@/components/compare/AdditionalStats";
import { Card, CardContent } from "@/components/ui/card";
import {
  useDrivers,
  useDriverStats,
  useDriverStandings,
} from "@/lib/hooks/useDrivers";
import { DriverStats } from "@/lib/types/driver";

export default function ComparePage() {
  const [driver1Id, setDriver1Id] = useState<string>("max_verstappen");
  const [driver2Id, setDriver2Id] = useState<string>("hamilton");

  const { data: allDrivers, isLoading: driversLoading } = useDrivers();
  const { data: driver1Stats, isLoading: driver1Loading } =
    useDriverStats(driver1Id);
  const { data: driver2Stats, isLoading: driver2Loading } =
    useDriverStats(driver2Id);
  const { data: currentStandings } = useDriverStandings();

  const isLoading = driversLoading || driver1Loading || driver2Loading;

  // Helper function to get the most recent team from standings or seasonResults
  const getMostRecentTeam = (driverStats: DriverStats | undefined) => {
    if (!driverStats) return "N/A";

    // First, try to get from current standings (most accurate)
    if (currentStandings && Array.isArray(currentStandings)) {
      const standing = currentStandings.find(
        (s: any) => s?.Driver?.driverId === driverStats.driver.driverId,
      );
      if (standing?.Constructors?.[0]?.name) {
        return standing.Constructors[0].name;
      }
    }

    // Fallback to seasonResults (most recent season)
    if (driverStats.seasonResults && driverStats.seasonResults.length > 0) {
      return driverStats.seasonResults[0].team;
    }

    // Last fallback to currentTeam
    return driverStats.currentTeam?.name || "N/A";
  };

  const compareStats =
    driver1Stats && driver2Stats
      ? [
          {
            label: "Total Wins",
            d1: driver1Stats.totalWins,
            d2: driver2Stats.totalWins,
          },
          {
            label: "Total Podiums",
            d1: driver1Stats.totalPodiums,
            d2: driver2Stats.totalPodiums,
          },
          {
            label: "Pole Positions",
            d1: driver1Stats.totalPoles,
            d2: driver2Stats.totalPoles,
          },
          {
            label: "Total Points",
            d1: driver1Stats.totalPoints,
            d2: driver2Stats.totalPoints,
          },
          {
            label: "Races",
            d1: driver1Stats.totalRaces,
            d2: driver2Stats.totalRaces,
          },
          {
            label: "Win Rate",
            d1: driver1Stats.winRate,
            d2: driver2Stats.winRate,
            isPercentage: true,
          },
          {
            label: "Podium Rate",
            d1: driver1Stats.podiumRate,
            d2: driver2Stats.podiumRate,
            isPercentage: true,
          },
          {
            label: "Avg Finish Position",
            d1: driver1Stats.avgFinishPosition,
            d2: driver2Stats.avgFinishPosition,
            isAverage: true,
          },
        ]
      : [];

  return (
    <main className="min-h-screen bg-black">
      <CompareHero />

      <div className="container mx-auto px-4 py-12">
        <DriverSelector
          driver1Id={driver1Id}
          driver2Id={driver2Id}
          onDriver1Change={setDriver1Id}
          onDriver2Change={setDriver2Id}
          allDrivers={allDrivers || []}
        />

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-zinc-500 font-bold uppercase tracking-wider">
              Loading data...
            </p>
          </div>
        ) : driver1Stats && driver2Stats ? (
          <>
            {/* Driver Profile Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <DriverProfileCard
                driverStats={driver1Stats}
                isDriver1={true}
                currentTeam={getMostRecentTeam(driver1Stats)}
              />
              <DriverProfileCard
                driverStats={driver2Stats}
                isDriver1={false}
                currentTeam={getMostRecentTeam(driver2Stats)}
              />
            </div>

            {/* Statistics Comparison */}
            <StatComparison compareStats={compareStats} />

            {/* Additional Stats */}
            <div className="grid md:grid-cols-2 gap-8">
              <AdditionalStats driverStats={driver1Stats} isDriver1={true} />
              <AdditionalStats driverStats={driver2Stats} isDriver1={false} />
            </div>
          </>
        ) : (
          <Card className="bg-zinc-900 border-zinc-800 rounded-none">
            <CardContent className="py-20 text-center">
              <p className="text-zinc-400 text-xl font-bold uppercase tracking-wider">
                Unable to load driver data. Please try again.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}