import React, { useMemo, useState, useEffect } from "react";
import GameContext from "../contexts/GameContext";
import config from "../config/Config";
import Auth from "../components/common/router/auth";

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
  const [turnTimeLimit, setTurnTimeLimit] = useState(config.TURN_TIME_LIMIT);
  const [startedTurnTime, setStartedTurnTime] = useState(null);

  let timer = null;

  function init(room) {
    setRoomId(room.id);
    setPlayers(room.players);
    setPlayerX(room.playerX);
    setPlayerO(room.playerO);
    setPlayerXReady(room.playerXReady);
    setPlayerOReady(room.playerOReady);
    setState(room.state);
    setChatHistory(room.chatHistory);
    setTurnTimeLimit(room.turnTimeLimit);

    const newBoard = Array(config.boardSize.row)
      .fill(null)
      .map(() => {
        return Array(config.boardSize.col).fill(null);
      });

    let newHistory = [];

    let newTurn = config.playerX;
    let newPreMove = null;
    let newStartedTurnTime = null;
    let newCurrentTick = 0;
    let newWinLine = null;

    if (room.game !== null) {
      newHistory = room.game.history;
      newTurn = room.game.turn;
      newPreMove = room.game.preMove;
      if (room.state === config.GAME_STATE.STARTED) {
        newStartedTurnTime =
          room.game.startedTurnTime - (room.game.currentTime - Date.now());
        const curTick = Math.ceil((Date.now() - newStartedTurnTime) / 1000);
        //console.log(curTick);
        newCurrentTick = turnTimeLimit - curTick + 1;
      }
      newWinLine = room.game.winLine;

      room.game.history.forEach((move) => {
        newBoard[move.x][move.y] = move.chess;
      });
    }
    setHistory(newHistory);
    setTurn(newTurn);
    setPreMove(newPreMove);
    setStartedTurnTime(newStartedTurnTime);
    setCurrentTick(newCurrentTick);
    setWinLine(newWinLine);
    setBoard(newBoard);
  }

  function moveHandler(move) {
    const newBoard = JSON.parse(JSON.stringify(board));
    newBoard[move.x][move.y] = move.chess;
    setBoard(newBoard);
    setHistory([...history, move]);
    setStartedTurnTime(Date.now());
    setCurrentTick(turnTimeLimit);
  }

  function sitHandler(sit) {
    if (sit.at === config.playerX) {
      setPlayerX(sit.player);
      return;
    }

    if (sit.at === config.playerO) {
      setPlayerO(sit.player);
      return;
    }
  }

  function standUpHandler(standUp) {
    if (playerX !== null && standUp.id === playerX.id) {
      setPlayerXReady(false);
      setPlayerX(null);
      return;
    }

    if (playerO !== null && standUp.id === playerO.id) {
      setPlayerOReady(false);
      setPlayerO(null);
      return;
    }
  }

  function readyHandler(ready) {
    if (playerX !== null && ready.id === playerX.id) {
      setPlayerXReady(true);
      return;
    }

    if (playerO !== null && ready.id === playerO.id) {
      setPlayerOReady(true);
      return;
    }
  }

  function startGameHandler() {
    setState(config.GAME_STATE.STARTED);
    setCurrentTick(turnTimeLimit);
    setStartedTurnTime(Date.now());
    setBoard(
      Array(config.boardSize.row)
        .fill(null)
        .map(() => {
          return Array(config.boardSize.col).fill(null);
        })
    );
    setWinLine(null);
    setTurn(config.playerX);
    setHistory([]);
    setPreMove(null);
  }

  function syncCurrentTick() {
    if (isStarted()) {
      const curTick = Math.ceil((Date.now() - startedTurnTime) / 1000);
      console.log(curTick);
      setCurrentTick(turnTimeLimit - curTick + 1);
    }
  }

  useEffect(() => {
    window.addEventListener("visibilitychange", syncCurrentTick);
    return () => {
      window.removeEventListener("visibilitychange", syncCurrentTick);
    };
  }, [syncCurrentTick]);

  useEffect(() => {
    //document.addEventListener("visibilitychange", onFocus);

    // if (currentTick > 0)
    //   timer = setInterval(() => {
    //     setCurrentTick(currentTick - 1);
    //   }, 1000);
    let timeout = null;
    if (currentTick > 0) {
      timeout = setTimeout(() => {
        //
        syncCurrentTick();
      }, 1000);
    }
    return () => {
      if (timeout !== null) {
        clearTimeout(timeout);
      }
    };
  }, [currentTick, syncCurrentTick]);

  function gameOverHandler(winLine) {
    setState(config.GAME_STATE.UNREADY);
    //clearInterval(timer);
    setPlayerXReady(false);
    setPlayerOReady(false);
    setCurrentTick(0);
    if (winLine) {
      setWinLine(winLine);
    }
  }

  function chatHandler(chatHistory) {
    setChatHistory(chatHistory);
  }

  function isSatPlayer() {
    if (playerX !== null && Auth.getCurrentUser()._id === playerX.id)
      return playerX;
    if (playerO !== null && Auth.getCurrentUser()._id === playerO.id)
      return playerO;
    return false;
  }

  function isReady() {
    const player = isSatPlayer();
    if (!player) return true;
    if (player === playerX) return playerXReady;
    if (player === playerO) return playerOReady;
  }

  const isReadyVar = useMemo(isReady, [
    playerX,
    playerO,
    playerXReady,
    playerOReady,
  ]);

  function isStarted() {
    return state === config.GAME_STATE.STARTED;
  }

  return (
    <GameContext.Provider
      value={{
        board,
        history,
        turn,
        winLine,
        currentTick,
        chatHistory,
        playerX,
        setPlayerX,
        playerO,
        setPlayerO,
        playerXReady,
        setPlayerXReady,
        playerOReady,
        setPlayerOReady,
        moveHandler,
        setWinLine,
        init,
        isSatPlayer,
        isReady,
        isStarted,
        sitHandler,
        standUpHandler,
        readyHandler,
        startGameHandler,
        gameOverHandler,
        chatHandler,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameProvider;
