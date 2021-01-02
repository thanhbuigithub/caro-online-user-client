import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./index.css";
import Cell from "../cell";
import GameContext from "../../../contexts/GameContext";
import Config from "../../../config/Config";
import SocketManager from "../../../socketio/SocketManager";
//-------------- Board --------------

function Board({}) {
  const { board, moveHandler } = useContext(GameContext);
  const cellsDiv = [];
  const socket = SocketManager.getSocket();

  useEffect(() => {
    socket.on("new-move", (move) => {
      console.log(`Socket: on: move ${move.x} ${move.y}`);
      moveHandler(move);
    });

    return () => {
      socket.off("new-move");
    };
  }, [board]);

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      const key = i * Config.boardSize.col + j;

      cellsDiv.push(<Cell value={board[i][j]} row={i} col={j} key={key} />);
    }
  }

  return <div className="board">{cellsDiv}</div>;
}

export default Board;
