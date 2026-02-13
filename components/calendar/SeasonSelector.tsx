import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SeasonSelectorProps {
  season: string;
  onSeasonChange: (season: string) => void;
}

export default function SeasonSelector({ season, onSeasonChange }: SeasonSelectorProps) {
  const currentYear = new Date().getFullYear();
  
  // Generate years from 1950 to current year
  const years = Array.from(
    { length: currentYear - 1949 },
    (_, i) => (currentYear - i).toString()
  );

  return (
    <Card className="bg-zinc-900 border-zinc-800 mb-12 rounded-none overflow-hidden">
      <div className="h-1 bg-red-600" />
      <CardHeader className="border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-red-600" />
          <CardTitle className="text-2xl font-black text-white tracking-tight">
            SELECT SEASON
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="max-w-md">
          <label className="text-sm text-zinc-500 mb-3 block uppercase tracking-wider font-bold">
            Season Year
          </label>
          <Select value={season} onValueChange={onSeasonChange}>
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white h-14 rounded-none font-bold text-lg">
              <SelectValue placeholder="Select season" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 border-zinc-700 rounded-none max-h-[400px]">
              {years.map((year) => (
                <SelectItem
                  key={year}
                  value={year}
                  className="text-white hover:bg-zinc-700 font-bold"
                >
                  {year} Season
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}