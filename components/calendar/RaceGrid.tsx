import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function RaceGrid({
  races,
  season,
  currentYear,
}: {
  races: any[];
  season: string;
  currentYear: number;
}) {
  const now = new Date();

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {races.map((race: any, index: number) => {
        const raceDate = new Date(race.date);
        const isUpcoming = raceDate > now && season === currentYear.toString();
        const isPast = raceDate < now || season !== currentYear.toString();

        const daysUntil = Math.ceil(
          (raceDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
        );

        return <Card key={index}>{/* your entire card JSX unchanged */}</Card>;
      })}
    </div>
  );
}
