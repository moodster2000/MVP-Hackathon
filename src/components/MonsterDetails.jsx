import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Slider, ThemeProvider } from "@material-tailwind/react";
import UpcomingFight from "./UpcomingFight";
import PixelButton from "./PixelButton";
import cacti from "./imgs/cacti.png";
import { useNavigate } from "react-router-dom";

const PixelMonster = () => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ duration: 0.5, type: "spring" }}
  >
    <img src={cacti} alt="Pixel Monster" />
  </motion.div>
);

const PixelMeter = ({ value = 40 }) => {
  const totalBars = 10;
  const filledBars = Math.floor((value / 100) * totalBars);

  return (
    <div className="w-full my-8 text-center">
      <div className="flex justify-center gap-1 mb-2">
        {[...Array(totalBars)].map((_, index) => (
          <div
            key={index}
            className={`w-8 h-12 ${index < filledBars ? 'bg-black' : 'bg-gray-300'
              } rounded-sm`}
          />
        ))}
      </div>
      <div
        className="mt-2 text-2xl"
        style={{ fontFamily: "PRESS START 2P" }}
      >
        Degeneracy
      </div>
    </div>
  );
};

const BattleInfo = ({ name, onViewBattle, marketCap = "10,000" }) => {
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div
        className="text-center"
        style={{ marginTop: "25%", fontSize: "2.3rem", fontFamily: "PRESS START 2P" }}
      >
        ${marketCap} MKT CAP
      </div>

      <div
        className="text-3xl text-center"
        style={{ fontFamily: "PRESS START 2P", marginBottom: "5%" }}
      >
        Next Fight in {timeLeft} sec
      </div>

      <div className="w-full space-y-4">
        <PixelButton
          onClick={() => onViewBattle()}
          className="w-full p-4 text-xl"
        >
          View Battle
        </PixelButton>

        <PixelButton
          onClick={() => { }}
          className="w-full p-4 text-xl"
        >
          Buy ${name}
        </PixelButton>
      </div>
    </div>
  );
};

const MonsterDetails = ({ name = "moodi", description = "Grass Type" }) => {
  const [moveToFight, setMoveToFight] = useState(false);
  const [showBattle, setShowBattle] = useState(false);

  if (moveToFight) {
    return <UpcomingFight player1={name} player2="Rizzler" />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center px-6 py-12 max-w-sm mx-auto">
        {/* Header section */}
        <div className="text-center">
          <div
            style={{
              fontSize: "3.5rem",
              marginBottom: "1%",
              lineHeightStep: "0px",
            }}
          >
            Meet {name}
          </div>
        </div>

        <PixelMonster />

        {!showBattle ? (
          <>
            {/* Stats section */}
            <PixelMeter value={40} />
            <div
              className="font-mono w-full"
              style={{
                fontFamily: "PRESS START 2P",
                fontSize: "2rem",
                letterSpacing: "0px",
              }}
            >
              <motion.div
                className="flex justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <span>Fast</span>
                <span>(10%)</span>
              </motion.div>
              <motion.div
                className="flex justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span>Prickly</span>
                <span>(90%)</span>
              </motion.div>
              <motion.div
                className="flex justify-between"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <span>Aggressive</span>
                <span>(40%)</span>
              </motion.div>
            </div>

            <div className="w-full mt-auto">
              <PixelButton
                onClick={() => setShowBattle(true)}
                className="w-full p-4 text-xl"
              >
                Next
              </PixelButton>
            </div>
          </>
        ) : (
          <BattleInfo
            name={name}
            onViewBattle={() => setMoveToFight(true)}
            marketCap="17,000"
          />
        )}
      </div>
    </ThemeProvider>
  );
};

export default MonsterDetails;
