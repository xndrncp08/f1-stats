import { getF1News } from "@/lib/api/news-fetcher";
import { getCurrentStandings } from "@/lib/api/fetchers";
import { getNextRace } from "@/lib/api/jolpica";
import HeroSection from "@/components/home/HeroSection";
import NextRaceSection from "@/components/home/NextRaceSection";
import NewsSection from "@/components/home/NewsSection";
import TopDriversSection from "@/components/drivers/TopDrivers";
import FeaturesGrid from "@/components/home/FeaturesGrid";

export default async function Home() {
  const [standings, nextRace, news] = await Promise.all([
    getCurrentStandings(),
    getNextRace(),
    getF1News(),
  ]);

  const topDrivers = standings.slice(0, 3);

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black relative overflow-hidden">
      {/* Sophisticated background gradients */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-red-500/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/3 w-[700px] h-[700px] bg-red-700/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-red-800/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-red-600/8 rounded-full blur-[130px]" />
      </div>

      {/* Radial gradient overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      {/* Content */}
      <div className="relative">
        <HeroSection />
        <div className="container mx-auto">
          <NextRaceSection nextRace={nextRace} />
          <NewsSection news={news} />
          <TopDriversSection topDrivers={topDrivers} />
          <FeaturesGrid />
        </div>
      </div>
    </main>
  );
}