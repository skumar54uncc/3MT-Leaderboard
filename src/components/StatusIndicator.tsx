interface StatusIndicatorProps {
  isComplete: boolean;
  lastUpdate: Date | null;
  finalistsCount: number;
  isUsingMockData?: boolean;
  judgesCompleted?: number;
  totalJudges?: number;
}

export default function StatusIndicator({ 
  isComplete, 
  lastUpdate, 
  finalistsCount, 
  isUsingMockData,
  judgesCompleted = 0,
  totalJudges = 7
}: StatusIndicatorProps) {
  return (
    <div className="w-full max-w-6xl mx-auto px-4 mb-4">
      <div className="glass-effect rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className={`
            w-3 h-3 rounded-full
            ${isComplete ? 'bg-green-400 animate-pulse' : 'bg-yellow-400 animate-pulse'}
          `}></div>
          <div>
            <p className="text-white font-semibold">
              {isComplete 
                ? '🎉 All Scores Complete - Here are the Finalists!' 
                : `Live Scoring in Progress - ${judgesCompleted} of ${totalJudges} Judges Completed`
              }
            </p>
            <p className="text-white text-sm opacity-70">
              {finalistsCount} Finalists • {lastUpdate ? `Last updated: ${lastUpdate.toLocaleTimeString()}` : 'Loading...'}
              {isUsingMockData && (
                <span className="ml-2 text-yellow-300 font-semibold">⚠️ Using Mock Data</span>
              )}
            </p>
          </div>
        </div>
        
        {!isComplete && (
          <div className="flex items-center space-x-2 text-white opacity-80">
            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-sm">Updating...</span>
          </div>
        )}
      </div>
    </div>
  );
}

