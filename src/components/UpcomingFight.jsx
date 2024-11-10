import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BattleScreen from "./BattleScreen";
import cacti from "./imgs/cacti.png"; // Import cactus image
import rizzler from "./imgs/rizzler.png"; // Import rizzler image
import PixelButton from "./PixelButton";

const UpcomingFight = ({
  player1 = "Moodi",
  player2 = "Rizzler",
  onComplete,
}) => {
  const [countdown, setCountdown] = useState(3);
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

  return (
    <div className="min-h-screen flex flex-col px-6">
      <h1
        style={{
          fontFamily: "PRESS START 2P",
          fontSize: "3rem",
          textAlign: "center",
          marginTop:"10%",
          marginBottom: "5%"
        }}
      >
        Upcoming Fight
      </h1>

      <div
        className="flex flex-col items-center justify-center space-y-12"
        style={{ fontFamily: "PRESS START 2P", fontSize: "2.5rem" }}
      >
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{}}>
          <img
            src={cacti}
            alt="Player 1"
            style={{ height: "200px", margin: 0 }}
          />
        </motion.div>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ margin: "0"}}>
          {player1}
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{marginTop: "0%", marginBottom: "0%"}}
        >
          Vs.
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{ height: "200px", margin: 0 }}
          >
          <img
            src={rizzler}
            alt="Player 2"
            className="w-full h-full object-contain"
          />
        </motion.div>

        <motion.div
          className="text-4xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={{margin: 0 }}
        >
          {player2}
        </motion.div>

        <motion.div
          animate={{ opacity: isBlinking ? 1 : 0.3 }}
          transition={{ duration: 0.2 }}
          style={{
            fontSize: "2rem",
            marginBottom: "5%"
          }}
        >
          in {countdown} secs...
        </motion.div>
      </div>

      <PixelButton
        className="w-full p-4 text-xl mb-8"
        style={{ fontFamily: "PRESS START 2P" }}
      >
        Share
      </PixelButton>
    </div>
  );
};

export default UpcomingFight;
