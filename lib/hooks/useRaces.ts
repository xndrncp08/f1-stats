'use client';

import { useQuery } from '@tanstack/react-query';
import { 
  getRaceCalendar, 
  getNextRace, 
  getRaceResultsDetailed 
} from '../api/fetchers';

// Hook to get race calendar
export function useRaceCalendar(season: string = 'current') {
  return useQuery({
    queryKey: ['calendar', season],
    queryFn: () => getRaceCalendar(season),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
}

// Hook to get next race
export function useNextRace() {
  return useQuery({
    queryKey: ['race', 'next'],
    queryFn: getNextRace,
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });
}

// Hook to get race results
export function useRaceResults(season: string, round: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ['race', season, round, 'results'],
    queryFn: () => getRaceResultsDetailed(season, round),
    enabled: enabled && !!season && !!round,
    staleTime: 1000 * 60 * 60 * 24, // 24 hours for historical races
  });
}

// Hook to get current season's completed races
export function useCurrentSeasonRaces() {
  return useQuery({
    queryKey: ['races', 'current', 'completed'],
    queryFn: async () => {
      const calendar = await getRaceCalendar('current');
      return calendar.filter((race: any) => race.isPast);
    },
    staleTime: 1000 * 60 * 10,
  });
}

// Hook to get upcoming races
export function useUpcomingRaces() {
  return useQuery({
    queryKey: ['races', 'upcoming'],
    queryFn: async () => {
      const calendar = await getRaceCalendar('current');
      return calendar.filter((race: any) => !race.isPast);
    },
    staleTime: 1000 * 60 * 5,
  });
}
