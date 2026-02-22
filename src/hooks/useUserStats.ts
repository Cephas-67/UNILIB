import { useState, useEffect, useCallback } from "react";

export interface UserStats {
  downloads: number;
  favorites: number;
  contributions: number;
  projects: number;
}

const DEFAULT_STATS: UserStats = {
  downloads: 0,
  favorites: 0,
  contributions: 0,
  projects: 0,
};

const getKey = (email: string) => `unilib_stats_${email}`;

export const useUserStats = (email: string | undefined) => {
  const [stats, setStats] = useState<UserStats>(DEFAULT_STATS);

  useEffect(() => {
    if (!email) return;
    const raw = localStorage.getItem(getKey(email));
    if (raw) {
      try {
        setStats({ ...DEFAULT_STATS, ...JSON.parse(raw) });
      } catch {
        setStats(DEFAULT_STATS);
      }
    } else {
      setStats(DEFAULT_STATS);
    }
  }, [email]);

  const increment = useCallback(
    (key: keyof UserStats, by = 1) => {
      if (!email) return;
      setStats((prev) => {
        const next = { ...prev, [key]: prev[key] + by };
        localStorage.setItem(getKey(email), JSON.stringify(next));
        return next;
      });
    },
    [email]
  );

  const decrement = useCallback(
    (key: keyof UserStats, by = 1) => {
      if (!email) return;
      setStats((prev) => {
        const next = { ...prev, [key]: Math.max(0, prev[key] - by) };
        localStorage.setItem(getKey(email), JSON.stringify(next));
        return next;
      });
    },
    [email]
  );

  return { stats, increment, decrement };
};
