import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatPercentage } from "@/lib/utils/format";

interface CompareStatItem {
  label: string;
  d1: number;
  d2: number;
  isPercentage?: boolean;
  isAverage?: boolean;
}

interface StatComparisonProps {
  compareStats: CompareStatItem[];
}

export default function StatComparison({ compareStats }: StatComparisonProps) {
  const getPercentageWidth = (
    d1: number,
    d2: number,
    isAverage: boolean = false,
  ) => {
    if (isAverage) {
      // For averages (lower is better), flip the percentages
      const total = d1 + d2;
      const d1Percent = total > 0 ? (d2 / total) * 100 : 50;
      const d2Percent = total > 0 ? (d1 / total) * 100 : 50;
      return { d1: d1Percent, d2: d2Percent };
    }

    const total = d1 + d2;
    const d1Percent = total > 0 ? (d1 / total) * 100 : 50;
    const d2Percent = total > 0 ? (d2 / total) * 100 : 50;
    return { d1: d1Percent, d2: d2Percent };
  };

  return (
    <Card className="bg-zinc-900 border-zinc-800 rounded-none overflow-hidden mb-8">
      <div className="h-1 bg-red-600" />
      <CardHeader className="border-b border-zinc-800/50 bg-zinc-900/50 backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-red-600" />
          <CardTitle className="text-2xl font-black text-white tracking-tight">
            CAREER STATISTICS
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <div className="space-y-8">
          {compareStats.map((stat, index) => {
            const percentages = getPercentageWidth(
              stat.d1,
              stat.d2,
              stat.isAverage || false,
            );

            return (
              <div key={index}>
                <div className="flex items-center justify-center mb-3">
                  <span className="text-sm font-black text-zinc-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 text-right">
                    <span className="text-3xl font-black text-red-500">
                      {stat.isPercentage
                        ? formatPercentage(stat.d1)
                        : stat.isAverage
                          ? stat.d1.toFixed(1)
                          : Math.round(stat.d1)}
                    </span>
                  </div>
                  <div className="flex-1 flex items-center gap-2">
                    <div className="flex-1 h-12 bg-zinc-800 rounded-sm overflow-hidden flex border border-zinc-700">
                      <div
                        className="bg-gradient-to-r from-red-600 to-red-500 flex items-center justify-end pr-3 transition-all duration-500"
                        style={{ width: `${percentages.d1}%` }}
                      >
                        {percentages.d1 > 15 && (
                          <span className="text-sm font-black text-white">
                            {percentages.d1.toFixed(0)}%
                          </span>
                        )}
                      </div>
                      <div
                        className="bg-gradient-to-r from-white to-zinc-200 flex items-center justify-start pl-3 transition-all duration-500"
                        style={{ width: `${percentages.d2}%` }}
                      >
                        {percentages.d2 > 15 && (
                          <span className="text-sm font-black text-black">
                            {percentages.d2.toFixed(0)}%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <span className="text-3xl font-black text-white">
                      {stat.isPercentage
                        ? formatPercentage(stat.d2)
                        : stat.isAverage
                          ? stat.d2.toFixed(1)
                          : Math.round(stat.d2)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
