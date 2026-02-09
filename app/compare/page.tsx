import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TrendingUp } from 'lucide-react';

export default function ComparePage() {
  const driver1 = {
    name: 'Max Verstappen',
    number: '1',
    nationality: 'Dutch',
    team: 'Red Bull Racing',
    wins: 19,
    podiums: 21,
    poles: 12,
    points: 575,
    championships: 3,
  };

  const driver2 = {
    name: 'Lewis Hamilton',
    number: '44',
    nationality: 'British',
    team: 'Mercedes',
    wins: 0,
    podiums: 5,
    poles: 1,
    points: 234,
    championships: 7,
  };

  const compareStats = [
    { label: 'Wins', d1: driver1.wins, d2: driver2.wins },
    { label: 'Podiums', d1: driver1.podiums, d2: driver2.podiums },
    { label: 'Pole Positions', d1: driver1.poles, d2: driver2.poles },
    { label: 'Points', d1: driver1.points, d2: driver2.points },
    { label: 'Championships', d1: driver1.championships, d2: driver2.championships },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-b from-f1-carbon to-f1-dark">
      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <TrendingUp className="h-10 w-10 text-f1-neon-green" />
            Driver Comparison
          </h1>
          <p className="text-zinc-400">Head-to-head statistics comparison</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-900/20 to-zinc-900 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{driver1.name}</CardTitle>
              <p className="text-zinc-400">#{driver1.number} • {driver1.nationality}</p>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full bg-blue-500/20 rounded-full mb-4">
                <div className="h-full w-3/4 bg-blue-500 rounded-full" />
              </div>
              <p className="text-sm text-zinc-300">{driver1.team}</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/20 to-zinc-900 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-white">{driver2.name}</CardTitle>
              <p className="text-zinc-400">#{driver2.number} • {driver2.nationality}</p>
            </CardHeader>
            <CardContent>
              <div className="h-2 w-full bg-cyan-500/20 rounded-full mb-4">
                <div className="h-full w-2/5 bg-cyan-500 rounded-full" />
              </div>
              <p className="text-sm text-zinc-300">{driver2.team}</p>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle>2023 Season Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {compareStats.map((stat, index) => {
                const total = stat.d1 + stat.d2;
                const d1Percent = total > 0 ? (stat.d1 / total) * 100 : 50;
                const d2Percent = total > 0 ? (stat.d2 / total) * 100 : 50;
                
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-zinc-400">{stat.label}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex-1 text-right">
                        <span className="text-2xl font-bold text-blue-500">{stat.d1}</span>
                      </div>
                      <div className="flex-1 flex items-center gap-2">
                        <div className="flex-1 h-8 bg-zinc-800 rounded-lg overflow-hidden flex">
                          <div 
                            className="bg-blue-500 flex items-center justify-end pr-2"
                            style={{ width: `${d1Percent}%` }}
                          >
                            {d1Percent > 20 && (
                              <span className="text-xs font-bold text-white">{d1Percent.toFixed(0)}%</span>
                            )}
                          </div>
                          <div 
                            className="bg-cyan-500 flex items-center justify-start pl-2"
                            style={{ width: `${d2Percent}%` }}
                          >
                            {d2Percent > 20 && (
                              <span className="text-xs font-bold text-white">{d2Percent.toFixed(0)}%</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex-1 text-left">
                        <span className="text-2xl font-bold text-cyan-500">{stat.d2}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 mt-6">
          <CardContent className="py-8 text-center">
            <p className="text-zinc-400 mb-4">Want to compare different drivers?</p>
            <Button className="bg-f1-neon-green hover:bg-f1-neon-green/90 text-black">
              Select Drivers
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
