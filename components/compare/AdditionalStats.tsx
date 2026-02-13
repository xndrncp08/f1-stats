import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPercentage } from "@/lib/utils/format";
import { DriverStats } from "@/lib/types/driver";

interface AdditionalStatsProps {
  driverStats: DriverStats;
  isDriver1: boolean;
}

export default function AdditionalStats({
  driverStats,
  isDriver1,
}: AdditionalStatsProps) {
  return (
    <Card className="bg-zinc-900 border-zinc-800 rounded-none overflow-hidden">
      <div className={`h-1 ${isDriver1 ? "bg-red-600" : "bg-white"}`} />
      <CardHeader className="border-b border-zinc-800/50">
        <div className="flex items-center gap-3">
          <div className={`h-6 w-1 ${isDriver1 ? "bg-red-600" : "bg-white"}`} />
          <CardTitle className="text-xl font-black text-white tracking-tight uppercase">
            {driverStats.driver.familyName} - Additional Stats
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-6">
          <div className="bg-zinc-800/50 p-4 rounded-sm border border-zinc-700/50">
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2">
              Fastest Laps
            </div>
            <div
              className={`text-3xl font-black ${isDriver1 ? "text-red-400" : "text-white"}`}
            >
              {driverStats.totalFastestLaps}
            </div>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-sm border border-zinc-700/50">
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2">
              DNFs
            </div>
            <div className="text-3xl font-black text-white">
              {driverStats.dnfCount}
            </div>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-sm border border-zinc-700/50">
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2">
              Retirement Rate
            </div>
            <div className="text-3xl font-black text-white">
              {formatPercentage(driverStats.retirementRate)}
            </div>
          </div>
          <div className="bg-zinc-800/50 p-4 rounded-sm border border-zinc-700/50">
            <div className="text-xs text-zinc-500 uppercase tracking-wider font-bold mb-2">
              Points Per Race
            </div>
            <div
              className={`text-3xl font-black ${isDriver1 ? "text-red-400" : "text-white"}`}
            >
              {driverStats.pointsPerRace.toFixed(2)}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
