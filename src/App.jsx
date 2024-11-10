import React, { useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import LandingPage from './components/LandingPage';
import SakimonCreator from './components/SakimonCreator';
import MonsterInfo from './components/MonsterInfo';
import '@solana/wallet-adapter-react-ui/styles.css';

const App = () => {
  // Get RPC URL from environment variables
  const url = process.env.REACT_APP_HELIUS_RPC_URL;
  const endpoint = useMemo(() => url, []);

  // Initialize wallet adapter
  const wallets = useMemo(() => [], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/create" element={<SakimonCreator />} />
              <Route path="/info/:name" element={<MonsterInfo />} />
            </Routes>
          </Router>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;