import { useState, useEffect, useRef } from "react";
import GameButton from "./GameButton";

const Game = () => {
  const colors = ["red", "blue", "green", "orange"];

  const [correctMoves, setCorrectMoves] = useState([]);
  const [game, setGame] = useState(false);
  const [moveIndex, setMoveIndex] = useState(0);

  const redRef = useRef(null);
  const blueRef = useRef(null);
  const greenRef = useRef(null);
  const orangeRef = useRef(null);

  const buttons = [
    {
      id: 0,
      border: "top-left",
      background: "red",
      sound: "button1.mp3",
      ref: redRef,
    },
    {
      id: 1,
      border: "top-right",
      background: "blue",
      sound: "button2.mp3",
      ref: blueRef,
    },
    {
      id: 2,
      border: "bot-left",
      background: "green",
      sound: "button3.mp3",
      ref: greenRef,
    },
    {
      id: 3,
      border: "bot-right",
      background: "orange",
      sound: "button4.mp3",
      ref: orangeRef,
    },
  ];

  function newGame() {
    setCorrectMoves([]);
    setGame(false);
    setMoveIndex(0);
  }

  function addMove() {
    const color = colors[Math.floor(Math.random() * 4)];
    const newMove = [...correctMoves, color];
    setCorrectMoves(newMove);
  }

  function handleStartGame() {
    if (!game) {
      setGame(true);
      addMove();
    }
  }

  function handleNewRound(e) {
    if (game) {
      e.target.classList.add("clicked");
      setTimeout(() => {
        e.target.classList.remove("clicked");
        const selectedColor = e.target.getAttribute("background");
        if (correctMoves[moveIndex] === selectedColor) {
          if (moveIndex === correctMoves.length - 1) {
            setTimeout(() => {
              setMoveIndex(0);
              addMove();
            }, 200);
          } else {
            setMoveIndex(moveIndex + 1);
          }
        } else {
          newGame();
        }
      }, 250);
    }
  }

  useEffect(() => {
    if (correctMoves.length > 0) {
      function showMoves(index = 0) {
        let ref = null;

        if (correctMoves[index] === "green") ref = greenRef;
        if (correctMoves[index] === "red") ref = redRef;
        if (correctMoves[index] === "blue") ref = blueRef;
        if (correctMoves[index] === "orange") ref = orangeRef;

        setTimeout(() => {
          ref.current.classList.add("highlight");
          setTimeout(() => {
            ref.current.classList.remove("highlight");
            if (index < correctMoves.length - 1) showMoves(index + 1);
          }, 200);
        }, 200);
      }
      showMoves();
    }
  }, [correctMoves]);

  return (
    <div className="game">
      <div className="game-container">
        {buttons.map((button) => (
          <GameButton
            {...button}
            key={button.id}
            ref={button.ref}
            onClick={handleNewRound}
          />
        ))}
      </div>
      <button className="play-button" onClick={handleStartGame}>
        {correctMoves.length === 0 ? "PLAY" : correctMoves.length}
      </button>
    </div>
  );
};

export default Game;
