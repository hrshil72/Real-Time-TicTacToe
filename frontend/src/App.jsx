import React, { useEffect, useMemo, useState } from "react";
import Sqaure from "./components/sqaure/Sqaure";
import { io } from "socket.io-client";

const App = () => {
  let sqaures = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];

  const [gameState, setGameState] = useState(sqaures);
  const [currentPlayer, setCurrentPlayer] = useState("circle");
  const [finishedState, setFinishedState] = useState(false);
  const [finishedArrayState, setFinishedArrayState] = useState([]);
  const [playOnline, setPlayOnline] = useState(false);
  const [socket, setSocket] = useState(null);

  const checkWinner = () => {
    //for row
    for (let row = 0; row < gameState.length; row++) {
      if (
        gameState[row][0] === gameState[row][1] &&
        gameState[row][1] === gameState[row][2]
      ) {
        setFinishedArrayState([row * 3 + 0, row * 3 + 1, row * 3 + 2]);
        return gameState[row][0];
      }
    }

    //for coloumn
    for (let col = 0; col < gameState.length; col++) {
      if (
        gameState[0][col] === gameState[1][col] &&
        gameState[1][col] === gameState[2][col]
      ) {
        setFinishedArrayState([0 * 3 + col, 1 * 3 + col, 2 * 3 + col]);
        return gameState[0][col];
      }
    }

    if (
      gameState[0][0] === gameState[1][1] &&
      gameState[1][1] === gameState[2][2]
    )
      return gameState[0][0];
    if (
      gameState[0][2] === gameState[1][1] &&
      gameState[1][1] === gameState[2][0]
    )
      return gameState[0][2];

    const isDrawMatch = gameState.flat().every((e) => {
      if (e === "circle" || e === "cross") return true;
    });

    if (isDrawMatch) return "draw";

    return null;
  };

  useEffect(() => {
    const winner = checkWinner();

    if (winner) {
      setFinishedState(winner);
    }
  }, [gameState]);

  socket?.on("connect", () => {
    setPlayOnline(true);
  });

  const handlePlayOnline = () => {
    const newSocket = io("http://localhost:8080/", {
      transports: ["websocket"],
    });

    setSocket(newSocket);
  };

  if (!playOnline) {
    return (
      <div className="container">
        <button onClick={handlePlayOnline} className="play-online">
          Play Online
        </button>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="move-detection">
        <div className="left">Yourself</div>
        <div className="right">Opponent</div>
      </div>
      <div className="game-heading water-bg">Tic Tac Toe</div>
      <div className="sqaure-wrapper">
        {gameState.map((item, rowIndex) => {
          return item.map((e, colIndex) => {
            return (
              <Sqaure
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                setGameState={setGameState}
                finishedState={finishedState}
                finishedArrayState={finishedArrayState}
                id={rowIndex * 3 + colIndex}
                key={rowIndex * 3 + colIndex}
              />
            );
          });
        })}
      </div>
      <div>
        {finishedState && finishedState !== "draw" && (
          <h2>{finishedState} has won the game</h2>
        )}
      </div>
      <div>
        {finishedState && finishedState === "draw" && <h2>It's a Draw!</h2>}
      </div>
    </div>
  );
};

export default App;
