import React, { useState } from "react";
import "./Sqaure.css";
import { circleSvg, crossSvg } from "../../constants";

const Sqaure = ({
  finishedArrayState,
  setGameState,
  id,
  currentPlayer,
  setCurrentPlayer,
  finishedState,
}) => {
  const [icon, setIcon] = useState(null);

  const handleSetIcon = () => {
    if (finishedState) return;

    if (!icon) {
      if (currentPlayer === "circle") {
        setIcon(circleSvg);
      } else {
        setIcon(crossSvg);
      }

      let myCurrentPlayer = currentPlayer;
      setCurrentPlayer(currentPlayer === "circle" ? "cross" : "circle");

      setGameState((prev) => {
        let newState = [...prev];
        const rowIndex = Math.floor(id / 3);
        const colIndex = id % 3;
        newState[rowIndex][colIndex] = myCurrentPlayer;
        return newState;
      });
    }
  };

  return (
    <div
      onClick={handleSetIcon}
      className={`sqaure ${finishedState ? "not-allowed" : ""} ${
        finishedArrayState.includes(id) ? finishedState + "-won" : ""
      }`}>
      {icon}
    </div>
  );
};

export default Sqaure;
