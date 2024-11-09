import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import PixelEgg from './PixelEgg';
import MonsterDetails from './MonsterDetails';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const SakimonCreator = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isHatching, setIsHatching] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionSuccessful, setTransactionSuccessful] = useState(false);

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

  const handleHatch = async () => {
    if (!description || !publicKey) return;

    setIsProcessing(true);
    try {
      // Create a test transaction (sending 0.01 SOL to a demo address)
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey('BuHRzpGi4t9ho8rtBNCKCRrPE26EG2CGsq3YiVCkhXr7'),
          lamports: LAMPORTS_PER_SOL * 0.01, // 0.01 SOL
        })
      );

      const signature = await sendTransaction(transaction, connection);
      const confirmation = await connection.confirmTransaction(signature, 'confirmed');

      if (confirmation.value.err) {
        throw new Error('Transaction failed: ' + confirmation.value.err.toString());
      }

      setTransactionSuccessful(true);
      setIsHatching(true);
      setTimeout(() => {
        setShowDetails(true);
      }, 2000);
    } catch (error) {
      console.error('Transaction failed:', error);
      alert(`Transaction failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
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

          <div className="w-full mb-8 mt-12">
            {step === 1 ? (
              <button
                onClick={handleNext}
                disabled={!name}
                className={`w-full p-4 rounded-3xl text-white text-xl ${name ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-gray-300'
                  }`}
              >
                Next
              </button>
            ) : !publicKey ? (
              <div className="flex justify-center">
                <WalletMultiButton
                  className="w-full p-4 rounded-3xl text-white text-xl bg-indigo-500 hover:bg-indigo-600"
                  style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
                    justifyContent: 'center',
                  }}
                />
              </div>
            ) : (
              <button
                onClick={handleHatch}
                disabled={!description || isProcessing}
                className={`w-full p-4 rounded-3xl text-white text-xl ${description && !isProcessing
                  ? 'bg-indigo-500 hover:bg-indigo-600'
                  : 'bg-gray-300'
                  }`}
              >
                {isProcessing
                  ? 'Processing...'
                  : transactionSuccessful
                    ? 'Hatching...'
                    : 'Hatch for 0.01 SOL'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SakimonCreator;