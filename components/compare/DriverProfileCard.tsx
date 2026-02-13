import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DriverStats } from "@/lib/types/driver";

interface DriverProfileCardProps {
  driverStats: DriverStats;
  isDriver1: boolean;
  currentTeam: string;
}

export default function DriverProfileCard({
  driverStats,
  isDriver1,
  currentTeam,
}: DriverProfileCardProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 rounded-none overflow-hidden group hover:border-red-600 transition-all duration-300">
      <div
        className={`h-1 ${isDriver1 ? "bg-gradient-to-r from-red-600 to-red-400" : "bg-gradient-to-r from-white to-zinc-300"}`}
      />
      <CardHeader className="pb-4 pt-8 relative">
        <div className="absolute top-8 right-8 text-8xl font-black text-white/5 leading-none">
          {driverStats.driver.permanentNumber || "#"}
        </div>
        <div className="relative">
          <div
            className={`inline-block px-3 py-1 mb-3 ${
              isDriver1
                ? "bg-red-600/20 border border-red-600/30"
                : "bg-white/10 border border-white/20"
            }`}
          >
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isDriver1 ? "text-red-400" : "text-white"
              }`}
            >
              Driver {isDriver1 ? "1" : "2"}
            </span>
          </div>
          <CardTitle className="text-3xl font-black text-white mb-1 tracking-tight">
            {driverStats.driver.givenName}
          </CardTitle>
          <CardTitle className="text-3xl font-black text-white/70 tracking-tight uppercase">
            {driverStats.driver.familyName}
          </CardTitle>
          <p className="text-zinc-500 mt-3 text-sm font-semibold uppercase tracking-wider">
            {driverStats.driver.nationality}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4 border-t border-zinc-800 pt-6">
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">
              Current Team
            </span>
            <span className="text-white font-bold text-sm">{currentTeam}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">
              Career Span
            </span>
            <span className="text-white font-bold text-sm">
              {driverStats.careerSpan.yearsActive} years
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-zinc-500 uppercase text-xs font-bold tracking-wider">
              Championships
            </span>
            <span
              className={`font-black text-2xl ${isDriver1 ? "text-red-400" : "text-white"}`}
            >
              {driverStats.totalChampionships}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}