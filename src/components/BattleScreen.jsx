import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EvolutionScreen from "./EvolutionScreen";

const BattleScreen = ({ player1 = "Moodi", player2 = "Rizzler" }) => {
  const [player1Health, setPlayer1Health] = useState(99);
  const [player2Health, setPlayer2Health] = useState(99);
  const [currentAttacker, setCurrentAttacker] = useState("player1");
  const [attackEffect, setAttackEffect] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [battleLog, setBattleLog] = useState([]);

  const getHealthColor = (health) => {
    if (health > 60) return "#4ade80";
    if (health > 30) return "#facc15";
    return "#ef4444";
  };

  const attacks = {
    player1: [
      { type: "grass", name: "Vine Whip", damage: 20, emoji: "🌿" },
      { type: "normal", name: "Tackle", damage: 15, emoji: "👊" },
    ],
    player2: [
      { type: "fire", name: "Flame Burst", damage: 20, emoji: "🔥" },
      { type: "normal", name: "Body Slam", damage: 15, emoji: "💥" },
    ],
  };

  useEffect(() => {
    if (!isGameOver) {
      const battleTurn = setTimeout(() => {
        performAttack();
      }, 2000);
      return () => clearTimeout(battleTurn);
    }
  }, [currentAttacker, isGameOver]);

  useEffect(() => {
    if (player1Health <= 0 || player2Health <= 0) {
      setIsGameOver(true);
    }
  }, [player1Health, player2Health]);

  const [showEvolution, setShowEvolution] = useState(false);

  useEffect(() => {
    if (isGameOver) {
      const timer = setTimeout(() => {
        setShowEvolution(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isGameOver]);

  // In the render:
  if (showEvolution) {
    return (
      <EvolutionScreen
        name={player1Health > 0 ? player1 : player2}
        onComplete={() => {
          // Handle completion - maybe navigate to home
        }}
      />
    );
  }

  const performAttack = () => {
    const attacker = currentAttacker;
    const attackerMoves = attacks[attacker];
    const selectedAttack =
      attackerMoves[Math.floor(Math.random() * attackerMoves.length)];

    setAttackEffect(selectedAttack.type);

    // Add battle log
    setBattleLog((prev) =>
      [
        ...prev,
        `${attacker === "player1" ? player1 : player2} used ${
          selectedAttack.name
        }!`,
      ].slice(-3)
    );

    setTimeout(() => {
      if (attacker === "player1") {
        setPlayer2Health((prev) => Math.max(0, prev - selectedAttack.damage));
      } else {
        setPlayer1Health((prev) => Math.max(0, prev - selectedAttack.damage));
      }
      setAttackEffect(null);
      setCurrentAttacker((current) =>
        current === "player1" ? "player2" : "player1"
      );
    }, 1000);
  };

  const AttackEffect = ({ type }) => (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="absolute"
    >
      {type === "grass" && (
        <motion.div
          className="text-6xl"
          animate={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          🌿
        </motion.div>
      )}
      {type === "fire" && (
        <motion.div
          className="text-6xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
        >
          🔥
        </motion.div>
      )}
      {type === "normal" && (
        <motion.div
          className="text-6xl"
          animate={{ x: [-20, 20, 0] }}
          transition={{ duration: 0.3 }}
        >
          💥
        </motion.div>
      )}
    </motion.div>
  );

  const HealthBar = ({ health, className }) => (
    <div
      className={`w-48 h-3 bg-gray-200 rounded-full overflow-hidden ${className}`}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: getHealthColor(health) }}
        initial={{ width: `${health}%` }} // Start from current health
        animate={{ width: `${health}%` }} // Animate to new health
        transition={{ duration: 0.3 }} // Quick transition
      />
    </div>
  );

  const PixelCactus = () => (
    <motion.div
      animate={
        currentAttacker === "player1"
          ? {
              x: [0, 20, 0],
              transition: { duration: 0.3 },
            }
          : {}
      }
      className="w-32 h-32"
    >
      {/* Your existing cactus SVG */}
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        <rect x="8" y="4" width="16" height="24" fill="#86efac" />
        <rect x="6" y="8" width="4" height="4" fill="#86efac" />
        <rect x="22" y="8" width="4" height="4" fill="#86efac" />
        <rect x="12" y="12" width="4" height="4" fill="#000000" />
        <rect x="20" y="12" width="4" height="4" fill="#000000" />
        <rect x="16" y="18" width="4" height="4" fill="#fca5a5" />
      </svg>
    </motion.div>
  );

  const PixelMuffin = () => (
    <motion.div
      animate={
        currentAttacker === "player2"
          ? {
              x: [0, -20, 0],
              transition: { duration: 0.3 },
            }
          : {}
      }
      className="w-32 h-32"
    >
      {/* Your existing muffin SVG */}
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full"
        shapeRendering="crispEdges"
      >
        <rect x="8" y="8" width="16" height="16" fill="#fcd34d" />
        <rect x="6" y="12" width="20" height="4" fill="#f87171" />
        <rect x="10" y="6" width="4" height="4" fill="#60a5fa" />
        <rect x="18" y="6" width="4" height="4" fill="#ef4444" />
        <rect x="12" y="16" width="4" height="4" fill="#000000" />
        <rect x="20" y="16" width="4" height="4" fill="#000000" />
      </svg>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 relative">
      <div className="flex-1 flex flex-col">
        {/* Top Pokemon */}
        <div className="mt-8 flex flex-col items-end">
          <h2 className="text-2xl font-mono mb-2">{player2}</h2>
          <HealthBar health={player2Health} className="mb-4" />
          <PixelMuffin />
        </div>

        {/* Battle Log */}
        <div className="my-4 flex-1 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {attackEffect && (
              <motion.div
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <AttackEffect type={attackEffect} />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm">
            {battleLog.map((log, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-1"
              >
                {log}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom Pokemon */}
        <div className="mb-8">
          <PixelCactus />
          <h2 className="text-2xl font-mono mt-2">{player1}</h2>
          <HealthBar health={player1Health} className="mt-2" />
        </div>
      </div>

      {/* Game Over Screen */}
      {isGameOver && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-black/50 flex items-center justify-center"
        >
          <div className="bg-white p-8 rounded-lg text-center font-mono">
            <h2 className="text-2xl mb-4">Battle Over!</h2>
            <p className="text-xl">
              {player1Health <= 0 ? `${player2} Wins!` : `${player1} Wins!`}
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BattleScreen;
