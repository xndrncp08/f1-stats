import { getF1News } from "@/lib/api/news-fetcher";
import HeroSection from "@/components/layout/HeroSection";
import NextRaceSection from "@/components/layout/NextRaceSection";
import NewsSection from "@/components/layout/NewsSection";
import TopDriversSection from "@/components/drivers/TopDrivers";
import FeaturesGrid from "@/components/layout/FeaturesGrid";

async function getCurrentStandings() {
  try {
    const response = await fetch(
      "https://api.jolpi.ca/ergast/f1/2025/driverStandings.json",
      {
        next: { revalidate: 3600 },
      },
    );
    const data = await response.json();
    return data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
  } catch (error) {
    console.error("Error fetching standings:", error);
    return [];
  }
}

async function getNextRace() {
  try {
    const response = await fetch(
      "https://api.jolpi.ca/ergast/f1/2025.json",
      {
        next: { revalidate: 3600 },
      },
    );
    const data = await response.json();
    const races = data.MRData.RaceTable.Races;
    const now = new Date();
    const upcoming = races.find((race: any) => new Date(race.date) > now);
    return upcoming || races[races.length - 1];
  } catch (error) {
    console.error("Error fetching races:", error);
    return null;
  }
}

export default async function Home() {
  // Fetch data from Jolpica F1 API and news
  const [standings, nextRace, news] = await Promise.all([
    getCurrentStandings(),
    getNextRace(),
    getF1News(),
  ]);

  const topDrivers = standings.slice(0, 3);

  return (
    <main className="min-h-screen bg-black">
      <HeroSection />
      <NextRaceSection nextRace={nextRace} />
      <NewsSection news={news} />
      <TopDriversSection topDrivers={topDrivers} />
      <FeaturesGrid />
    </main>
  );
}