import React from 'react';
import { useNavigate } from 'react-router-dom';

const PixelButton = ({ 
  children, 
  to, 
  onClick, 
  className = "", 
  style = {}, 
  disabled = false 
}) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    if (disabled) return;
    
    if (onClick) {
      onClick(e);
    }
    if (to) {
      navigate(to);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`w-full md:w-[500px] bg-[#6B68C7] hover:bg-[#5856BC] text-white font-mono text-4xl py-4 px-8 rounded-2xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      style={{
        fontFamily: 'PRESS START 2P',
        fontSize: '2rem',
        ...style
      }}
    >
      {children}
    </button>
  );
};

export default PixelButton;