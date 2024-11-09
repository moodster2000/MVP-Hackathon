import React from 'react';
import { motion } from 'framer-motion';

const PixelEgg = ({ isHatching = false }) => (
  <motion.div
    style = {{height: "180px"}}
    animate={isHatching ? {
      x: [-2, 2, -2, 2, 0],
      y: [-1, 1, -1, 1, 0],
    } : {
      scale: [1, 1.1, 1.05],
    }}
    transition={{
      duration: isHatching ? 0.3 : 2,
      repeat: Infinity,
      repeatType: "reverse"
    }}
  >
    <img
      src="/imgs/egg.png"
      alt="Pixel Egg"
      className="w-full h-full"
    />
  </motion.div>
);

export default PixelEgg;