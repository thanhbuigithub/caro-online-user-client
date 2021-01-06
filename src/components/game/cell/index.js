import React, { useContext } from "react";
import { useState } from "react";
import "./index.css";
import config from "../../../config/Config";
import GameContext from "../../../contexts/GameContext";
import SocketManager from "../../../socketio/SocketManager";

function checkWinCell(winLine, row, col) {
  if (winLine == null) {
    return false;
  }

  for (let i = 0; i < winLine.length; i += 1) {
    const curCell = winLine[i];
    if (curCell.x === row && curCell.y === col) {
      return true;
    }
  }
  return false;
}

function Cell({ value, row, col }) {
  const { turn, winLine } = useContext(GameContext);
  const socket = SocketManager.getSocket();

  const needToDisable = false;
  const isTurnX = turn === config.playerX;
  const isWinnerCell = checkWinCell(winLine, row, col);

  const onClick = () => {
    // Prevent user click if rival is disconnected
    // if (needToDisable) {
    //   return;
    // }

    // Prevent user click if not his turn
    // if ((isPlayerX && !isTurnX) || (!isPlayerX && isTurnX)) {
    //   return;
    // }

    // Send move to server if it is valid
    // if (handleClick(row, col)) {
    //   console.log(`Socket: emit: move ${row} ${col}`);
    // }

    socket.emit("move", { x: row, y: col });
    console.log(`Cell: OnClick ${row} ${col}`);
  };

  const chessAssetFromValue = (value) => {
    switch (value) {
      case config.playerX:
        return "X";
      case config.playerO:
        return "O";
      default:
        return "";
    }
  };

  return (
    <div
      className={`cell ${isWinnerCell ? "winner-cell" : ""}`}
      onClick={onClick}
      row={row}
      col={col}
    >
      {chessAssetFromValue(value)}
    </div>
  );
}

export default Cell;
