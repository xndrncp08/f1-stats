import * as jolpica from './jolpica';
import * as openf1 from './openf1';
import { 
  Driver, DriverStats, RaceResult, Result, Constructor, DriverRaceResult, SeasonResult 
} from '../types/driver';
import { calculateDriverStats } from '../utils/calculations';

export async function getCurrentDrivers(): Promise<Driver[]> {
  return jolpica.getCurrentDrivers();
}

export async function getCurrentStandings(): Promise<Result[]> {
  return jolpica.getCurrentDriverStandings();
}

export async function getDriverStats(driverId: string): Promise<DriverStats | null> {
  try {
    const driver = await jolpica.getDriver(driverId);
    const raceResults = await jolpica.getDriverResults(driverId);

    const allResults: DriverRaceResult[] = [];
    raceResults.forEach((race: any) => {
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

    const qualifying = await jolpica.getDriverQualifying(driverId, 'current');
    const polePositions = qualifying.filter((q: any) => q.QualifyingResults?.[0]?.position === '1').length;

    const fastestLaps = await jolpica.getDriverFastestLaps(driverId);
    const wins = await jolpica.getDriverWins(driverId);

    const seasonMap = new Map<string, DriverRaceResult[]>();
    allResults.forEach(result => {
      if (!seasonMap.has(result.season)) seasonMap.set(result.season, []);
      seasonMap.get(result.season)!.push(result);
    });

    const seasonResults: SeasonResult[] = Array.from(seasonMap.entries()).map(([season, results]) => {
      const seasonStats = calculateDriverStats(results, driverId);
      const team = results[0]?.Constructor?.name || 'Unknown';

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
    }).sort((a, b) => parseInt(b.season) - parseInt(a.season));

    return {
      driver,
      totalRaces: stats.totalRaces || 0,
      totalWins: wins.length,
      totalPodiums: stats.totalPodiums || 0,
      totalPoles: polePositions,
      totalFastestLaps: fastestLaps.length,
      totalPoints: stats.totalPoints || 0,
      totalChampionships: 0,
      dnfCount: stats.dnfCount || 0,
      retirementRate: stats.retirementRate || 0,
      avgFinishPosition: stats.avgFinishPosition || 0,
      avgQualifyingPosition: stats.avgQualifyingPosition || 0,
      bestFinish: stats.bestFinish || 0,
      worstFinish: stats.worstFinish || 0,
      pointsPerRace: stats.pointsPerRace || 0,
      winRate: stats.winRate || 0,
      podiumRate: stats.podiumRate || 0,
      currentTeam: allResults[0]?.Constructor,
      careerSpan: {
        firstRace: raceResults[0]?.raceName || 'Unknown',
        lastRace: raceResults[raceResults.length - 1]?.raceName || 'Unknown',
        yearsActive: new Date().getFullYear() - parseInt(raceResults[0]?.season || '0'),
      },
      seasonResults,
    };
  } catch (error) {
    console.error(`Error fetching stats for driver ${driverId}:`, error);
    return null;
  }
}

export async function getDriverComparison(driverId1: string, driverId2: string) {
  const driver1Stats = await getDriverStats(driverId1);
  const driver2Stats = await getDriverStats(driverId2);
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

export async function streamSessionData(sessionKey: number, callback: (data: any) => void, interval: number) {
  return openf1.streamSessionData(sessionKey, callback, interval);
}