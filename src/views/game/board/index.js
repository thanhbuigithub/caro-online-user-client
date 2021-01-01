import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./index.css";
import Cell from "../cell";
import GameContext from "../../../contexts/GameContext";
import Config from "../../../config/Config";
import SocketManager from "../../../socketio/SocketManager";
//-------------- Board --------------

function Board({}) {
  const { history, stepNumber, handleClick } = useContext(GameContext);
  const cells = history[stepNumber].cells;
  const cellsDiv = [];
  const socket = SocketManager.getSocket();

  useEffect(() => {
    socket.on("move", ({ row, col }) => {
      console.log(`Socket: on: move ${row} ${col}`);
      handleClick(row, col);
    });

    return () => {
      socket.off();
    };
  }, [cells]);

  for (let i = 0; i < cells.length; i += 1) {
    for (let j = 0; j < cells[i].length; j += 1) {
      const key = i * Config.boardSize.col + j;

      cellsDiv.push(<Cell value={cells[i][j]} row={i} col={j} key={key} />);
    }
  }

  return <div className="board">{cellsDiv}</div>;
}

export default Board;
