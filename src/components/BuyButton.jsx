import React from "react";
import PixelButton from "./PixelButton";

const BuyButton = ({ name }) => {
  return (
    <div className="w-full space-y-4">
      <PixelButton
        onClick={() => { }}
        className="w-full p-4 text-xl"
      >
        Buy ${name}
      </PixelButton>
    </div>
  );
};

export default BuyButton; 