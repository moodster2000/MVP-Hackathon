import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EvolutionScreen = ({ name = "moodi", onComplete }) => {
  const [evolutionPhase, setEvolutionPhase] = useState('initial'); // 'initial', 'evolving', 'complete'

  useEffect(() => {
    // Start evolution after a short delay
    const startTimer = setTimeout(() => {
      setEvolutionPhase('evolving');
    }, 500);

    // Complete evolution after animation
    const completeTimer = setTimeout(() => {
      setEvolutionPhase('complete');
    }, 3000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(completeTimer);
    };
  }, []);

  const PixelMonster = ({ isEvolving }) => (
    <motion.div 
      animate={isEvolving ? {
        scale: [1, 1.2, 1],
        rotate: [0, 5, -5, 0],
        filter: ["brightness(100%)", "brightness(200%)", "brightness(100%)"]
      } : {}}
      transition={{ duration: 2 }}
      className="w-48 h-48 relative"
    >
      <svg viewBox="0 0 64 64" className="w-full h-full" shapeRendering="crispEdges">
        {evolutionPhase === 'complete' ? (
          // Evolved form - bigger, more detailed
          <g>
            <rect x="12" y="4" width="40" height="56" fill="#86efac" />
            <rect x="8" y="12" width="8" height="8" fill="#4ade80" />
            <rect x="48" y="12" width="8" height="8" fill="#4ade80" />
            <rect x="8" y="28" width="8" height="8" fill="#4ade80" />
            <rect x="48" y="28" width="8" height="8" fill="#4ade80" />
            <rect x="8" y="44" width="8" height="8" fill="#4ade80" />
            <rect x="48" y="44" width="8" height="8" fill="#4ade80" />
            <rect x="20" y="20" width="10" height="10" fill="#000000" />
            <rect x="34" y="20" width="10" height="10" fill="#000000" />
            <rect x="28" y="36" width="8" height="4" fill="#fca5a5" />
          </g>
        ) : (
          // Original form
          <g>
            <rect x="16" y="8" width="32" height="48" fill="#86efac" />
            <rect x="12" y="16" width="8" height="8" fill="#4ade80" />
            <rect x="44" y="16" width="8" height="8" fill="#4ade80" />
            <rect x="12" y="32" width="8" height="8" fill="#4ade80" />
            <rect x="44" y="32" width="8" height="8" fill="#4ade80" />
            <rect x="24" y="24" width="8" height="8" fill="#000000" />
            <rect x="40" y="24" width="8" height="8" fill="#000000" />
            <rect x="32" y="36" width="8" height="4" fill="#fca5a5" />
          </g>
        )}
      </svg>

      {/* Evolution flash effect */}
      {evolutionPhase === 'evolving' && (
        <motion.div
          className="absolute inset-0 bg-white"
          animate={{
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 2,
            times: [0, 0.5, 1],
          }}
        />
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-6">
      <motion.div 
        className="text-4xl font-mono mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        Winner
      </motion.div>
      
      <motion.div 
        className="text-2xl font-mono mt-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        ({name})
      </motion.div>

      <div className="flex-1 flex flex-col items-center justify-center">
        <PixelMonster isEvolving={evolutionPhase === 'evolving'} />
        
        <AnimatePresence mode="wait">
          {evolutionPhase === 'evolving' ? (
            <motion.div 
              key="evolving"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-xl font-mono mt-4 mb-6"
            >
              {name} is evolving...
            </motion.div>
          ) : evolutionPhase === 'complete' ? (
            <motion.div 
              key="complete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-mono mt-4"
            >
              <div>MKT CAP: $17 → 19k</div>
              <div className="text-sm mt-2">Next Fight in 40mins</div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      {evolutionPhase === 'complete' && (
        <div className="w-full space-y-4 mb-8">
          <button className="w-full p-4 rounded-full bg-indigo-400 text-white text-xl font-mono">
            View Your Party
          </button>
          <button className="w-full p-4 rounded-full bg-indigo-400 text-white text-xl font-mono">
            Home
          </button>
        </div>
      )}
    </div>
  );
};

export default EvolutionScreen;