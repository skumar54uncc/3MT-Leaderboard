import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import type { Finalist } from '../types';

interface PodiumProps {
  topThree: Finalist[];
}

export default function Podium({ topThree }: PodiumProps) {
  const [revealed, setRevealed] = useState<number[]>([]);

  useEffect(() => {
    // Delay before revealing bronze (3rd place) - gives time after celebration
    const timer1 = setTimeout(() => {
      setRevealed([3]);
    }, 4000); // 4 seconds delay after podium appears (2s + 2s)

    // Reveal 2nd place (silver) after 5 seconds from bronze
    const timer2 = setTimeout(() => {
      setRevealed([3, 2]);
    }, 9000); // 4s delay + 5s = 9 seconds total

    // Reveal 1st place (gold) after 5 seconds from silver
    const timer3 = setTimeout(() => {
      setRevealed([3, 2, 1]);
    }, 14000); // 4s delay + 5s + 5s = 14 seconds total

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const podiumData = [
    { finalist: topThree[1], position: 2, height: 'h-48', color: 'from-silver to-gray-300', medal: '🥈' },
    { finalist: topThree[0], position: 1, height: 'h-64', color: 'from-gold to-yellow-400', medal: '🥇' },
    { finalist: topThree[2], position: 3, height: 'h-40', color: 'from-bronze to-orange-400', medal: '🥉' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-12"
      >
        <h2 className="text-7xl font-bold text-white text-shadow mb-4">
          🎉 Final Results 🎉
        </h2>
        <p className="text-3xl text-white opacity-90">
          Congratulations to our Top 3 Finalists!
        </p>
      </motion.div>

      <div className="flex items-end justify-center space-x-6 md:space-x-12">
        {podiumData.map((item, index) => {
          const isRevealed = revealed.includes(item.position);
          
          return (
            <motion.div
              key={item.finalist.id}
              initial={{ opacity: 0, y: 100, scale: 0.8 }}
              animate={{ 
                opacity: isRevealed ? 1 : 0.3, 
                y: isRevealed ? 0 : 50, 
                scale: isRevealed ? 1 : 0.9 
              }}
              transition={{
                duration: 0.8,
                ease: 'easeOut'
              }}
              className="flex flex-col items-center flex-1 max-w-[350px]"
            >
              {/* Medal and Name */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ 
                  scale: isRevealed ? 1 : 0,
                  rotate: isRevealed ? 0 : -180,
                }}
                transition={{
                  duration: 0.8,
                  type: 'spring',
                  stiffness: 200
                }}
                className={`
                  w-full ${item.height}
                  bg-gradient-to-b ${item.color}
                  rounded-t-2xl shadow-2xl
                  flex flex-col items-center justify-center
                  mb-4 relative overflow-hidden
                  ${isRevealed ? '' : 'blur-sm'}
                `}>
                {isRevealed && (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: [0, 1.2, 1] }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="text-8xl mb-4"
                    >
                      {item.medal}
                    </motion.div>
                    <motion.h3
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-3xl font-bold text-white text-shadow text-center px-4"
                    >
                      {item.finalist.name}
                    </motion.h3>
                  </>
                )}
              </motion.div>

              {/* Podium Base */}
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: isRevealed ? 1 : 0.5 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut'
                }}
                className={`
                  w-full h-12
                  bg-gradient-to-b ${item.color}
                  rounded-b-lg shadow-lg
                `}
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

