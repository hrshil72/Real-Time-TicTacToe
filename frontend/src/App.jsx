import React, { useState } from "react";
import Sqaure from "./components/sqaure/Sqaure";

const App = () => {
  let sqaures = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const [gameState, setGameState] = useState(sqaures);

  return (
    <div className="container">
      <div className="move-detection">
        <div className="left">Yourself</div>
        <div className="right">Opponent</div>
      </div>
      <div className="game-heading water-bg">Tic Tac Toe</div>
      <div className="sqaure-wrapper">
        {gameState.map((item) => {
          return item.map((e) => {
            return <Sqaure setGameState={setGameState} id={e} key={e} />;
          });
        })}
      </div>
    </div>
  );
};

export default App;
