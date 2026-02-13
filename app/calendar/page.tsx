"use client";

import { useState, useEffect } from "react";
import { getRaceSchedule } from "@/lib/api/jolpica";
import CalendarHero from "@/components/calendar/CalendarHero";
import SeasonSelector from "@/components/calendar/SeasonSelector";
import RaceGrid from "@/components/calendar/RaceGrid";

export default function CalendarPage() {
  const currentYear = new Date().getFullYear();
  const [season, setSeason] = useState(currentYear.toString());
  const [races, setRaces] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRaces() {
      setIsLoading(true);
      try {
        const data = await getRaceSchedule(season);
        setRaces(data || []);
      } catch (error) {
        console.error("Error fetching calendar:", error);
        setRaces([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRaces();
  }, [season]);

  return (
    <main className="min-h-screen bg-black">
      <CalendarHero season={season} />

      <div className="container mx-auto px-4 py-12">
        <SeasonSelector season={season} onSeasonChange={setSeason} />

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-zinc-500 font-bold uppercase tracking-wider">
              Loading races...
            </p>
          </div>
        ) : (
          <RaceGrid races={races} season={season} currentYear={currentYear} />
        )}
      </div>
    </main>
  );
}