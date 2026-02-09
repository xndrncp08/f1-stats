'use client';

import { useQuery, useQueries } from '@tanstack/react-query';
import { 
  getCurrentDrivers, 
  getCurrentStandings, 
  getDriverStats,
  getDriverComparison 
} from '../api/fetchers';

// Hook to get all current drivers
export function useDrivers() {
  return useQuery({
    queryKey: ['drivers', 'current'],
    queryFn: getCurrentDrivers,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
}

// Hook to get current driver standings
export function useDriverStandings() {
  return useQuery({
    queryKey: ['standings', 'drivers', 'current'],
    queryFn: getCurrentStandings,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

// Hook to get detailed driver statistics
export function useDriverStats(driverId: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['driver', driverId, 'stats'],
    queryFn: () => getDriverStats(driverId),
    enabled: enabled && !!driverId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

// Hook to compare two drivers
export function useDriverComparison(driverId1: string, driverId2: string) {
  return useQuery({
    queryKey: ['comparison', driverId1, driverId2],
    queryFn: () => getDriverComparison(driverId1, driverId2),
    enabled: !!driverId1 && !!driverId2,
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
}

// Hook to get multiple driver stats at once
export function useMultipleDriverStats(driverIds: string[]) {
  return useQueries({
    queries: driverIds.map(driverId => ({
      queryKey: ['driver', driverId, 'stats'],
      queryFn: () => getDriverStats(driverId),
      staleTime: 1000 * 60 * 30,
    })),
  });
}

// Hook to get driver by season
export function useDriversBySeason(season: string) {
  return useQuery({
    queryKey: ['drivers', season],
    queryFn: () => getCurrentDrivers(), // Replace with season-specific fetcher
    enabled: !!season,
    staleTime: 1000 * 60 * 60, // 1 hour for historical data
  });
}
