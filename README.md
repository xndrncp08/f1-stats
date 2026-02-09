# 🏎️ F1 Driver Statistics Dashboard

A comprehensive Formula 1 driver statistics dashboard built with Next.js 15, featuring real-time telemetry, historical data analysis, and modern UI components.

## 🎯 Core Features

### 1. **Driver Profiles**
- Detailed career statistics (wins, podiums, championships)
- Current season standings and performance
- Head-to-head driver comparisons
- Dynamic SEO-optimized pages

### 2. **Live Telemetry Visualizations**
- Real-time car speed, RPM, and gear changes
- Lap-by-lap performance tracking
- Interactive charts using Recharts
- WebSocket updates for live sessions

### 3. **Historical Data Analysis**
- Full career race results
- Season-by-season breakdowns
- Statistical trends and patterns
- Multi-year comparisons

### 4. **Race Calendar**
- Interactive schedule with timezone conversion
- Countdown timers to next race
- Circuit information and history
- Weather forecasts

### 5. **Constructor Standings**
- Team rankings and points
- Performance trends over seasons
- Driver contributions to team success

## 🛠️ Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | Next.js 15 (App Router) | Server Components, SSR, SEO optimization |
| **Styling** | Tailwind CSS | Utility-first styling with dark mode |
| **UI Components** | Shadcn/UI | Accessible, customizable components |
| **Data Fetching** | TanStack Query (React Query) | Caching, background updates |
| **Charts** | Recharts | Interactive data visualizations |
| **Primary API** | Jolpica F1 API | Historical race data (Ergast replacement) |
| **Live Data** | OpenF1 API | Real-time telemetry and timing |
| **Icons** | Lucide React | Modern icon library |

## 📁 Project Structure

```
f1-stats/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Home page
│   ├── drivers/
│   │   ├── page.tsx              # All drivers list
│   │   └── [id]/
│   │       └── page.tsx          # Individual driver page
│   ├── compare/
│   │   └── page.tsx              # Driver comparison tool
│   ├── calendar/
│   │   └── page.tsx              # Race schedule
│   ├── constructors/
│   │   └── page.tsx              # Team standings
│   └── live/
│       └── page.tsx              # Live telemetry
├── components/
│   ├── ui/                        # Shadcn/UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── table.tsx
│   │   └── tabs.tsx
│   ├── drivers/
│   │   ├── DriverCard.tsx        # Driver profile card
│   │   ├── DriverStats.tsx       # Stats display
│   │   └── DriverComparison.tsx  # Comparison view
│   ├── charts/
│   │   ├── TelemetryChart.tsx    # Live telemetry
│   │   ├── PerformanceChart.tsx  # Historical performance
│   │   └── StandingsChart.tsx    # Rankings visualization
│   ├── calendar/
│   │   ├── RaceCard.tsx          # Race event card
│   │   └── CountdownTimer.tsx    # Race countdown
│   └── layout/
│       ├── Header.tsx            # Navigation header
│       └── Footer.tsx            # Site footer
├── lib/
│   ├── api/
│   │   ├── jolpica.ts           # Jolpica F1 API client
│   │   ├── openf1.ts            # OpenF1 API client
│   │   └── fetchers.ts          # Data fetching functions
│   ├── hooks/
│   │   ├── useDrivers.ts        # Driver data hook
│   │   ├── useTelemetry.ts      # Telemetry hook
│   │   └── useRaces.ts          # Race data hook
│   ├── utils/
│   │   ├── cn.ts                # Class name utility
│   │   ├── format.ts            # Data formatting
│   │   └── calculations.ts      # Stats calculations
│   └── types/
│       ├── driver.ts            # Driver types
│       ├── race.ts              # Race types
│       └── telemetry.ts         # Telemetry types
└── public/
    ├── flags/                    # Country flags
    └── teams/                    # Team logos
```

## 🚀 Step-by-Step Implementation Guide

