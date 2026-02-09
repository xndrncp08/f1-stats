import * as jolpica from './jolpica';
import * as openf1 from './openf1';
import { Driver, DriverStats, RaceResult, Result, Constructor, DriverRaceResult, SeasonResult } from '../types/driver';
import { calculateDriverStats } from '../utils/calculations';

// Get comprehensive driver statistics
export async function getDriverStats(driverId: string): Promise<DriverStats | null> {
  try {
    const driver = await jolpica.getDriver(driverId);
    const raceResults = await jolpica.getDriverResults(driverId);

    // Transform raw results into DriverRaceResult[]
    const allResults: DriverRaceResult[] = [];
    raceResults.forEach((race: any) => {
      if (race.Results && race.Results.length > 0) {
        allResults.push({
          ...race.Results[0],
          season: race.season,
          round: race.round,
          raceName: race.raceName,
        });
      }
    });

    // Calculate overall stats
    const stats = calculateDriverStats(allResults, driverId);

    // Poles
    const qualifying = await jolpica.getDriverQualifying(driverId, 'current');
    const polePositions = qualifying.filter((q: any) => q.QualifyingResults?.[0]?.position === '1').length;

    // Fastest laps
    const fastestLaps = await jolpica.getDriverFastestLaps(driverId);

    // Wins
    const wins = await jolpica.getDriverWins(driverId);

    // Group by season
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

// Calculate head-to-head record against teammate
export function calculateH2HRecord(
  driverResults: DriverRaceResult[],
  teammateResults: DriverRaceResult[]
): { wins: number; losses: number; draws: number } {
  let wins = 0;
  let losses = 0;
  let draws = 0;

  const raceMap = new Map<string, { driver?: DriverRaceResult; teammate?: DriverRaceResult }>();

  driverResults.forEach(r => {
    const key = `${r.season}-${r.round}`;
    const existing = raceMap.get(key) || {};
    raceMap.set(key, { ...existing, driver: r });
  });

  teammateResults.forEach(r => {
    const key = `${r.season}-${r.round}`;
    const existing = raceMap.get(key) || {};
    raceMap.set(key, { ...existing, teammate: r });
  });

  raceMap.forEach(({ driver, teammate }) => {
    if (!driver || !teammate) return;

    const driverPos = parseInt(driver.position);
    const teammatePos = parseInt(teammate.position);

    if (driverPos < teammatePos) wins++;
    else if (driverPos > teammatePos) losses++;
    else draws++;
  });

  return { wins, losses, draws };
}

// You can add other helper functions like calculateRecentForm, calculateMomentum, etc.
// They can continue to use Result[] unless they need season/round fields.
