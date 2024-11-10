import React from 'react';
import { useNavigate } from 'react-router-dom';
import PixelButton from './PixelButton';
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-b from-[#F2F5ED] to-blue-100">
      <div>
        <h1
          style={{
            textAlign: "center",
            fontFamily: 'PRESS START 2P',
            letterSpacing: '5px',
            fontSize: `3rem`
          }}
        >
          monsters.fun
        </h1>

        <h2
          className="text-md mb-12"
          style={{
            fontFamily: 'PRESS START 2P',
            letterSpacing: '0px',
            lineHeight: '1.5',
            textAlign: "center",
            fontSize: `2rem`
          }}
        >
          where communities become cults
        </h2>

        <img
          src="/imgs/egg.png"
          alt="Pixel Egg"
          className="w-32 h-32 mx-auto my-12"
        />

        <div className="space-y-4">
          <PixelButton to="/create">
            Hatch Your Mon
          </PixelButton>
          <PixelButton to="view" variant="secondary">
            View Mons
          </PixelButton>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;