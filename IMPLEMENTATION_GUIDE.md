# F1 Statistics Dashboard - Implementation Guide

## 📋 Table of Contents
1. [Quick Start](#quick-start)
2. [Project Architecture](#project-architecture)
3. [API Integration](#api-integration)
4. [Component Library](#component-library)
5. [Data Flow](#data-flow)
6. [Performance Optimization](#performance-optimization)
7. [Deployment](#deployment)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation Steps

```bash
# 1. Navigate to project directory
cd f1-stats

# 2. Install dependencies
npm install

# 3. Run development server
npm run dev

# 4. Open browser
# Navigate to http://localhost:3000
```

### Build for Production
```bash
npm run build
npm start
```

## 🏗️ Project Architecture

### Directory Structure Explanation

#### `/app` - Next.js 15 App Router
- **`layout.tsx`** - Root layout with metadata and providers
- **`page.tsx`** - Home page with dashboard
- **`providers.tsx`** - React Query client provider
- **`globals.css`** - Global styles and F1 theme

#### `/lib` - Business Logic
- **`/api`** - API clients and data fetchers
  - `jolpica.ts` - Historical F1 data (Ergast replacement)
  - `openf1.ts` - Live telemetry and real-time data
  - `fetchers.ts` - High-level data fetching functions

- **`/hooks`** - React Query hooks
  - `useDrivers.ts` - Driver data hooks
  - `useRaces.ts` - Race and calendar hooks
  - `useTelemetry.ts` - Live telemetry hooks

- **`/types`** - TypeScript definitions
  - `driver.ts` - Driver-related types
  - `race.ts` - Race and calendar types
  - `telemetry.ts` - Telemetry and live data types

- **`/utils`** - Utility functions
  - `cn.ts` - ClassNames utility
  - `format.ts` - Data formatting functions
  - `calculations.ts` - Statistics calculations

#### `/components` - React Components
- **`/ui`** - Shadcn/UI base components
- **`/drivers`** - Driver-specific components
- **`/charts`** - Data visualization components
- **`/calendar`** - Race calendar components
- **`/layout`** - Layout components

## 🔌 API Integration

### Jolpica F1 API (Historical Data)

**Base URL:** `https://api.jolpi.ca/ergast/f1`

**Key Endpoints:**
```typescript
// Get current driver standings
GET /${season}/driverStandings.json

// Get driver's race results
GET /drivers/${driverId}/results.json

// Get race calendar
GET /${season}.json

// Get constructor standings
GET /${season}/constructorStandings.json
```

**Usage Example:**
```typescript
import { getDriverStats } from '@/lib/api/fetchers';

// Server Component
const stats = await getDriverStats('max_verstappen');

// Client Component with React Query
const { data, isLoading } = useDriverStats('max_verstappen');
```

### OpenF1 API (Live Data)

**Base URL:** `https://api.openf1.org/v1`

**Key Endpoints:**
```typescript
// Get active sessions
GET /sessions?year=2024

// Get car telemetry
GET /car_data?session_key=XXX&driver_number=1

// Get lap times
GET /laps?session_key=XXX&driver_number=1
```

**Real-time Updates:**
```typescript
import { useLiveTelemetry } from '@/lib/hooks/useTelemetry';

function LiveData() {
  const { data } = useLiveTelemetry(sessionKey, {
    refetchInterval: 3000, // Update every 3 seconds
  });
}
```

## 🧩 Component Library

### DriverCard Component

**Purpose:** Display driver profile with stats

**Props:**
```typescript
interface DriverCardProps {
  driver: {
    driverId: string;
    givenName: string;
    familyName: string;
    nationality: string;
    currentTeam?: string;
    currentPosition?: string;
    currentPoints?: string;
  };
  stats?: {
    totalWins: number;
    totalPodiums: number;
    totalPoles: number;
  };
  onClick?: () => void;
}
```

**Usage:**
```tsx
<DriverCard 
  driver={{
    driverId: 'max_verstappen',
    givenName: 'Max',
    familyName: 'Verstappen',
    nationality: 'Dutch',
    currentTeam: 'Red Bull Racing',
    currentPosition: '1',
    currentPoints: '437',
  }}
  stats={{
    totalWins: 63,
    totalPodiums: 111,
    totalPoles: 40,
  }}
/>
```

### TelemetryChart Component

**Purpose:** Visualize live telemetry data

**Props:**
```typescript
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
    }>;
  }[];
  metric: 'speed' | 'rpm' | 'gear' | 'throttle' | 'brake';
  title: string;
}
```

**Usage:**
```tsx
<TelemetryChart
  data={telemetryData}
  metric="speed"
  title="Speed Comparison"
/>
```

## 📊 Data Flow

### Server Components (Static Data)
```
Page (Server) → API Fetch → Process → Render
                    ↓
                [Cache with revalidate]
```

**Example:**
```typescript
// app/drivers/page.tsx
export default async function DriversPage() {
  // Fetched on server, cached
  const standings = await getCurrentStandings();
  
  return <DriversList standings={standings} />;
}
```

### Client Components (Interactive Data)
```
Component → useQuery Hook → React Query → API
                                ↓
                          [Cache + Background Refetch]
```

**Example:**
```typescript
'use client';

function LiveDashboard() {
  const { data, isLoading } = useLiveSession();
  
  if (isLoading) return <Loading />;
  return <TelemetryDisplay data={data} />;
}
```

### Real-time Updates
```
Component → useLiveTelemetry → Poll API (3s) → Update State
                                    ↓
                            [Automatic re-render]
```

## ⚡ Performance Optimization

### 1. Server-Side Rendering (SSR)
- Static driver profiles
- Pre-rendered standings
- Cached API responses

### 2. React Query Caching
```typescript
{
  staleTime: 1000 * 60 * 10, // 10 minutes
  cacheTime: 1000 * 60 * 30, // 30 minutes
}
```

### 3. Image Optimization
```typescript
// next.config.js
{
  images: {
    domains: ['flagcdn.com', 'media.formula1.com'],
    formats: ['image/avif', 'image/webp'],
  }
}
```

### 4. Code Splitting
- Lazy load heavy components
- Dynamic imports for charts
- Route-based splitting

### 5. Data Fetching Strategies

**Static Data (Rare changes):**
```typescript
fetch(url, { next: { revalidate: 3600 } }) // 1 hour
```

**Dynamic Data (Frequent changes):**
```typescript
fetch(url, { next: { revalidate: 60 } }) // 1 minute
```

**Live Data (Real-time):**
```typescript
fetch(url, { next: { revalidate: 0 } }) // No cache
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Production deployment
vercel --prod
```

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_JOLPICA_API=https://api.jolpi.ca/ergast/f1
NEXT_PUBLIC_OPENF1_API=https://api.openf1.org/v1
```

### Build Optimization
```json
// package.json
{
  "scripts": {
    "build": "next build",
    "analyze": "ANALYZE=true next build"
  }
}
```

## 📝 Example Use Cases

### 1. View Driver Profile
```typescript
// Navigate to /drivers/max_verstappen
// Server renders with comprehensive stats
// Interactive charts load client-side
```

### 2. Compare Two Drivers
```typescript
// Navigate to /compare?d1=max_verstappen&d2=lewis_hamilton
// Side-by-side stat comparison
// Historical performance charts
```

### 3. Watch Live Race
```typescript
// Navigate to /live during active session
// Real-time telemetry updates every 3 seconds
// Live positions and timing data
```

### 4. Check Race Calendar
```typescript
// Navigate to /calendar
// See upcoming races with countdowns
// Local timezone conversion
// Weather forecasts
```

## 🎨 Customization

### Changing Theme Colors
```typescript
// tailwind.config.js
colors: {
  'f1-red': '#YOUR_COLOR',
  'f1-neon-blue': '#YOUR_COLOR',
}
```

### Adding New Metrics
```typescript
// 1. Add type definition in lib/types
// 2. Create fetcher function in lib/api
// 3. Create React Query hook in lib/hooks
// 4. Build UI component
```

### Custom Charts
```typescript
// Use Recharts components
import { LineChart, BarChart, PieChart } from 'recharts';
```

## 🐛 Troubleshooting

### API Rate Limits
- Implement request caching
- Use React Query's built-in cache
- Add retry logic

### CORS Issues
- APIs used are CORS-enabled
- If issues arise, use Next.js API routes as proxy

### Performance Issues
- Check React Query DevTools
- Monitor network requests
- Use Next.js Speed Insights

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Query Guide](https://tanstack.com/query/latest)
- [Jolpica F1 API](https://api.jolpi.ca/ergast/f1)
- [OpenF1 Documentation](https://openf1.org)
- [Recharts Examples](https://recharts.org/en-US/examples)
- [Tailwind CSS](https://tailwindcss.com/docs)

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Implement changes
4. Add tests
5. Submit pull request

---

**Built with ❤️ for Formula 1 fans**
