import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-8 bg-gradient-to-b from-[#F2F5ED] to-blue-100">
      <div className="max-w-md w-full text-center space-y-6">
        <h1
          className="text-4xl mb-2"
          style={{
            fontFamily: 'PRESS START 2P',
            letterSpacing: '0px',
            lineHeight: '1.5'
          }}
        >
          MONSTERS.FUN
        </h1>

        <h2
          className="text-xl mb-12"
          style={{
            fontFamily: 'PRESS START 2P',
            letterSpacing: '0px',
            lineHeight: '1.5'
          }}
        >
          The Next-generation Moncoins
        </h2>

        <img
          src="/imgs/egg.png"
          alt="Pixel Egg"
          className="w-32 h-32 mx-auto my-12"
        />

        <div className="space-y-4">
          <button
            onClick={() => navigate('/create')}
            className="w-full p-4 rounded-3xl bg-indigo-500 hover:bg-indigo-600 text-white"
            style={{
              fontFamily: 'PRESS START 2P',
              fontSize: '1rem'
            }}
          >
            Hatch Your Mon
          </button>

          <button
            onClick={() => navigate('/view')}
            className="w-full p-4 rounded-3xl bg-indigo-500 hover:bg-indigo-600 text-white"
            style={{
              fontFamily: 'PRESS START 2P',
              fontSize: '1rem'
            }}
          >
            View Mons
          </button>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;