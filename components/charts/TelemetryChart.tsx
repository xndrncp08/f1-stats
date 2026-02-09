'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { getTeamColor } from '@/lib/utils/format';

interface TelemetryChartProps {
  data: {
    driverNumber: number;
    driverName: string;
    teamColor?: string;
    data: Array<{
      time: string;
      speed: number;
      rpm: number;
      gear: number;
      throttle: number;
      brake: number;
    }>;
  }[];
  metric: 'speed' | 'rpm' | 'gear' | 'throttle' | 'brake';
  title: string;
}

export function TelemetryChart({ data, metric, title }: TelemetryChartProps) {
  // Transform data for Recharts
  const chartData = data[0]?.data?.map((point, index) => {
    const dataPoint: any = { time: point.time };
    
    data.forEach(driver => {
      if (driver.data[index]) {
        dataPoint[`driver${driver.driverNumber}`] = driver.data[index][metric];
      }
    });
    
    return dataPoint;
  }) || [];

  const getMetricConfig = () => {
    switch (metric) {
      case 'speed':
        return { unit: 'km/h', color: '#06b6d4', domain: [0, 350] };
      case 'rpm':
        return { unit: 'RPM', color: '#ec4899', domain: [0, 15000] };
      case 'gear':
        return { unit: '', color: '#10b981', domain: [0, 8] };
      case 'throttle':
        return { unit: '%', color: '#f59e0b', domain: [0, 100] };
      case 'brake':
        return { unit: '%', color: '#ef4444', domain: [0, 100] };
      default:
        return { unit: '', color: '#06b6d4', domain: [0, 'auto'] };
    }
  };

  const config = getMetricConfig();

  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
            <XAxis 
              dataKey="time" 
              stroke="#71717a"
              tick={{ fill: '#71717a', fontSize: 12 }}
            />
            <YAxis 
              stroke="#71717a"
              tick={{ fill: '#71717a', fontSize: 12 }}
              domain={config.domain}
              label={{ value: config.unit, angle: -90, position: 'insideLeft', fill: '#71717a' }}
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
            
            {data.map((driver, index) => (
              <Line
                key={driver.driverNumber}
                type="monotone"
                dataKey={`driver${driver.driverNumber}`}
                name={`#${driver.driverNumber} ${driver.driverName}`}
                stroke={driver.teamColor || config.color}
                strokeWidth={2}
                dot={false}
                animationDuration={300}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
