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
        className="min-h-screen bg-white flex flex-col px-8"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="max-w-md mx-auto w-full flex-1 flex flex-col pt-12">
          <h1 className="text-6xl font-normal mb-2" style={{ 
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            letterSpacing: '-0.5px'
          }}>
            Create Your
          </h1>
          <div className="text-5xl mb-12" style={{ 
            fontFamily: 'Press Start 2P, monospace',
            letterSpacing: '-1px',
          }}>
            Sakimon
          </div>
          
          <div className="flex-1 flex flex-col">
            <PixelEgg isHatching={isHatching} />
            
            <div className="flex-1 flex flex-col justify-between mt-12">
              <div className="space-y-6">
                <label className="block text-2xl" style={{ 
                  fontFamily: 'Press Start 2P, monospace',
                  letterSpacing: '-1px',
                  lineHeight: '1.5'
                }}>
                  {step === 1 ? 'What is the name of your mon?' : 'Describe your mon'}
                </label>
                <input
                  type="text"
                  value={step === 1 ? name : description}
                  onChange={(e) => step === 1 ? setName(e.target.value) : setDescription(e.target.value)}
                  className="w-full p-4 rounded-3xl bg-gray-50 text-gray-600 text-xl border-none"
                  placeholder={step === 1 ? "Enter Name" : "e.g: electric rat or spicy muffin"}
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}
                />
              </div>
              
              <button
                onClick={step === 1 ? handleNext : handleHatch}
                disabled={step === 1 ? !name : !description}
                className={`w-full p-4 rounded-3xl text-white text-xl mb-8 mt-12 ${
                  (step === 1 ? name : description) 
                    ? 'bg-indigo-500 hover:bg-indigo-600' 
                    : 'bg-gray-300'
                }`}
                style={{ 
                  fontFamily: 'Press Start 2P, monospace',
                  fontSize: '16px'
                }}
              >
                {step === 1 ? 'Next' : 'Hatch'}
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SakimonCreator;