import React, { useContext, useEffect } from "react";
import { useState } from "react";
import "./index.css";
import GameContext from "../../../contexts/GameContext";
import Config from "../../../config/Config";
import SocketManager from "../../../socketio/SocketManager";
import Button from "@material-ui/core/Button";

//-------------- Board --------------

function GameAction({}) {
  const { isStarted, isSatPlayer, currentTick } = useContext(GameContext);
  const socket = SocketManager.getSocket();

  const emitStandUp = function () {
    socket.emit("stand-up");
  };

  const surrender = () => {
    socket.emit("surrender");
  };

  const toDraw = () => {
    socket.emit("to-draw");
  };

  return (
    <div className="">
      {isStarted() && <div>{`${currentTick}`}</div>}
      <div>
        {/* <Button variant="contained" color="default">
          Cài đặt
        </Button> */}
        {isSatPlayer() && !isStarted() && (
          <Button variant="contained" color="default" onClick={emitStandUp}>
            Đứng lên
          </Button>
        )}
        {/* <Button variant="contained" color="default">
          Đứng lên
        </Button> */}
        {isStarted() && isSatPlayer() && (
          <>
            <Button variant="contained" color="default" onClick={surrender}>
              Xin thua
            </Button>
            <Button variant="contained" color="default" onClick={toDraw}>
              Xin hoà
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

export default GameAction;
