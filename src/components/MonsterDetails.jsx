import React, { useState } from "react";
import { motion } from "framer-motion";
import { Slider, ThemeProvider } from "@material-tailwind/react";
import UpcomingFight from './UpcomingFight';


const PixelMonster = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, type: "spring" }}
    className="w-24 h-24 mx-auto my-8"
  >
    <svg
      viewBox="0 0 24 24"
      className="w-full h-full"
      shapeRendering="crispEdges"
    >
      {/* Simplified monster design */}
      <rect x="8" y="4" width="8" height="16" fill="#86efac" />
      <rect x="6" y="6" width="2" height="2" fill="#86efac" />
      <rect x="16" y="6" width="2" height="2" fill="#86efac" />
      <rect x="10" y="8" width="2" height="2" fill="#000000" />
      <rect x="14" y="8" width="2" height="2" fill="#000000" />
      <rect x="12" y="12" width="2" height="2" fill="#fca5a5" />
    </svg>
  </motion.div>
);

const MonsterDetails = ({ name = "moodi", description = "taco" }) => {
    const [degenLevel, setDegenLevel] = useState(50);
    const [showBattle, setShowBattle] = useState(false);
  
    if (showBattle) {
      return <UpcomingFight player1={name} player2="Rizzler" />;
    }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white flex flex-col px-6">
        {/* Header */}
        <div className="pt-8 space-y-1">
          <div className="text-4xl font-mono">Meet</div>
          <div className="text-2xl font-mono">({name})</div>
        </div>

        {/* Monster */}
        <PixelMonster />

        {/* Info */}
        <div className="font-mono space-y-6">
          <div className="text-xl">$10k MKT CAP</div>

          <div>Type: {description}</div>

          <div className="space-y-2">
            <div>Personality:</div>
            <ul className="list-disc pl-6">
              <li>kek (10%)</li>
              <li>key (90%)</li>
            </ul>
          </div>
        </div>

        {/* Bottom section with buttons and slider */}
        <div className="mt-auto mb-8 relative">
          {/* Buttons */}
          <div className="space-y-4 mt-4">
            <button
              onClick={() => setShowBattle(true)}
              className="w-full p-4 rounded-full bg-indigo-400 text-white text-xl font-mono"
            >
              Battle
            </button>
            <button className="w-full p-4 rounded-full bg-indigo-400 text-white text-xl font-mono">
              Buy
            </button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MonsterDetails;
