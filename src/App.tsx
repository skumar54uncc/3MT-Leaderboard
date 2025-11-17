import { useEffect, useRef, useState } from 'react';
import { useLeaderboard } from './hooks/useLeaderboard';
import Header from './components/Header';
import StatusIndicator from './components/StatusIndicator';
import Leaderboard from './components/Leaderboard';
import Podium from './components/Podium';
import Celebration from './components/Celebration';
import FullscreenButton from './components/FullscreenButton';

// Sound effect for completion (optional)
const playCompletionSound = () => {
  try {
    // Create a simple beep sound using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 1);
  } catch (error) {
    console.log('Could not play sound:', error);
  }
};

function App() {
  // Get API key from environment variable or config
  // For production, use a backend proxy instead of exposing API key
  const apiKey = import.meta.env.VITE_GOOGLE_SHEETS_API_KEY;
  const { finalists, isComplete, lastUpdate, isUsingMockData, judgesCompleted, totalJudges } = useLeaderboard(apiKey);
  const hasPlayedSound = useRef(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showPodium, setShowPodium] = useState(false);
  const previousCompleteRef = useRef(false);

  useEffect(() => {
    // When completion status changes from false to true, show celebration
    if (isComplete && !previousCompleteRef.current) {
      setShowCelebration(true);
      playCompletionSound();
      hasPlayedSound.current = true;
      
      // Show podium after celebration completes (3 seconds) + small delay
      setTimeout(() => {
        setShowPodium(true);
      }, 3500); // Celebration is 3s, add 0.5s buffer
    }
    previousCompleteRef.current = isComplete;
  }, [isComplete]);

  const topThree = finalists.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-3mt-primary via-3mt-secondary to-3mt-primary relative">
      {/* Fullscreen Button - Positioned in bottom right */}
      <div className="fixed bottom-4 right-4 z-50">
        <FullscreenButton />
      </div>
      
      <Header />
      
      <main className="py-4">
        <StatusIndicator 
          isComplete={isComplete}
          lastUpdate={lastUpdate}
          finalistsCount={finalists.length}
          isUsingMockData={isUsingMockData}
          judgesCompleted={judgesCompleted}
          totalJudges={totalJudges}
        />

        {/* Show celebration overlay when scores complete */}
        {showCelebration && (
          <Celebration onComplete={() => {
            setShowCelebration(false);
            // Podium will be shown via setTimeout in useEffect
          }} />
        )}

        {/* Show podium after celebration, or show leaderboard */}
        {showPodium && isComplete && topThree.length === 3 ? (
          <Podium topThree={topThree} />
        ) : (
          /* Always show full leaderboard while scoring is in progress */
          <Leaderboard finalists={finalists} isComplete={isComplete} />
        )}
      </main>

      <footer className="w-full py-4 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white opacity-60 text-sm">
            © 2025 3MT® Competition • Center for Graduate Life & Learning
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

