import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./index.css";
import Cell from "../cell";
import GameContext from "../../../contexts/GameContext";
import Config from "../../../config/Config";
import SocketManager from "../../../socketio/SocketManager";
import Button from "@material-ui/core/Button";
//-------------- Board --------------

function Board({}) {
  const { board, moveHandler, isReady, isStarted, winner } = useContext(
    GameContext
  );
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
  }, [moveHandler, board]);

  const onClickReady = function () {
    socket.emit("ready");
  };

  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[i].length; j += 1) {
      const key = i * Config.boardSize.col + j;

      cellsDiv.push(<Cell value={board[i][j]} row={i} col={j} key={key} />);
    }
  }

  const readyModal = function () {
    if (isStarted()) return null;
    return (
      <div className="ready-modal">
        {isReady() ? (
          <span className="waiting-text">
            <strong>Đợi người chơi khác ...</strong>
          </span>
        ) : (
          <>
            {winner !== null && winner && (
              <span className="winner-text">
                <strong>Người chơi {winner} chiến thắng !!!</strong>
              </span>
            )}
            <Button
              variant="contained"
              color="secondary"
              elevation={3}
              onClick={onClickReady}
            >
              Sẵn sàng
            </Button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="board">
      {cellsDiv}
      {readyModal()}
    </div>
  );
}

export default Board;
