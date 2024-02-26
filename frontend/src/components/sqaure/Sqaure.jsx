import React, { useState } from "react";
import "./Sqaure.css";
import { circleSvg, crossSvg } from "../../constants";

const Sqaure = ({ setGameState, id, currentPlayer, setCurrentPlayer }) => {
  const [icon, setIcon] = useState(null);

  const handleSetIcon = () => {
    if (!icon) {
      if (currentPlayer === "circle") {
        setIcon(circleSvg);
      } else {
        setIcon(crossSvg);
      }
      setCurrentPlayer(currentPlayer === "circle" ? "cross" : "circle");
    }
  };

  return (
    <div onClick={handleSetIcon} className="sqaure">
      {icon}
    </div>
  );
};

export default Sqaure;
