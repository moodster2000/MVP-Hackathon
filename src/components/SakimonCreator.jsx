import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelEgg from './PixelEgg';
import MonsterDetails from './MonsterDetails';

const SakimonCreator = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isHatching, setIsHatching] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const handleNext = () => {
    if (name) setStep(2);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (step === 1 && name) {
        handleNext();
      } else if (step === 2 && description) {
        handleHatch();
      }
    }
  };

  const handleHatch = () => {
    if (description) {
      setIsHatching(true);
      // Trigger the transition after a delay
      setTimeout(() => {
        setShowDetails(true);
      }, 2000); // Adjust timing as needed
    }
  };

  if (showDetails) {
    return <MonsterDetails name={name} description={description} />;
  }

  return (
    <AnimatePresence>
      <motion.div
        className="min-h-screen flex flex-col px-8"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center">
            {step === 2 && (
              <div className="mb-8 text-3xl"
                style={{
                  fontFamily: 'PRESS START 2P',
                  letterSpacing: '0px',
                }}>
                {`Hello ${name}!`}
              </div>
            )}
            <PixelEgg isHatching={isHatching} />

            <div className="w-full mt-12">
              <div className="space-y-6">
                <label className="block text-2xl"
                  style={{
                    fontFamily: 'PRESS START 2P',
                    letterSpacing: '0px',
                    lineHeight: '1.5'
                  }}>
                  {step === 1 ? "What's your mon's name?" : 'Your mon in two words:'}
                </label>
                <input
                  type="text"
                  value={step === 1 ? name.toUpperCase() : description.toUpperCase()}
                  onChange={(e) => step === 1 ? setName(e.target.value.toUpperCase()) : setDescription(e.target.value.toUpperCase())}
                  onKeyPress={handleKeyPress}
                  className={`w-full p-4 rounded-3xl bg-gray-50 text-gray-600 text-xl border border-black/10 focus:outline-none focus:ring-0 focus:border-black/30 transition-colors ${step === 1 ? 'text-center' : ''}`}
                  placeholder={step === 1 ? "e.g. HarryPotterMonInu" : "e.g: electric rat or spicy muffin"}
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    textAlign: 'center'
                  }}
                />
              </div>
            </div>
          </div>

          <button
            onClick={step === 1 ? handleNext : handleHatch}
            disabled={step === 1 ? !name : !description}
            className={`w-full p-4 rounded-3xl text-white text-xl mb-8 mt-12 ${(step === 1 ? name : description)
              ? 'bg-indigo-500 hover:bg-indigo-600'
              : 'bg-gray-300'
              }`}
          >
            {step === 1 ? 'Next' : 'Hatch'}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SakimonCreator;