'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, Radio } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function LivePage() {
  const [telemetryData, setTelemetryData] = useState<any[]>([]);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (isLive) {
      const interval = setInterval(() => {
        setTelemetryData(prev => {
          const newData = [...prev];
          const time = new Date().toLocaleTimeString();
          
          newData.push({
            time,
            verstappen: Math.floor(Math.random() * 50) + 280,
            hamilton: Math.floor(Math.random() * 50) + 275,
            leclerc: Math.floor(Math.random() * 50) + 270,
          });
          
          if (newData.length > 20) newData.shift();
          return newData;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isLive]);

  const rpmData = telemetryData.map(d => ({
    time: d.time,
    verstappen: d.verstappen * 45,
    hamilton: d.hamilton * 44,
    leclerc: d.leclerc * 43,
  }));

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
            <Zap className="h-10 w-10 text-f1-neon-pink" />
            Live Telemetry
          </h1>
          <p className="text-zinc-400">Real-time driver performance data (Demo Mode)</p>
        </div>

        <Card className="bg-zinc-900 border-zinc-800 mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Radio className={`h-5 w-5 ${isLive ? 'text-red-500 animate-pulse' : 'text-zinc-500'}`} />
                Session Status
              </CardTitle>
              <Button 
                onClick={() => setIsLive(!isLive)}
                className={isLive ? 'bg-red-500 hover:bg-red-600' : 'bg-f1-neon-green hover:bg-f1-neon-green/90'}
              >
                {isLive ? 'Stop Demo' : 'Start Demo'}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-zinc-400">
              {isLive ? '🔴 Demo telemetry streaming...' : '⚪ No active session. Click "Start Demo" to see simulated data.'}
            </p>
          </CardContent>
        </Card>

        {telemetryData.length > 0 && (
          <>
            <Card className="bg-zinc-900 border-zinc-800 mb-6">
              <CardHeader>
                <CardTitle>Speed Comparison (km/h)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={telemetryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#71717a"
                      tick={{ fill: '#71717a', fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#71717a"
                      tick={{ fill: '#71717a', fontSize: 12 }}
                      domain={[250, 350]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#18181b', 
                        border: '1px solid #27272a',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="verstappen" 
                      name="#1 Verstappen"
                      stroke="#3671C6" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hamilton" 
                      name="#44 Hamilton"
                      stroke="#27F4D2" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="leclerc" 
                      name="#16 Leclerc"
                      stroke="#E8002D" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-zinc-900 border-zinc-800">
              <CardHeader>
                <CardTitle>RPM Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={rpmData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                    <XAxis 
                      dataKey="time" 
                      stroke="#71717a"
                      tick={{ fill: '#71717a', fontSize: 12 }}
                    />
                    <YAxis 
                      stroke="#71717a"
                      tick={{ fill: '#71717a', fontSize: 12 }}
                      domain={[10000, 15000]}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#18181b', 
                        border: '1px solid #27272a',
                        borderRadius: '8px'
                      }}
                      labelStyle={{ color: '#fff' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="verstappen" 
                      name="#1 Verstappen"
                      stroke="#3671C6" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hamilton" 
                      name="#44 Hamilton"
                      stroke="#27F4D2" 
                      strokeWidth={2}
                      dot={false}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="leclerc" 
                      name="#16 Leclerc"
                      stroke="#E8002D" 
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </>
        )}

        {!isLive && telemetryData.length === 0 && (
          <Card className="bg-zinc-900 border-zinc-800">
            <CardContent className="py-12 text-center">
              <Zap className="h-16 w-16 text-zinc-700 mx-auto mb-4" />
              <p className="text-zinc-400 mb-4">No telemetry data available</p>
              <p className="text-sm text-zinc-500">Start the demo to see simulated real-time telemetry</p>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
