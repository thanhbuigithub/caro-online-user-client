import React from "react";
import { useState } from "react";
import GameContext from "../contexts/GameContext";
import config from "../config/Config";

const GameProvider = (props) => {
  const [board, setBoard] = useState(
    Array(config.boardSize.row)
      .fill(null)
      .map(() => {
        return Array(config.boardSize.col).fill(null);
      })
  );

  const [history, setHistory] = useState([]);

  const [turn, setTurn] = useState(config.playerX);
  const [winLine, setWinLine] = useState(null);
  const [roomId, setRoomId] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [players, setPlayers] = useState([]);
  const [playerX, setPlayerX] = useState(null);
  const [playerO, setPlayerO] = useState(null);
  const [playerXReady, setPlayerXReady] = useState(false);
  const [playerOReady, setPlayerOReady] = useState(false);
  const [state, setState] = useState(config.GAME_STATE.UNREADY);
  const [preMove, setPreMove] = useState(null);
  const [currentTick, setCurrentTick] = useState(0);

  function init(room) {
    setRoomId(room.id);
    setPlayers(room.players);
    setPlayerX(room.playerX);
    setPlayerO(room.playerO);
    setPlayerXReady(room.playerXready);
    setPlayerOReady(room.playerOReady);
    setState(room.state);
    setChatHistory(room.chatHistory);

    const newBoard = Array(config.boardSize.row)
      .fill(null)
      .map(() => {
        return Array(config.boardSize.col).fill(null);
      });

    let newHistory = [];

    let newTurn = config.playerX;
    let newPreMove = null;
    let newCurrentTick = 0;
    let newWinLine = null;

    if (room.game !== null) {
      newHistory = room.game.history;
      newTurn = room.game.turn;
      newPreMove = room.game.preMove;
      newCurrentTick = room.game.currentTick;
      newWinLine = room.game.winLine;

      room.game.history.forEach((move) => {
        newBoard[move.x][move.y] = move.chess;
      });
    }
    setHistory(newHistory);
    setTurn(newTurn);
    setPreMove(newPreMove);
    setCurrentTick(newCurrentTick);
    setWinLine(newWinLine);
    setBoard(newBoard);
  }

  function moveHandler(move) {
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[move.x][move.y] = move.chess;
    setBoard(newBoard);
    setHistory([...history, move]);
  }

  return (
    <GameContext.Provider
      value={{
        board,
        history,
        turn,
        winLine,
        moveHandler,
        setWinLine,
        init,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