### Step 1: Project Setup
```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

### Step 2: Configure Tailwind for F1 Theme
Update `tailwind.config.js` with F1-inspired color palette:
- Carbon fiber blacks
- Neon accent colors
- Team-specific colors

### Step 3: Set Up Data Providers
Create React Query provider in root layout for:
- Automatic caching
- Background refetching
- Optimistic updates

### Step 4: Implement Core Components
1. **DriverCard Component** - Reusable driver profile card
2. **TelemetryChart** - Real-time data visualization
3. **StandingsTable** - Rankings display

### Step 5: Build API Layer
1. **Jolpica API Client** - Historical data
2. **OpenF1 Client** - Live telemetry
3. **Custom hooks** - Simplified data access

### Step 6: Create Pages
1. Home dashboard with latest standings
2. Driver profile pages with dynamic metadata
3. Comparison tool with side-by-side stats
4. Live telemetry viewer

### Step 7: Optimize Performance
- Server Components for static data
- Client Components for interactivity
- Image optimization
- Code splitting

## 🔑 Key Implementation Examples

### API Fetcher Function
```typescript
// lib/api/fetchers.ts
export async function getDriverStats(driverId: string) {
  const response = await fetch(
    `https://api.jolpi.ca/ergast/f1/drivers/${driverId}/results.json?limit=1000`
  );
  const data = await response.json();
  return processDriverData(data);
}
```

### DriverCard Component
```typescript
// components/drivers/DriverCard.tsx
export function DriverCard({ driver }) {
  return (
    <Card className="bg-zinc-900 border-zinc-800">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="text-4xl font-bold text-neon-blue">
            {driver.number}
          </div>
          <div>
            <CardTitle>{driver.name}</CardTitle>
            <CardDescription>{driver.team}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <StatsGrid stats={driver.stats} />
      </CardContent>
    </Card>
  );
}
```

### React Query Hook
```typescript
// lib/hooks/useDrivers.ts
export function useDrivers() {
  return useQuery({
    queryKey: ['drivers'],
    queryFn: getAllDrivers,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}
```

## 🎨 Design System

### Color Palette
- **Background**: `#0a0a0a` (Deep black)
- **Surface**: `#18181b` (Zinc-900)
- **Border**: `#27272a` (Zinc-800)
- **Primary**: `#3b82f6` (Blue-500)
- **Accent**: `#06b6d4` (Cyan-500)
- **Success**: `#10b981` (Emerald-500)
- **Warning**: `#f59e0b` (Amber-500)
- **Danger**: `#ef4444` (Red-500)

### Typography
- **Headings**: Font weight 700-800
- **Body**: Font weight 400-500
- **Numbers**: Tabular nums for alignment

## 📊 API Endpoints Used

### Jolpica F1 API (Historical)
- `/drivers` - All drivers
- `/drivers/{id}` - Driver details
- `/drivers/{id}/results` - Race results
- `/seasons/{year}/results` - Season results
- `/constructors` - Team standings

### OpenF1 API (Live)
- `/v1/sessions` - Active sessions
- `/v1/car_data` - Telemetry data
- `/v1/position` - Car positions
- `/v1/laps` - Lap times

## 🔐 Environment Variables
```env
NEXT_PUBLIC_JOLPICA_API=https://api.jolpi.ca/ergast/f1
NEXT_PUBLIC_OPENF1_API=https://api.openf1.org/v1
```

## 🚦 Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Open http://localhost:3000

## 📝 Key Features Breakdown

### Server Components (Static)
- Driver biography pages
- Historical race results
- Team information
- SEO metadata generation

### Client Components (Interactive)
- Live telemetry charts
- Real-time standings updates
- Driver comparison tools
- Interactive calendars

### Performance Optimizations
- React Query caching
- Next.js Image optimization
- Route prefetching
- Lazy loading for charts

## 🎯 Future Enhancements
- [ ] Push notifications for race starts
- [ ] Fantasy F1 integration
- [ ] Predictive analytics
- [ ] Social sharing features
- [ ] Multi-language support

## 📚 Resources
- [Next.js Documentation](https://nextjs.org/docs)
- [Jolpica F1 API](https://api.jolpi.ca/ergast/f1)
- [OpenF1 API Docs](https://openf1.org)
- [Recharts Documentation](https://recharts.org)
- [Shadcn/UI](https://ui.shadcn.com)

---

Built with ❤️ for F1 fans worldwide
#   f 1 - s t a t s  
 #   f 1 - s t a t s  
 