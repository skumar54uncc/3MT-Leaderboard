import { useState, useEffect, useRef } from 'react';
import { SheetsService } from '../services/sheetsService';
import type { Finalist, LeaderboardState } from '../types';

const JUDGES_COUNT = 7;

export function useLeaderboard(apiKey?: string) {
  const [state, setState] = useState<LeaderboardState>({
    finalists: [],
    isComplete: false,
    lastUpdate: null,
    isUsingMockData: false,
    judgesCompleted: 0,
    totalJudges: JUDGES_COUNT,
  });

  const sheetsServiceRef = useRef<SheetsService | null>(null);
  const previousFinalistsRef = useRef<Finalist[]>([]);
  const apiKeyRef = useRef<string | undefined>(apiKey);

  useEffect(() => {
    // Recreate service if apiKey changes
    if (apiKeyRef.current !== apiKey) {
      apiKeyRef.current = apiKey;
      sheetsServiceRef.current = new SheetsService(apiKey);
    } else if (!sheetsServiceRef.current) {
      // Create service on first mount
      sheetsServiceRef.current = new SheetsService(apiKey);
    }

    const sheetsService = sheetsServiceRef.current;
    if (!sheetsService) {
      console.error('SheetsService not initialized');
      return;
    }

    const fetchData = async () => {
      try {
        console.log('🔄 Fetching leaderboard data...', { apiKeySet: !!apiKey });
        const { rows, isMockData } = await sheetsService.fetchSheetData();
        const finalists = sheetsService.processScores(rows);
        // Check completion based on raw rows (column J filled), not processed finalists
        const { isComplete, judgesCompleted } = sheetsService.checkCompletion(rows);

        console.log(`📊 Leaderboard updated: ${finalists.length} finalists`, {
          isComplete,
          judgesCompleted,
          isMockData,
          finalists: finalists.map(f => ({ name: f.name, score: f.totalScore, rank: f.rank }))
        });

        // Preserve previous ranks for animation (before updating state)
        // Create a deep copy of current finalists to store as previous
        const currentFinalists = previousFinalistsRef.current.map((f: Finalist) => ({ ...f }));
        
        finalists.forEach((finalist: Finalist) => {
          const previous = currentFinalists.find(
            (f: Finalist) => f.id === finalist.id
          );
          finalist.previousRank = previous?.rank ?? finalist.rank;
        });

        setState({
          finalists,
          isComplete,
          lastUpdate: new Date(),
          isUsingMockData: isMockData,
          judgesCompleted,
          totalJudges: JUDGES_COUNT,
        });

        // Store a deep copy of finalists for next comparison
        previousFinalistsRef.current = finalists.map((f: Finalist) => ({ ...f }));
      } catch (error) {
        console.error('❌ Error updating leaderboard:', error);
      }
    };

    // Initial fetch
    fetchData();

    // Set up polling interval
    const interval = setInterval(fetchData, sheetsService.getRefreshInterval());

    return () => clearInterval(interval);
  }, [apiKey]);

  return state;
}

