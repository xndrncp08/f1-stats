'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { formatDriverName, getNationalityFlag, getTeamColor, formatPoints } from '@/lib/utils/format';

interface DriverCardProps {
  driver: {
    driverId: string;
    permanentNumber?: string;
    givenName: string;
    familyName: string;
    nationality: string;
    currentTeam?: string;
    currentPosition?: string;
    currentPoints?: string;
    currentWins?: string;
    code?: string;
  };
  stats?: {
    totalWins: number;
    totalPodiums: number;
    totalPoles: number;
    totalPoints: number;
  };
  onClick?: () => void;
}

export function DriverCard({ driver, stats, onClick }: DriverCardProps) {
  const teamColor = getTeamColor(driver.currentTeam || '');
  const flag = getNationalityFlag(driver.nationality);

  return (
    <Card 
      className="bg-zinc-900 border-zinc-800 hover:border-zinc-700 transition-all cursor-pointer hover:scale-105"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div 
              className="text-5xl font-bold text-white/10 leading-none"
              style={{ color: teamColor + '40' }}
            >
              {driver.permanentNumber || driver.code || '?'}
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-white">
                {formatDriverName(driver.givenName, driver.familyName, 'full')}
              </CardTitle>
              <CardDescription className="text-zinc-400 flex items-center gap-2 mt-1">
                <span className="text-lg">{flag}</span>
                <span>{driver.nationality}</span>
              </CardDescription>
            </div>
          </div>
          {driver.currentPosition && (
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                P{driver.currentPosition}
              </div>
              <div className="text-xs text-zinc-500">Position</div>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        {driver.currentTeam && (
          <div className="mb-4">
            <div 
              className="h-1 w-full rounded-full mb-2"
              style={{ backgroundColor: teamColor }}
            />
            <div className="text-sm font-medium text-zinc-300">
              {driver.currentTeam}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 text-center">
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-f1-neon-blue">
              {driver.currentPoints || (stats?.totalPoints ? formatPoints(stats.totalPoints) : '0')}
            </div>
            <div className="text-xs text-zinc-500 mt-1">Points</div>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-f1-neon-green">
              {driver.currentWins || stats?.totalWins || '0'}
            </div>
            <div className="text-xs text-zinc-500 mt-1">Wins</div>
          </div>
          <div className="bg-zinc-800/50 rounded-lg p-3">
            <div className="text-2xl font-bold text-f1-neon-pink">
              {stats?.totalPodiums || '0'}
            </div>
            <div className="text-xs text-zinc-500 mt-1">Podiums</div>
          </div>
        </div>

        {stats && (
          <div className="mt-4 pt-4 border-t border-zinc-800">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-zinc-500">Poles:</span>
                <span className="text-white font-medium">{stats.totalPoles}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">Career:</span>
                <span className="text-white font-medium">{formatPoints(stats.totalPoints)} pts</span>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
