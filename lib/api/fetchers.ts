import * as jolpica from "./jolpica";
import * as openf1 from "./openf1";
import {
  Driver,
  DriverStats,
  Constructor,
  DriverRaceResult,
  SeasonResult,
} from "../types/driver";
import { calculateDriverStats } from "../utils/calculations";
import championshipData from "../data/championships.json";

const BASE_URL = "https://api.jolpi.ca/ergast/f1";

// Fetch ALL paginated results for a driver
async function fetchAllDriverResults(driverId: string): Promise<any[]> {
  const pageSize = 100;
  let offset = 0;
  let allRaces: any[] = [];
  let total = Infinity;

  while (offset < total) {
    const res = await fetch(
      `${BASE_URL}/drivers/${driverId}/results.json?limit=${pageSize}&offset=${offset}`,
      { next: { revalidate: 300 } }
    );
    if (!res.ok) break;
    const data = await res.json();
    const mrData = data?.MRData;
    total = parseInt(mrData?.total || "0");
    const races = mrData?.RaceTable?.Races || [];
    allRaces = [...allRaces, ...races];
    offset += pageSize;
    if (races.length === 0) break;
  }

  return allRaces;
}

export async function getCurrentDrivers(): Promise<Driver[]> {
  return jolpica.getCurrentDrivers();
}

export async function getCurrentStandings(): Promise<any[]> {
  return jolpica.getCurrentDriverStandings();
}

export async function getDriverStats(driverId: string): Promise<DriverStats | null> {
  try {
    const [driver, qualifying, fastestLaps, currentStandings] =
      await Promise.allSettled([
        jolpica.getDriver(driverId),
        jolpica.getDriverQualifying(driverId, "current"),
        jolpica.getDriverFastestLaps(driverId),
        jolpica.getCurrentDriverStandings(),
      ]);

    const driverData = driver.status === "fulfilled" ? driver.value : null;
    if (!driverData) return null;

    const qual = qualifying.status === "fulfilled" ? qualifying.value : [];
    const fastest = fastestLaps.status === "fulfilled" ? fastestLaps.value : [];
    const standings = currentStandings.status === "fulfilled" ? currentStandings.value : [];

    // Fetch ALL career results with pagination
    const allRaces = await fetchAllDriverResults(driverId);

    const allResults: DriverRaceResult[] = [];
    allRaces.forEach((race: any) => {
      if (race.Results?.length) {
        allResults.push({
          ...race.Results[0],
          season: race.season,
          round: race.round,
          raceName: race.raceName,
        });
      }
    });

    const stats = calculateDriverStats(allResults, driverId);

    const polePositions = qual.filter(
      (q: any) => q.QualifyingResults?.[0]?.position === "1"
    ).length;

    // Championships from static JSON — accurate and instant
    const championships = (championshipData as Record<string, number>)[driverId] ?? 0;

    // Wins from full results
    const totalWins = allResults.filter(r => r.position === "1").length;

    // Season breakdown
    const seasonMap = new Map<string, DriverRaceResult[]>();
    allResults.forEach((result) => {
      if (!seasonMap.has(result.season)) seasonMap.set(result.season, []);
      seasonMap.get(result.season)!.push(result);
    });

    const seasonResults: SeasonResult[] = Array.from(seasonMap.entries())
      .map(([season, results]) => {
        const seasonStats = calculateDriverStats(results, driverId);
        const team = results[results.length - 1]?.Constructor?.name || "Unknown";
        return {
          season,
          team,
          races: seasonStats.totalRaces || 0,
          wins: seasonStats.totalWins || 0,
          podiums: seasonStats.totalPodiums || 0,
          poles: 0,
          points: seasonStats.totalPoints || 0,
          position: 0,
        };
      })
      .sort((a, b) => parseInt(b.season) - parseInt(a.season));

    // Current team
    let currentTeam: Constructor | undefined;
    const currentStanding = standings.find(
      (s: any) => s.Driver.driverId === driverId
    );
    if (currentStanding?.Constructors?.[0]) {
      currentTeam = currentStanding.Constructors[0];
    }
    if (!currentTeam && allResults.length > 0) {
      currentTeam = allResults[allResults.length - 1]?.Constructor;
    }

    return {
      driver: driverData,
      totalRaces: stats.totalRaces || 0,
      totalWins,
      totalPodiums: stats.totalPodiums || 0,
      totalPoles: polePositions,
      totalFastestLaps: fastest.length,
      totalPoints: stats.totalPoints || 0,
      totalChampionships: championships,
      dnfCount: stats.dnfCount || 0,
      retirementRate: stats.retirementRate || 0,
      avgFinishPosition: stats.avgFinishPosition || 0,
      avgQualifyingPosition: stats.avgQualifyingPosition || 0,
      bestFinish: stats.bestFinish || 0,
      worstFinish: stats.worstFinish || 0,
      pointsPerRace: stats.pointsPerRace || 0,
      winRate: stats.winRate || 0,
      podiumRate: stats.podiumRate || 0,
      currentTeam,
      careerSpan: {
        firstRace: allRaces[0]?.raceName || "Unknown",
        lastRace: allRaces[allRaces.length - 1]?.raceName || "Unknown",
        yearsActive: new Date().getFullYear() - parseInt(allRaces[0]?.season || "0"),
      },
      seasonResults,
    };
  } catch (error) {
    console.error(`Error fetching stats for driver ${driverId}:`, error);
    return null;
  }
}

export async function getDriverComparison(driverId1: string, driverId2: string) {
  const [driver1Stats, driver2Stats] = await Promise.all([
    getDriverStats(driverId1),
    getDriverStats(driverId2),
  ]);
  return { driver1Stats, driver2Stats };
}

export async function getRaceCalendar(season: string) {
  return jolpica.getRaceCalendar(season);
}

export async function getNextRace() {
  return jolpica.getNextRace();
}

export async function getRaceResultsDetailed(season: string, round: string) {
  return jolpica.getRaceResults(season, round);
}

export async function getLiveSessionData() {
  return openf1.getLiveSession();
}

export async function getSessions(options?: any) {
  return openf1.getSessions(options);
}

export async function isSessionLive(sessionKey: number) {
  return openf1.isSessionLive(sessionKey);
}

export async function getSessionTelemetry(sessionKey: number) {
  return openf1.getSessionTelemetry(sessionKey);
}

export async function getDriverPerformanceSummary(sessionKey: number, driverNumber: number) {
  return openf1.getDriverPerformanceSummary(sessionKey, driverNumber);
}

export async function getLaps(params: { session_key: number; driver_number: number }) {
  return openf1.getLaps(params);
}

export async function getStints(params: { session_key: number; driver_number: number }) {
  return openf1.getStints(params);
}

export async function streamSessionData(
  sessionKey: number,
  callback: (data: any) => void,
  interval: number,
) {
  return openf1.streamSessionData(sessionKey, callback, interval);
}