"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDrivers, useDriverStats } from "@/lib/hooks/useDrivers";
import { formatPoints, formatPercentage } from "@/lib/utils/format";
import { DriverStats } from "@/lib/types/driver";

export default function ComparePage() {
  const [driver1Id, setDriver1Id] = useState<string>("max_verstappen");
  const [driver2Id, setDriver2Id] = useState<string>("hamilton");

  const { data: allDrivers, isLoading: driversLoading } = useDrivers();
  const { data: driver1Stats, isLoading: driver1Loading } =
    useDriverStats(driver1Id);
  const { data: driver2Stats, isLoading: driver2Loading } =
    useDriverStats(driver2Id);

  const isLoading = driversLoading || driver1Loading || driver2Loading;

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

  const getPercentageWidth = (
    d1: number,
    d2: number,
    isAverage: boolean = false,
  ) => {
    if (isAverage) {
      // For averages, lower is better, so invert the calculation
      const total = d1 + d2;
      const d1Percent = total > 0 ? (d2 / total) * 100 : 50;
      const d2Percent = total > 0 ? (d1 / total) * 100 : 50;
      return { d1: d1Percent, d2: d2Percent };
    }

    const total = d1 + d2;
    const d1Percent = total > 0 ? (d1 / total) * 100 : 50;
    const d2Percent = total > 0 ? (d2 / total) * 100 : 50;
    return { d1: d1Percent, d2: d2Percent };
  };

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
            <TrendingUp className="h-10 w-10 text-f1-neon-green" />
            Driver Comparison
          </h1>
          <p className="text-zinc-400">
            Head-to-head career statistics comparison
          </p>
        </div>

        {/* Driver Selection */}
        <Card className="bg-zinc-900 border-zinc-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white">
              Select Drivers to Compare
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">
                  Driver 1
                </label>
                <Select value={driver1Id} onValueChange={setDriver1Id}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {allDrivers?.map((driver: any) => (
                      <SelectItem
                        key={driver.driverId}
                        value={driver.driverId}
                        className="text-white hover:bg-zinc-700"
                      >
                        {driver.givenName} {driver.familyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm text-zinc-400 mb-2 block">
                  Driver 2
                </label>
                <Select value={driver2Id} onValueChange={setDriver2Id}>
                  <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                    <SelectValue placeholder="Select driver" />
                  </SelectTrigger>
                  <SelectContent className="bg-zinc-800 border-zinc-700">
                    {allDrivers?.map((driver: any) => (
                      <SelectItem
                        key={driver.driverId}
                        value={driver.driverId}
                        className="text-white hover:bg-zinc-700"
                      >
                        {driver.givenName} {driver.familyName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-12 w-12 text-f1-neon-blue animate-spin" />
          </div>
        ) : driver1Stats && driver2Stats ? (
          <>
            {/* Driver Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gradient-to-br from-blue-900/20 to-zinc-900 border-blue-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    {driver1Stats.driver.givenName}{" "}
                    {driver1Stats.driver.familyName}
                  </CardTitle>
                  <p className="text-zinc-400">
                    #{driver1Stats.driver.permanentNumber || "—"} •{" "}
                    {driver1Stats.driver.nationality}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Current Team</span>
                      <span className="text-white font-medium">
                        {driver1Stats.currentTeam?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Career Span</span>
                      <span className="text-white font-medium">
                        {driver1Stats.careerSpan.yearsActive} years
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Championships</span>
                      <span className="text-white font-medium">
                        {driver1Stats.totalChampionships}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-cyan-900/20 to-zinc-900 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">
                    {driver2Stats.driver.givenName}{" "}
                    {driver2Stats.driver.familyName}
                  </CardTitle>
                  <p className="text-zinc-400">
                    #{driver2Stats.driver.permanentNumber || "—"} •{" "}
                    {driver2Stats.driver.nationality}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Current Team</span>
                      <span className="text-white font-medium">
                        {driver2Stats.currentTeam?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Career Span</span>
                      <span className="text-white font-medium">
                        {driver2Stats.careerSpan.yearsActive} years
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-zinc-400">Championships</span>
                      <span className="text-white font-medium">
                        {driver2Stats.totalChampionships}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Statistics Comparison */}
            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle className="text-white">Career Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {compareStats.map((stat, index) => {
                    const percentages = getPercentageWidth(
                      stat.d1,
                      stat.d2,
                      stat.isAverage || false,
                    );

                    return (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-zinc-400">
                            {stat.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1 text-right">
                            <span className="text-2xl font-bold text-blue-500">
                              {stat.isPercentage
                                ? formatPercentage(stat.d1)
                                : stat.isAverage
                                  ? stat.d1.toFixed(1)
                                  : Math.round(stat.d1)}
                            </span>
                          </div>
                          <div className="flex-1 flex items-center gap-2">
                            <div className="flex-1 h-8 bg-zinc-800 rounded-lg overflow-hidden flex">
                              <div
                                className="bg-blue-500 flex items-center justify-end pr-2 transition-all"
                                style={{ width: `${percentages.d1}%` }}
                              >
                                {percentages.d1 > 20 && (
                                  <span className="text-xs font-bold text-white">
                                    {percentages.d1.toFixed(0)}%
                                  </span>
                                )}
                              </div>
                              <div
                                className="bg-cyan-500 flex items-center justify-start pl-2 transition-all"
                                style={{ width: `${percentages.d2}%` }}
                              >
                                {percentages.d2 > 20 && (
                                  <span className="text-xs font-bold text-white">
                                    {percentages.d2.toFixed(0)}%
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex-1 text-left">
                            <span className="text-2xl font-bold text-cyan-500">
                              {stat.isPercentage
                                ? formatPercentage(stat.d2)
                                : stat.isAverage
                                  ? stat.d2.toFixed(1)
                                  : Math.round(stat.d2)}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Additional Stats */}
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    {driver1Stats.driver.familyName} - Additional Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Fastest Laps</span>
                      <span className="text-white font-bold">
                        {driver1Stats.totalFastestLaps}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">DNFs</span>
                      <span className="text-white font-bold">
                        {driver1Stats.dnfCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Retirement Rate</span>
                      <span className="text-white font-bold">
                        {formatPercentage(driver1Stats.retirementRate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Points Per Race</span>
                      <span className="text-white font-bold">
                        {driver1Stats.pointsPerRace.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-zinc-900 border-zinc-800">
                <CardHeader>
                  <CardTitle className="text-white">
                    {driver2Stats.driver.familyName} - Additional Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Fastest Laps</span>
                      <span className="text-white font-bold">
                        {driver2Stats.totalFastestLaps}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">DNFs</span>
                      <span className="text-white font-bold">
                        {driver2Stats.dnfCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Retirement Rate</span>
                      <span className="text-white font-bold">
                        {formatPercentage(driver2Stats.retirementRate)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Points Per Race</span>
                      <span className="text-white font-bold">
                        {driver2Stats.pointsPerRace.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        ) : (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="py-12 text-center">
              <p className="text-zinc-400 text-lg">
                Unable to load driver data. Please try again.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
