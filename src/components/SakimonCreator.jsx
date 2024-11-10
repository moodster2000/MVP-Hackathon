import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PixelEgg from "./PixelEgg";
import MonsterDetails from "./MonsterDetails";
import PixelButton from "./PixelButton";

const SakimonCreator = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isHatching, setIsHatching] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);

  const handleNext = () => {
    if (name) setStep(2);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      if (step === 1 && name) {
        handleNext();
      } else if (step === 2 && description) {
        handleHatch();
      }
    }
  };

  const handleHatch = async () => {
    if (!description) return;
    setIsProcessing(true);
    setTransactionSuccessful(true);
    setIsHatching(true);
    setIsProcessing(false);
    setTimeout(() => {
      setShowDetails(true);
    }, 500);
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
            <PixelEgg isHatching={isHatching} />

            <div className="w-full mt-12">
              <div className="space-y-6">
                <label
                  className="block text-2xl"
                  style={{
                    fontFamily: "PRESS START 2P",
                    letterSpacing: "0px",
                    lineHeight: "1.5",
                    fontSize: "2.5rem",
                    textAlign: "center",
                  }}
                >
                  {step === 1
                    ? "What is the name of your mon?"
                    : "Your mon in two words:"}
                </label>
                <input
                  type="text"
                  value={
                    step === 1 ? name.toUpperCase() : description.toUpperCase()
                  }
                  onChange={(e) =>
                    step === 1
                      ? setName(e.target.value.toUpperCase())
                      : setDescription(e.target.value.toUpperCase())
                  }
                  onKeyPress={handleKeyPress}
                  className={`w-full p-4 rounded-3xl bg-gray-50 text-gray-600 text-xl border border-black/10 focus:outline-none focus:ring-0 focus:border-black/30 transition-colors ${step === 1 ? "text-center" : ""
                    }`}
                  placeholder={
                    step === 1
                      ? "e.g. sonicwifhat"
                      : "e.g. spicy muffin"
                  }
                  style={{
                    fontFamily: "PRESS START 2P",
                    textAlign: "center",
                    fontSize: "1.8rem",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full mb-8 mt-12">
            {step === 1 ? (
              <PixelButton
                onClick={handleNext}
                disabled={!name}
                className={`w-full p-4 text-xl ${!name ? "opacity-50" : ""}`}
              >
                Next
              </PixelButton>
            ) : (
              <PixelButton
                onClick={handleHatch}
                disabled={!description || isProcessing}
                className={`w-full p-4 text-xl ${!description || isProcessing ? "opacity-50" : ""
                  }`}
              >
                {isProcessing ? "Processing..." : transactionSuccessful ? "Hatching..." : "Hatch"}
              </PixelButton>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SakimonCreator;
