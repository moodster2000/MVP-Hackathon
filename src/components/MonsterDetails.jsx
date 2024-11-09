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

const MonsterDetails = ({ name = "moodi", description = "Grass Type" }) => {
  const [showBattle, setShowBattle] = useState(false);

  if (showBattle) {
    return <UpcomingFight player1={name} player2="Rizzler" />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center px-6 py-12 max-w-sm mx-auto">
        {/* Simplified header with monospace font */}
        <div className="font-mono text-center text-2xl mb-8">
          Meet <span className="text-gray-500">{name}</span>,
          <br />
          your <span className="text-gray-500">{description}</span>
        </div>

        <PixelMonster />

        {/* Stats with monospace style and better spacing */}
        <div className="font-mono w-full space-y-2 mb-12">
          <div className="flex justify-between">
            <span>Bullish</span>
            <span>(10%)</span>
          </div>
          <div className="flex justify-between">
            <span>Moody</span>
            <span>(60%)</span>
          </div>
          <div className="flex justify-between">
            <span>Fast</span>
            <span>(30%)</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="w-full mt-auto space-y-4">
          <button
            onClick={() => setShowBattle(true)}
            className="w-full p-4 rounded-full bg-indigo-400 text-white text-xl font-mono"
          >
            Battle
          </button>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MonsterDetails;
