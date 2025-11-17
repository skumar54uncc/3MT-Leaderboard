import { motion, AnimatePresence } from 'framer-motion';
import type { Finalist } from '../types';

interface LeaderboardProps {
  finalists: Finalist[];
  isComplete: boolean;
}

export default function Leaderboard({ finalists, isComplete }: LeaderboardProps) {
  const getRankColor = (rank: number) => {
    if (rank === 1) return 'from-gold to-yellow-400';
    if (rank === 2) return 'from-silver to-gray-300';
    if (rank === 3) return 'from-bronze to-orange-400';
    return 'from-gray-600 to-gray-700';
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return rank;
  };

  const getRankAnimation = (finalist: Finalist) => {
    if (finalist.rank < finalist.previousRank) {
      return { y: -20, opacity: 0 };
    } else if (finalist.rank > finalist.previousRank) {
      return { y: 20, opacity: 0 };
    }
    return { y: 0, opacity: 1 };
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      <div className="space-y-1.5">
        <AnimatePresence mode="popLayout">
          {finalists.map((finalist) => {
            const isTopThree = finalist.rank <= 3;
            const rankChange = finalist.rank - finalist.previousRank;
            
            return (
              <motion.div
                key={finalist.id}
                layout
                initial={getRankAnimation(finalist)}
                animate={{ y: 0, opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  type: 'spring',
                  stiffness: 500,
                  damping: 30,
                  layout: { duration: 0.5 }
                }}
                className={`
                  relative overflow-hidden rounded-lg
                  ${isTopThree ? 'shadow-2xl' : 'shadow-lg'}
                  ${isComplete && isTopThree ? 'ring-4 ring-opacity-50' : ''}
                  ${isComplete && finalist.rank === 1 ? 'ring-gold' : ''}
                  ${isComplete && finalist.rank === 2 ? 'ring-silver' : ''}
                  ${isComplete && finalist.rank === 3 ? 'ring-bronze' : ''}
                `}
              >
                <div className={`
                  bg-gradient-to-r ${getRankColor(finalist.rank)}
                  p-3 flex items-center justify-between
                  ${isTopThree ? 'min-h-[75px]' : 'min-h-[60px]'}
                `}>
                  {/* Rank */}
                  <div className="flex items-center space-x-4 flex-1">
                    <div className={`
                      text-2xl font-bold text-white text-shadow
                      ${isTopThree ? 'text-3xl' : ''}
                    `}>
                      {getRankIcon(finalist.rank)}
                    </div>

                    {/* Name */}
                    <div className="flex-1">
                      <h3 className={`
                        text-lg font-bold text-white text-shadow
                        ${isTopThree ? 'text-xl' : ''}
                      `}>
                        {finalist.name}
                      </h3>
                      {rankChange !== 0 && !isComplete && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`
                            text-sm mt-1 font-semibold
                            ${rankChange < 0 ? 'text-green-200' : 'text-red-200'}
                          `}>
                          {rankChange < 0 ? '↑' : '↓'} {Math.abs(rankChange)}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Position Badge */}
                  <div className={`
                    bg-white bg-opacity-20 backdrop-blur-sm
                    rounded-full px-3 py-1.5
                    ${isTopThree ? 'px-4 py-2' : ''}
                  `}>
                    <div className="text-center">
                      <div className={`
                        text-[10px] font-semibold text-white opacity-90
                        ${isTopThree ? 'text-xs' : ''}
                      `}>
                        Position
                      </div>
                      <div className={`
                        text-lg font-bold text-white
                        ${isTopThree ? 'text-xl' : ''}
                      `}>
                        #{finalist.rank}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

