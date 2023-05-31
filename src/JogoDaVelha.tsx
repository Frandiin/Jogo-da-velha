import { useState } from "react";

export const JogoDaVelha = () => {
  const [board, setBoard] = useState<string[]>(Array(9).fill(""));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [winner, setWinner] = useState("");
  const [score, setScore] = useState<{ [key: string]: number }>({
    X: 0,
    O: 0,
    draw: 0, // Adicionando contagem de empates
  });

  const handleCellClick = (index: number) => {
    if (board[index] === "" && !winner) {
      const newBoard = [...board];
      newBoard[index] = currentPlayer;
      setBoard(newBoard);
      checkWinner(newBoard, currentPlayer);
      setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    }
  };

  const checkWinner = (board: string[], currentPlayer: string) => {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;
      if (
        board[a] === currentPlayer &&
        board[b] === currentPlayer &&
        board[c] === currentPlayer
      ) {
        setWinner(currentPlayer);
        updateScore(currentPlayer);
        return;
      }
    }

    if (!board.includes("")) {
      setWinner("draw");
      updateScore("draw");
    }
  };

  const updateScore = (player: string) => {
    setScore((prevScore) => ({
      ...prevScore,
      [player]: prevScore[player] + 1,
    }));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(""));
    setCurrentPlayer("X");
    setWinner("");
  };

  const resetScore = () => {
    setScore({ X: 0, O: 0, draw: 0 });
  };

  const renderStatusMessage = () => {
    if (winner === "draw") {
      return <p>O jogo empatou!</p>;
    } else if (winner) {
      return <p>O jogador {winner} venceu!</p>;
    } else {
      return <p>A vez do jogador {currentPlayer}</p>;
    }
  };

  return (
    <div className="flex justify-center items-center mt-[100px] ">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="mb-4 text-lg text-center">Jogo da Velha</h1>
        <div className="flex justify-center items-center mb-4">
          <span className="mr-2 font-bold">Placar:</span>
          <span className="mr-2">Jogador X: {score.X}</span>
          <span className="mr-2">Jogador O: {score.O}</span>
          <span className="mr-2">Empates: {score.draw}</span>
        </div>
        <div className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded ml-auto text-center mr-auto w-[250px]">
          <button onClick={resetScore}>Zerar Placar</button>
        </div>
        <div className="text-center">{renderStatusMessage()}</div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          {board.map((cell, index) => (
            <div
              key={index}
              className="bg-gray-200 flex justify-center items-center text-4xl cursor-pointer w-20 h-20"
              onClick={() => handleCellClick(index)}
            >
              {cell}
            </div>
          ))}
        </div>
        {winner && (
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={resetGame}
          >
            Recomeçar
          </button>
        )}
      </div>
    </div>
  );
};
