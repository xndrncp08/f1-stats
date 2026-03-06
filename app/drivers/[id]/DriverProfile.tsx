"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const TEAM_COLORS: Record<string, string> = {
  mercedes: "#00D2BE",
  ferrari: "#E8002D",
  red_bull: "#3671C6",
  mclaren: "#FF8000",
  alpine: "#FF87BC",
  aston_martin: "#229971",
  williams: "#64C4FF",
  haas: "#B6BABD",
  sauber: "#52E252",
  rb: "#6692FF",
  alphatauri: "#6692FF",
  "alfa romeo": "#C92D4B",
  renault: "#FFF500",
};

function getTeamColor(teamName: string): string {
  const lower = teamName.toLowerCase();
  for (const [key, color] of Object.entries(TEAM_COLORS)) {
    if (lower.includes(key)) return color;
  }
  return "#E10600";
}

function StatBox({
  label,
  value,
  accent = false,
}: {
  label: string;
  value: string | number;
  accent?: boolean;
}) {
  return (
    <div className="bg-black border border-zinc-800 p-4 hover:border-zinc-600 transition-colors">
      <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
        {label}
      </div>
      <div
        className={`text-2xl font-black ${accent ? "text-red-500" : "text-white"}`}
      >
        {value}
      </div>
    </div>
  );
}

