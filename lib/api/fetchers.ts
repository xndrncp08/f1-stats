// Data fetchers that process and combine data from APIs
import * as jolpica from './jolpica';
import * as openf1 from './openf1';
import { DriverRaceResult, DriverStats, RaceResult, Result } from '../types/driver';
import { calculateDriverStats } from '../utils/calculations';

// Get comprehensive driver statistics
export async function getDriverStats(driverId: string): Promise<DriverStats | null> {
  try {
    // Fetch driver basic info
    const driver = await jolpica.getDriver(driverId);
    
    // Fetch all race results
    const raceResults = await jolpica.getDriverResults(driverId);
    
    // Extract all results from races
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

    // Calculate comprehensive stats
    const stats = calculateDriverStats(allResults, driverId);
    
    // Get poles from qualifying
    const qualifying = await jolpica.getDriverQualifying(driverId, 'current');
    const polePositions = qualifying.filter((q: any) => 
      q.QualifyingResults?.[0]?.position === '1'
    ).length;

    // Get fastest laps
    const fastestLaps = await jolpica.getDriverFastestLaps(driverId);
    
    // Get wins
    const wins = await jolpica.getDriverWins(driverId);

    // Group results by season
    const seasonMap = new Map();
    allResults.forEach(result => {
      if (!seasonMap.has(result.season)) {
        seasonMap.set(result.season, []);
      }
      seasonMap.get(result.season).push(result);
    });

    // Calculate season results
    const seasonResults = Array.from(seasonMap.entries()).map(([season, results]: [string, any]) => {
      const seasonStats = calculateDriverStats(results, driverId);
      const team = results[0]?.Constructor?.name || 'Unknown';
      
      return {
        season,
        team,
        races: seasonStats.totalRaces || 0,
        wins: seasonStats.totalWins || 0,
        podiums: seasonStats.totalPodiums || 0,
        poles: 0, // Would need qualifying data per season
        points: seasonStats.totalPoints || 0,
        position: 0, // Would need to fetch standings
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
      totalChampionships: 0, // Would need to calculate from standings
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

// Get all current drivers with basic stats
export async function getCurrentDrivers() {
  try {
    const drivers = await jolpica.getDriversBySeason('current');
    const standings = await jolpica.getDriverStandings('current');
    
    return drivers.map((driver: any) => {
      const standing = standings.find((s: any) => s.Driver.driverId === driver.driverId);
      
      return {
        ...driver,
        currentPosition: standing?.position || 'N/A',
        currentPoints: standing?.points || '0',
        currentWins: standing?.wins || '0',
        currentTeam: standing?.Constructors?.[0]?.name || 'Unknown',
      };
    });
  } catch (error) {
    console.error('Error fetching current drivers:', error);
    return [];
  }
}

// Get current driver standings
export async function getCurrentStandings() {
  try {
    return await jolpica.getDriverStandings('current');
  } catch (error) {
    console.error('Error fetching standings:', error);
    return [];
  }
}

// Get constructor standings
export async function getCurrentConstructorStandings() {
  try {
    return await jolpica.getConstructorStandings('current');
  } catch (error) {
    console.error('Error fetching constructor standings:', error);
    return [];
  }
}

// Get race calendar
export async function getRaceCalendar(season: string = 'current') {
  try {
    const races = await jolpica.getRaceSchedule(season);
    
    return races.map((race: any) => ({
      ...race,
      dateTime: new Date(`${race.date}${race.time ? `T${race.time}` : ''}`),
      isPast: new Date(`${race.date}${race.time ? `T${race.time}` : ''}`) < new Date(),
    }));
  } catch (error) {
    console.error('Error fetching race calendar:', error);
    return [];
  }
}

// Get next race
export async function getNextRace() {
  try {
    const calendar = await getRaceCalendar();
    const upcoming = calendar.filter((race: any) => !race.isPast);
    return upcoming[0] || null;
  } catch (error) {
    console.error('Error fetching next race:', error);
    return null;
  }
}

// Get live session data
export async function getLiveSessionData() {
  try {
    const latestSession = await openf1.getLatestSession();
    
    if (!latestSession) {
      return null;
    }

    const isLive = await openf1.isSessionLive(latestSession.session_key);
    
    if (!isLive) {
      return null;
    }

    const telemetry = await openf1.getSessionTelemetry(latestSession.session_key);
    
    return {
      session: latestSession,
      telemetry,
      isLive,
    };
  } catch (error) {
    console.error('Error fetching live session data:', error);
    return null;
  }
}

// Get driver comparison data
export async function getDriverComparison(driverId1: string, driverId2: string) {
  try {
    const [driver1Stats, driver2Stats] = await Promise.all([
      getDriverStats(driverId1),
      getDriverStats(driverId2),
    ]);

    return {
      driver1: driver1Stats,
      driver2: driver2Stats,
    };
  } catch (error) {
    console.error('Error comparing drivers:', error);
    return null;
  }
}

// Get race results with full details
export async function getRaceResultsDetailed(season: string, round: string) {
  try {
    const [results, qualifying] = await Promise.all([
      jolpica.getRaceResults(season, round),
      jolpica.getQualifyingResults(season, round).catch(() => null),
    ]);

    return {
      race: results,
      qualifying,
    };
  } catch (error) {
    console.error('Error fetching race results:', error);
    return null;
  }
}

// Get constructor details with driver lineup
export async function getConstructorDetails(constructorId: string, season: string = 'current') {
  try {
    const [constructor, results, standings] = await Promise.all([
      jolpica.getConstructor(constructorId),
      jolpica.getConstructorResults(constructorId, season),
      jolpica.getConstructorStandings(season),
    ]);

    const standing = standings.find((s: any) => s.Constructor.constructorId === constructorId);

    // Extract unique drivers from results
    const drivers = new Set();
    results.forEach((race: any) => {
      race.Results?.forEach((result: any) => {
        if (result.Constructor.constructorId === constructorId) {
          drivers.add(result.Driver.driverId);
        }
      });
    });

    return {
      constructor,
      standing,
      drivers: Array.from(drivers),
      recentResults: results.slice(-5),
    };
  } catch (error) {
    console.error('Error fetching constructor details:', error);
    return null;
  }
}

// Get historical season data
export async function getSeasonData(season: string) {
  try {
    const [driverStandings, constructorStandings, calendar] = await Promise.all([
      jolpica.getDriverStandings(season),
      jolpica.getConstructorStandings(season),
      jolpica.getRaceSchedule(season),
    ]);

    return {
      season,
      driverStandings,
      constructorStandings,
      calendar,
    };
  } catch (error) {
    console.error('Error fetching season data:', error);
    return null;
  }
}

// Search drivers by name
export async function searchDrivers(query: string) {
  try {
    const allDrivers = await jolpica.getDriversBySeason('current');
    const lowerQuery = query.toLowerCase();
    
    return allDrivers.filter((driver: any) => 
      driver.givenName.toLowerCase().includes(lowerQuery) ||
      driver.familyName.toLowerCase().includes(lowerQuery) ||
      driver.code?.toLowerCase().includes(lowerQuery)
    );
  } catch (error) {
    console.error('Error searching drivers:', error);
    return [];
  }
}
