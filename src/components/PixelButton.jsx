import React from 'react';
import { useNavigate } from 'react-router-dom';

const PixelButton = ({
  children,
  to,
  onClick,
  className = "",
  style = {},
  disabled = false,
  variant = 'primary'
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

  const baseClasses = "w-full md:w-[500px] font-mono text-4xl py-4 px-8 rounded-2xl transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const variantClasses = variant === 'primary'
    ? "bg-[#6B68C7] hover:bg-[#5856BC] text-white border-4 border-[#5856BC]"
    : "bg-gray-200 hover:bg-gray-300 text-gray-800";

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${className}`}
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