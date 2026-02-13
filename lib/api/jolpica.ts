// Jolpica F1 API Client (Ergast replacement)
const BASE_URL = "https://api.jolpi.ca/ergast/f1";

export interface ApiResponse<T> {
  MRData: {
    xmlns: string;
    series: string;
    url: string;
    limit: string;
    offset: string;
    total: string;
    [key: string]: any;
  } & T;
}

// Generic fetch function with error handling
async function fetchFromAPI<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching from ${endpoint}:`, error);
    throw error;
  }
}

// Get current season
export async function getCurrentSeason(): Promise<string> {
  const data = await fetchFromAPI<any>("/current.json");
  return data.MRData.RaceTable.season;
}

// Get all drivers for a season
export async function getDriversBySeason(season: string = "current") {
  const data = await fetchFromAPI<any>(`/${season}/drivers.json`);
  return data.MRData.DriverTable.Drivers;
}

// Get current drivers (alias for consistency)
export async function getCurrentDrivers() {
  return getDriversBySeason("current");
}

// Get driver details
export async function getDriver(driverId: string) {
  const data = await fetchFromAPI<any>(`/drivers/${driverId}.json`);
  return data.MRData.DriverTable.Drivers[0];
}

// Get driver standings for a season
export async function getDriverStandings(
  season: string = "current",
  round?: string,
) {
  const endpoint = round
    ? `/${season}/${round}/driverStandings.json`
    : `/${season}/driverStandings.json`;

  const data = await fetchFromAPI<any>(endpoint);
  return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
}

// Get current driver standings (alias for consistency)
export async function getCurrentDriverStandings() {
  return getDriverStandings("current");
}

// Get all championships won by a driver (across all seasons)
export async function getDriverChampionships(driverId: string) {
  const data = await fetchFromAPI<any>(
    `/drivers/${driverId}/driverStandings/1.json`,
  );
  return data.MRData.StandingsTable.StandingsLists || [];
}

// Get all race results for a driver
export async function getDriverResults(driverId: string, limit: number = 1000) {
  const data = await fetchFromAPI<any>(
    `/drivers/${driverId}/results.json?limit=${limit}`,
  );
  return data.MRData.RaceTable.Races;
}

// Get driver results for specific season
export async function getDriverSeasonResults(driverId: string, season: string) {
  const data = await fetchFromAPI<any>(
    `/${season}/drivers/${driverId}/results.json`,
  );
  return data.MRData.RaceTable.Races;
}

// Get qualifying results for a driver
export async function getDriverQualifying(driverId: string, season: string) {
  const data = await fetchFromAPI<any>(
    `/${season}/drivers/${driverId}/qualifying.json`,
  );
  return data.MRData.RaceTable.Races;
}

// Get driver's race schedule
export async function getRaceSchedule(season: string = "current") {
  const data = await fetchFromAPI<any>(`/${season}.json`);
  return data.MRData.RaceTable.Races;
}

// Get race calendar (alias for consistency)
export async function getRaceCalendar(season: string = "current") {
  const races = await getRaceSchedule(season);
  const now = new Date();

  return races.map((race: any) => ({
    ...race,
    isPast: new Date(race.date) < now,
  }));
}

// Get next race
export async function getNextRace() {
  const races = await getRaceCalendar("current");
  const upcoming = races.filter((r: any) => !r.isPast);
  return upcoming[0] || null;
}

// Get specific race details
export async function getRaceResults(season: string, round: string) {
  const data = await fetchFromAPI<any>(`/${season}/${round}/results.json`);
  return data.MRData.RaceTable.Races[0];
}

// Get qualifying results for a race
export async function getQualifyingResults(season: string, round: string) {
  const data = await fetchFromAPI<any>(`/${season}/${round}/qualifying.json`);
  return data.MRData.RaceTable.Races[0];
}

// Get constructor standings
export async function getConstructorStandings(season: string = "current") {
  const data = await fetchFromAPI<any>(`/${season}/constructorStandings.json`);
  return (
    data.MRData.StandingsTable.StandingsLists[0]?.ConstructorStandings || []
  );
}

// Get all constructors
export async function getConstructors(season: string = "current") {
  const data = await fetchFromAPI<any>(`/${season}/constructors.json`);
  return data.MRData.ConstructorTable.Constructors;
}

// Get constructor details
export async function getConstructor(constructorId: string) {
  const data = await fetchFromAPI<any>(`/constructors/${constructorId}.json`);
  return data.MRData.ConstructorTable.Constructors[0];
}

// Get constructor results
export async function getConstructorResults(
  constructorId: string,
  season: string,
) {
  const data = await fetchFromAPI<any>(
    `/${season}/constructors/${constructorId}/results.json`,
  );
  return data.MRData.RaceTable.Races;
}

// Get circuits
export async function getCircuits(season: string = "current") {
  const data = await fetchFromAPI<any>(`/${season}/circuits.json`);
  return data.MRData.CircuitTable.Circuits;
}

// Get circuit details
export async function getCircuit(circuitId: string) {
  const data = await fetchFromAPI<any>(`/circuits/${circuitId}.json`);
  return data.MRData.CircuitTable.Circuits[0];
}

// Get seasons
export async function getSeasons() {
  const data = await fetchFromAPI<any>("/seasons.json?limit=100");
  return data.MRData.SeasonTable.Seasons;
}

// Get fastest laps for a driver
export async function getDriverFastestLaps(driverId: string, season?: string) {
  const endpoint = season
    ? `/${season}/drivers/${driverId}/fastest/1/results.json`
    : `/drivers/${driverId}/fastest/1/results.json?limit=100`;

  const data = await fetchFromAPI<any>(endpoint);
  return data.MRData.RaceTable.Races;
}

// Get driver's wins
export async function getDriverWins(driverId: string) {
  const data = await fetchFromAPI<any>(
    `/drivers/${driverId}/results/1.json?limit=100`,
  );
  return data.MRData.RaceTable.Races;
}

// Get driver's podiums
export async function getDriverPodiums(driverId: string) {
  const data = await fetchFromAPI<any>(
    `/drivers/${driverId}/results.json?limit=1000`,
  );
  const races = data.MRData.RaceTable.Races;

  return races.filter((race: any) => {
    const result = race.Results[0];
    return result && parseInt(result.position) <= 3;
  });
}

// Get lap times for a race
export async function getLapTimes(season: string, round: string, lap: string) {
  const data = await fetchFromAPI<any>(`/${season}/${round}/laps/${lap}.json`);
  return data.MRData.RaceTable.Races[0]?.Laps[0]?.Timings || [];
}

// Get pit stops for a race
export async function getPitStops(season: string, round: string) {
  const data = await fetchFromAPI<any>(
    `/${season}/${round}/pitstops.json?limit=100`,
  );
  return data.MRData.RaceTable.Races[0]?.PitStops || [];
}

// Get status (reason for DNF)
export async function getStatus(statusId: string) {
  const data = await fetchFromAPI<any>(`/status/${statusId}.json`);
  return data.MRData.StatusTable.Status[0];
}
  