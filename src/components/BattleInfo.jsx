import React, { useState, useEffect } from "react";
import PixelButton from "./PixelButton";

const BattleInfo = ({ name, marketCap = "10,000" }) => {
  const [timeLeft, setTimeLeft] = useState(4);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div
        className="text-center"
        style={{ marginTop: "5%", fontSize: "2.3rem", fontFamily: "PRESS START 2P" }}
      >
        ${marketCap} MKT CAP
      </div>

      <div
        className="text-3xl text-center text-[#FF4444]"
        style={{ fontFamily: "PRESS START 2P", marginBottom: "5%" }}
      >
        Battle starts in {timeLeft} sec
      </div>
    </div>
  );
};

export default BattleInfo;