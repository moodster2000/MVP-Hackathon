import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import cacti from './imgs/cacti.png';
import evolvedCacti from './imgs/biggerCactus.png';
import PixelButton from './PixelButton';

const EvolutionScreen = ({ name = "moodi", onComplete }) => {
  const [stage, setStage] = useState('outcome');
  const [evolutionPhase, setEvolutionPhase] = useState('initial');

  const PixelMonster = ({ isEvolving }) => (
    <motion.div
      animate={isEvolving ? {
        scale: [1, 1.2, 1.5, 1.3],
        rotate: [0, 5, -5, 0, 5, -5, 0],
      } : {}}
      transition={{
        duration: 2,
        times: [0, 0.3, 0.6, 1],
        repeat: 2
      }}
      className="w-[45vw] h-[45vw] relative"
    >
      <motion.img
        src={cacti}
        alt="Monster"
        className="w-full h-full object-contain"
        animate={isEvolving ? {
          filter: [
            'brightness(1) hue-rotate(0deg)',
            'brightness(2) hue-rotate(45deg)',
            'brightness(3) hue-rotate(90deg)',
            'brightness(1) hue-rotate(0deg)'
          ]
        } : {}}
        transition={{
          duration: 2,
          times: [0, 0.3, 0.6, 1],
          repeat: 2
        }}
      />

      {/* Evolution sparkle effects */}
      {isEvolving && (
        <>
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-4 h-4 text-purple-400"
              initial={{
                x: Math.random() * 100 - 50,
                y: Math.random() * 100 - 50,
                scale: 0
              }}
              animate={{
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                scale: [0, 1, 0],
                rotate: 360
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            >
              ✨
            </motion.div>
          ))}
        </>
      )}
    </motion.div>
  );

  const startEvolution = () => {
    setStage('evolving');

    setTimeout(() => {
      setEvolutionPhase('evolving');
    }, 500);
    setTimeout(() => {
      setStage('complete');
      setEvolutionPhase('complete');
    }, 7000);
  };

  const OutcomeStage = () => {
    const [count, setCount] = useState(17);
    const targetCount = 19;

    useEffect(() => {
      // Animate the counter
      const timer = setInterval(() => {
        setCount(prev => {
          if (prev >= targetCount) {
            clearInterval(timer);
            return targetCount;
          }
          return prev + 0.1;
        });
      }, 50);

      return () => clearInterval(timer);
    }, []);

    return (
      <div className="flex flex-col items-center w-full">
        <motion.div
          className="text-4xl mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontFamily: "PRESS START 2P", fontSize: "3rem" }}
        >
          {name} WON!
        </motion.div>

        <motion.img
          src={cacti}
          alt="Monster"
          style={{ height: "300px" }}
        />

        <motion.div
          className="text-2xl mb-12 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontFamily: "PRESS START 2P", fontSize: "4rem", marginTop: "8%", marginBottom: "45%" }}
        >
          <div className="flex items-center gap-2">
            <motion.span
              key={count}
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.2 }}
            >
              ${count.toFixed(3)}
            </motion.span>
          </div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="text-green-500 mt-6"
            style={{ fontFamily: "PRESS START 2P", fontSize: "2.5rem" }}
          >
            <motion.span
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 0.6, repeat: Infinity }}
            >
              +{(targetCount - 17).toFixed()}k
            </motion.span>
            <span> MKT CAP</span>
          </motion.div>
        </motion.div>

        <div className="w-full space-y-4">
          <PixelButton
            onClick={() => { }}
            className="w-full p-4 text-xl"
          >
            Share
          </PixelButton>
          <PixelButton
            onClick={startEvolution}
            className="w-full p-4 text-xl"
            variant="secondary"
          >
            Next
          </PixelButton>
        </div>
      </div>
    );
  };

  const EvolvingStage = () => (
    <div className="flex flex-col items-center justify-center" style={{ marginTop: "60%" }}>
      <PixelMonster isEvolving={evolutionPhase === 'evolving'} />
      <motion.div
        className="text-2xl mt-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        style={{
          fontFamily: "PRESS START 2P",
          fontSize: "2rem",
          textAlign: "center",
          lineHeight: "1.5"
        }}
      >
        Oh wait!? <br />
        <span style={{ marginTop: "1.5rem", display: "block" }}>{name} is evolving...</span>
      </motion.div>
    </div>
  );

  const CompleteStage = () => (
    <div className="h-screen flex flex-col items-center w-full">
      <div className="flex-1 flex flex-col items-center justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.img
            src={evolvedCacti}
            alt="Evolved Monster"
            className="w-[65vw] h-[65vw] object-contain"
          />
        </motion.div>

        <motion.div
          className="text-2xl mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ fontFamily: "PRESS START 2P", fontSize: "3rem" }}
        >
          $19k MKT CAP
        </motion.div>
      </div>

      <div className="w-full space-y-4 mb-6">
        <PixelButton
          onClick={() => { }}
          className="w-full p-4 text-xl"
        >
          Share
        </PixelButton>
        <PixelButton
          onClick={() => { }}
          className="w-full p-4 text-xl"
          variant="secondary"
        >
          Home
        </PixelButton>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col items-center px-6">
      <AnimatePresence mode="wait">
        {stage === 'outcome' && <OutcomeStage />}
        {stage === 'evolving' && <EvolvingStage />}
        {stage === 'complete' && <CompleteStage />}
      </AnimatePresence>
    </div>
  );
};

export default EvolutionScreen;