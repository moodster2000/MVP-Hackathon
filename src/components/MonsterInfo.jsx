import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { PixelMonster } from "./MonsterDetails";
import BattleInfo from "./BattleInfo";
import BattleScreen from "./BattleScreen";
import BuyButton from "./BuyButton";

const MonsterInfo = () => {
  const { name } = useParams();
  const [showBattle, setShowBattle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBattle(true);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  if (showBattle) {
    return <BattleScreen player1={name} player2="Rizzler" />;
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col items-center px-6 py-12 max-w-sm mx-auto">
        <div className="flex-1 flex flex-col items-center justify-center">
          <PixelMonster />

          <div className="text-center">
            <div style={{
              fontSize: "3.5rem",
              marginTop: "5%",
              marginBottom: "2%",
              lineHeightStep: "0px"
            }}>
              {name}
            </div>
          </div>

          <BattleInfo
            name={name}
            marketCap="17,000"
          />
        </div>

        <div className="mt-auto w-full">
          <BuyButton name={name} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default MonsterInfo;