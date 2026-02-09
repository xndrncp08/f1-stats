'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { getLiveSessionData } from '../api/fetchers';
import * as openf1 from '../api/openf1';

// Hook to get live session data
export function useLiveSession() {
  return useQuery({
    queryKey: ['session', 'live'],
    queryFn: getLiveSessionData,
    refetchInterval: 5000, // Refetch every 5 seconds
    staleTime: 0, // Always consider stale
  });
}

// Hook for live telemetry with auto-updates
export function useLiveTelemetry(sessionKey: number | null, enabled: boolean = true) {
  return useQuery({
    queryKey: ['telemetry', sessionKey],
    queryFn: () => {
      if (!sessionKey) return null;
      return openf1.getSessionTelemetry(sessionKey);
    },
    enabled: enabled && !!sessionKey,
    refetchInterval: 3000, // Update every 3 seconds
    staleTime: 0,
  });
}

// Hook to get latest sessions
export function useLatestSessions(limit: number = 5) {
  return useQuery({
    queryKey: ['sessions', 'latest', limit],
    queryFn: async () => {
      const sessions = await openf1.getSessions({});
      return sessions.slice(-limit).reverse();
    },
    staleTime: 1000 * 60 * 5,
  });
}

// Hook to check if session is live
export function useIsSessionLive(sessionKey: number | null) {
  return useQuery({
    queryKey: ['session', sessionKey, 'live'],
    queryFn: () => {
      if (!sessionKey) return false;
      return openf1.isSessionLive(sessionKey);
    },
    enabled: !!sessionKey,
    refetchInterval: 10000, // Check every 10 seconds
  });
}

// Hook for driver performance in a session
export function useDriverPerformance(sessionKey: number | null, driverNumber: number | null) {
  return useQuery({
    queryKey: ['performance', sessionKey, driverNumber],
    queryFn: () => {
      if (!sessionKey || !driverNumber) return null;
      return openf1.getDriverPerformanceSummary(sessionKey, driverNumber);
    },
    enabled: !!sessionKey && !!driverNumber,
    staleTime: 1000 * 60,
  });
}

// Custom hook for streaming telemetry updates
export function useStreamingTelemetry(sessionKey: number | null) {
  const [telemetryData, setTelemetryData] = useState<any>(null);
  const [isStreaming, setIsStreaming] = useState(false);

  useEffect(() => {
    if (!sessionKey) return;

    setIsStreaming(true);
    
    const cleanup = openf1.streamSessionData(
      sessionKey,
      (data) => {
        setTelemetryData(data);
      },
      5000 // Update every 5 seconds
    );

    return () => {
      cleanup.then(fn => fn());
      setIsStreaming(false);
    };
  }, [sessionKey]);

  return {
    data: telemetryData,
    isStreaming,
  };
}

// Hook to get lap data for a driver
export function useDriverLaps(sessionKey: number | null, driverNumber: number | null) {
  return useQuery({
    queryKey: ['laps', sessionKey, driverNumber],
    queryFn: () => {
      if (!sessionKey || !driverNumber) return null;
      return openf1.getLaps({ session_key: sessionKey, driver_number: driverNumber });
    },
    enabled: !!sessionKey && !!driverNumber,
    staleTime: 1000 * 30, // 30 seconds
  });
}

// Hook to get tire strategy
export function useTireStrategy(sessionKey: number | null, driverNumber: number | null) {
  return useQuery({
    queryKey: ['stints', sessionKey, driverNumber],
    queryFn: () => {
      if (!sessionKey || !driverNumber) return null;
      return openf1.getStints({ session_key: sessionKey, driver_number: driverNumber });
    },
    enabled: !!sessionKey && !!driverNumber,
    staleTime: 1000 * 60,
  });
}
