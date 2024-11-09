import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BattleScreen from './BattleScreen';


const UpcomingFight = ({ player1 = "Moodi", player2 = "Rizzler", onComplete }) => {
  const [countdown, setCountdown] = useState(5);
  const [isBlinking, setIsBlinking] = useState(true);
  const [battleStarted, setBattleStarted] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setBattleStarted(true);
          clearInterval(timer);
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (battleStarted) {
    return <BattleScreen player1={player1} player2={player2} />;
  }

  const PixelCactus = () => (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-32 h-32"
    >
      <svg viewBox="0 0 32 32" className="w-full h-full" shapeRendering="crispEdges">
        {/* Main body - light green */}
        <path d="M12 8h8v16h-8v-16z" fill="#86efac" />
        {/* Spikes */}
        <path d="M20 10h2v2h-2v-2z M20 14h2v2h-2v-2z M20 18h2v2h-2v-2z" fill="#4ade80" />
        <path d="M10 10h2v2h-2v-2z M10 14h2v2h-2v-2z M10 18h2v2h-2v-2z" fill="#4ade80" />
        {/* Eyes */}
        <path d="M14 12h2v2h-2v-2z M18 12h2v2h-2v-2z" fill="#000000" />
        {/* Mouth */}
        <path d="M16 16h2v2h-2v-2z" fill="#fca5a5" />
      </svg>
    </motion.div>
  );

  const PixelMuffin = () => (
    <motion.div 
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      className="w-32 h-32"
    >
      <svg viewBox="0 0 32 32" className="w-full h-full" shapeRendering="crispEdges">
        {/* Main body - muffin base */}
        <path d="M10 12h12v12h-12v-12z" fill="#fcd34d" />
        {/* Top decorations */}
        <path d="M8 10h16v2h-16v-2z" fill="#f87171" />
        {/* Gems/candies */}
        <path d="M12 8h2v2h-2v-2z M18 8h2v2h-2v-2z" fill="#60a5fa" />
        <path d="M15 6h2v2h-2v-2z" fill="#ef4444" />
        {/* Eyes */}
        <path d="M14 14h2v2h-2v-2z M18 14h2v2h-2v-2z" fill="#000000" />
        {/* Mouth */}
        <path d="M16 18h2v2h-2v-2z" fill="#000000" />
      </svg>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col px-6">
      <h1 className="text-4xl font-mono mt-8 mb-12" style={{ 
        fontFamily: 'monospace',
        letterSpacing: '-0.5px',
        wordSpacing: '-8px',
        fontWeight: '800'
      }}>
        Upcoming Fight
      </h1>

      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <PixelCactus />
        
        <motion.div 
          className="text-2xl font-mono"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {player1}
        </motion.div>

        <motion.div 
          className="text-4xl font-mono"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          Vs.
        </motion.div>

        <PixelMuffin />
        
        <motion.div 
          className="text-2xl font-mono"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          {player2}
        </motion.div>

        <motion.div 
          className="text-xl font-mono mt-8"
          animate={{ opacity: isBlinking ? 1 : 0.3 }}
          transition={{ duration: 0.2 }}
        >
          in {countdown} secs...
        </motion.div>
      </div>

      <button
        className="w-full p-4 rounded-full bg-indigo-400 text-white text-xl font-mono mb-8"
      >
        Share
      </button>
    </div>
  );
};

export default UpcomingFight;