async function fetchJSON(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export default function DriverProfile({ driverId }: { driverId: string }) {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!driverId) return;

    async function load() {
      try {
        console.log("[DriverProfile] fetching:", driverId);

        // Step 1: fast requests only - no bulk career data
        const [driverRes, standingsRes, champRes, seasonRes] =
          await Promise.allSettled([
            fetchJSON(
              `https://api.jolpi.ca/ergast/f1/drivers/${driverId}.json`,
            ),
            fetchJSON(
              `https://api.jolpi.ca/ergast/f1/2025/driverStandings.json`,
            ),
            fetchJSON(
              `https://api.jolpi.ca/ergast/f1/drivers/${driverId}/driverStandings.json?limit=100`,
            ),
            fetchJSON(
              `https://api.jolpi.ca/ergast/f1/2025/drivers/${driverId}/results.json`,
            ),
          ]);

        console.log("[DriverProfile] statuses:", {
          driver: driverRes.status,
          standings: standingsRes.status,
          champ: champRes.status,
          season: seasonRes.status,
        });

        const driver =
          driverRes.status === "fulfilled"
            ? driverRes.value?.MRData?.DriverTable?.Drivers?.[0]
            : null;

        if (!driver) {
          setError("Driver not found");
          return;
        }

        const allStandings =
          standingsRes.status === "fulfilled"
            ? standingsRes.value?.MRData?.StandingsTable?.StandingsLists?.[0]
                ?.DriverStandings || []
            : [];
        const standing =
          allStandings.find((s: any) => s.Driver.driverId === driverId) || null;

        const champSeasons =
          champRes.status === "fulfilled"
            ? champRes.value?.MRData?.StandingsTable?.StandingsLists || []
            : [];
        const championships = champSeasons.filter(
          (s: any) => s.DriverStandings?.[0]?.position === "1",
        ).length;

        const seasonRaces =
          seasonRes.status === "fulfilled"
            ? seasonRes.value?.MRData?.RaceTable?.Races || []
            : [];

        // Step 2: get wins count (separate smaller request)
        let wins = 0;
        try {
          const winsRes = await fetchJSON(
            `https://api.jolpi.ca/ergast/f1/drivers/${driverId}/results/1.json?limit=1`,
          );
          wins = parseInt(winsRes?.MRData?.total || "0");
        } catch (_) {}

        // Step 3: get total races count
        let totalRaces = 0;
        let firstSeason = "—";
        try {
          const racesRes = await fetchJSON(
            `https://api.jolpi.ca/ergast/f1/drivers/${driverId}/results.json?limit=1&offset=0`,
          );
          totalRaces = parseInt(racesRes?.MRData?.total || "0");
          firstSeason = racesRes?.MRData?.RaceTable?.Races?.[0]?.season || "—";
        } catch (_) {}

        // Step 4: podiums
        let podiums = 0;
        try {
          const podRes = await fetchJSON(
            `https://api.jolpi.ca/ergast/f1/drivers/${driverId}/results.json?limit=1&offset=0`,
          );
          // We can't get podiums count from total easily, skip for now
          podiums = 0;
        } catch (_) {}

        setData({
          driver,
          standing,
          careerStats: {
            totalRaces,
            wins,
            podiums,
            championships,
            poles: 0,
            firstSeason,
          },
          seasonResults: seasonRaces,
        });
      } catch (err: any) {
        console.error("[DriverProfile] error:", err);
        setError(err.message || "Failed to load");
      }
    }

    load();
  }, [driverId]);

  if (error) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 font-bold mb-4">{error}</p>
          <Link
            href="/drivers"
            className="text-zinc-400 hover:text-white text-sm underline"
          >
            ← Back to Drivers
          </Link>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest">
            Loading Driver
          </p>
        </div>
      </main>
    );
  }

  const { driver, standing, careerStats, seasonResults } = data;
  const teamName = standing?.Constructors?.[0]?.name || "Unknown Team";
  const teamColor = getTeamColor(teamName);

  return (
    <main className="min-h-screen bg-black">
      <div className="h-1 w-full" style={{ backgroundColor: teamColor }} />

      <section className="relative overflow-hidden border-b border-zinc-800">
        <div
          className="absolute right-0 top-0 bottom-0 flex items-center pr-8 pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <span
            className="font-black leading-none"
            style={{
              fontSize: "clamp(8rem, 20vw, 18rem)",
              color: teamColor,
              opacity: 0.06,
            }}
          >
            {driver.permanentNumber || "?"}
          </span>
        </div>

        <div className="relative container mx-auto px-4 py-12">
          <Link
            href="/drivers"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-zinc-500 hover:text-white mb-8 transition-colors"
          >
            ← Drivers
          </Link>

          <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-12">
            <div>
              <div
                className="inline-block px-3 py-1 text-xs font-black uppercase tracking-widest mb-4"
                style={{ backgroundColor: teamColor, color: "#000" }}
              >
                #{driver.permanentNumber || "—"}
              </div>
              <div className="mb-2">
                <span className="block text-zinc-400 text-lg font-bold">
                  {driver.givenName}
                </span>
                <span
                  className="block font-black uppercase leading-none text-white"
                  style={{ fontSize: "clamp(2.5rem, 8vw, 5rem)" }}
                >
                  {driver.familyName}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-500 font-bold">
                <span className="uppercase tracking-widest">
                  {driver.nationality}
                </span>
                <span className="text-zinc-700">·</span>
                <span style={{ color: teamColor }}>{teamName}</span>
                {driver.dateOfBirth && (
                  <>
                    <span className="text-zinc-700">·</span>
                    <span>
                      Born{" "}
                      {new Date(driver.dateOfBirth).toLocaleDateString(
                        "en-US",
                        { year: "numeric", month: "long", day: "numeric" },
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>

            {standing && (
              <div className="flex gap-6 md:ml-auto">
                <div className="text-center">
                  <div
                    className="text-4xl font-black"
                    style={{ color: teamColor }}
                  >
                    {standing.position}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                    Position
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-white">
                    {standing.points}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                    Points
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-black text-white">
                    {standing.wins}
                  </div>
                  <div className="text-xs font-bold uppercase tracking-widest text-zinc-600">
                    Wins
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10 space-y-10">
        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">
            Career Statistics
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-px bg-zinc-800">
            <StatBox
              label="Championships"
              value={careerStats.championships}
              accent
            />
            <StatBox label="Race Wins" value={careerStats.wins} />
            <StatBox label="Total Races" value={careerStats.totalRaces} />
            <StatBox label="Active Since" value={careerStats.firstSeason} />
            <StatBox label="2025 Position" value={standing?.position || "—"} />
          </div>
        </section>

        <section>
          <h2 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4">
            2025 Season Results
          </h2>
          {seasonResults.length > 0 ? (
            <div className="border border-zinc-800">
              <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-zinc-800 bg-zinc-900/50">
                <div className="col-span-1 text-xs font-bold uppercase tracking-widest text-zinc-600">
                  Rd
                </div>
                <div className="col-span-5 text-xs font-bold uppercase tracking-widest text-zinc-600">
                  Race
                </div>
                <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-zinc-600 text-center">
                  Grid
                </div>
                <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-zinc-600 text-center">
                  Finish
                </div>
                <div className="col-span-2 text-xs font-bold uppercase tracking-widest text-zinc-600 text-right">
                  Pts
                </div>
              </div>
              {seasonResults.map((race: any) => {
                const result = race.Results?.[0];
                const pos = parseInt(result?.position);
                const isWin = pos === 1;
                const isPodium = pos <= 3;
                return (
                  <div
                    key={race.round}
                    className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-900 hover:bg-zinc-900/40 transition-colors"
                  >
                    <div className="col-span-1 text-sm font-bold text-zinc-600">
                      {race.round}
                    </div>
                    <div className="col-span-5">
                      <div className="text-sm font-bold text-white leading-tight">
                        {race.raceName}
                      </div>
                      <div className="text-xs text-zinc-600">
                        {race.Circuit?.Location?.country}
                      </div>
                    </div>
                    <div className="col-span-2 text-center text-sm font-bold text-zinc-400">
                      {result?.grid || "—"}
                    </div>
                    <div className="col-span-2 text-center">
                      <span
                        className={`text-sm font-black ${isWin ? "text-yellow-400" : isPodium ? "text-orange-400" : "text-white"}`}
                      >
                        {result?.position || result?.status || "—"}
                      </span>
                    </div>
                    <div className="col-span-2 text-right text-sm font-bold text-zinc-300">
                      {result?.points || "0"}
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="border border-zinc-800 p-8 text-center text-zinc-600 font-bold">
              No 2025 season data available yet
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
