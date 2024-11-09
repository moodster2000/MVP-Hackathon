import React from 'react';
import { motion } from 'framer-motion';

const PixelEgg = ({ isHatching = false }) => (
  <motion.div
    className="w-32 h-32 mx-auto my-12"
    animate={isHatching ? {
      x: [-2, 2, -2, 2, 0],
      y: [-1, 1, -1, 1, 0],
    } : {
      scale: [1, 1.02, 1],
    }}
    transition={{
      duration: isHatching ? 0.3 : 2,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  >
    <svg viewBox="0 0 32 32" className="w-full h-full" shapeRendering="crispEdges">
      {/* Outline */}
      <path d="M14 4h4v1h-4v-1z" fill="#000000" />
      <path d="M12 5h2v1h-2v-1zM18 5h2v1h-2v-1z" fill="#000000" />
      <path d="M11 6h1v1h-1v-1zM20 6h1v1h-1v-1z" fill="#000000" />
      <path d="M10 7h1v2h-1v-2z" fill="#000000" />
      <path d="M21 7h1v2h-1v-2z" fill="#000000" />
      <path d="M9 9h1v14h-1v-14z" fill="#000000" />
      <path d="M22 9h1v14h-1v-14z" fill="#000000" />
      <path d="M10 23h1v2h-1v-2z" fill="#000000" />
      <path d="M21 23h1v2h-1v-2z" fill="#000000" />
      <path d="M11 25h1v1h-1v-1zM20 25h1v1h-1v-1z" fill="#000000" />
      <path d="M12 26h2v1h-2v-1zM18 26h2v1h-2v-1z" fill="#000000" />
      <path d="M14 27h4v1h-4v-1z" fill="#000000" />

      {/* Dark blue bottom shading */}
      <path d="M10 21h12v2h-12v-2z" fill="#6366f1" />

      {/* Main blue fill */}
      <path d="M11 7h9v14h-9v-14z" fill="#93c5fd" />
      <path d="M10 9h1v12h-1v-12z" fill="#93c5fd" />
      <path d="M20 9h1v12h-1v-12z" fill="#93c5fd" />

      {/* Light highlights */}
      <path d="M13 8h2v2h-2v-2z" fill="#ffffff" />
      <path d="M17 8h2v2h-2v-2z" fill="#ffffff" />
      <path d="M15 13h2v2h-2v-2z" fill="#ffffff" />

      {/* Gray shading at top */}
      <path d="M14 5h4v1h-4v-1z" fill="#4b5563" />
      <path d="M13 6h1v1h-1v-1zM18 6h1v1h-1v-1z" fill="#4b5563" />
    </svg>
  </motion.div>
);

export default PixelEgg;