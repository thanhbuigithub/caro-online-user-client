import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// import "./index.css";
import Board from "./board";
import Grid from "@material-ui/core/grid";
import Button from "@material-ui/core/button";
import Paper from "@material-ui/core/paper";
import { makeStyles } from "@material-ui/core/styles";
import GameContext from "../../contexts/GameContext";
import SocketManager from "../../socketio/SocketManager";
import GameAction from "./gameAction";
import PlayerHolder from "./playerHolder";
import config from "../../config/Config";
import Chat from "./chat";
import History from "./history";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Game() {
  const classes = useStyles();
  const match = useParams();
  const {
    playerX,
    playerO,
    sitHandler,
    standUpHandler,
    readyHandler,
    startGameHandler,
    gameOverHandler,
    chatHandler,
    init,
  } = useContext(GameContext);
  const socket = SocketManager.getSocket();
  let history = useNavigate();
  const haveSit = function () {
    return playerX !== null || playerO !== null;
  };

  useEffect(() => {
    socket.emit("join-room", match.id);
    socket.on("join-room-failed", () => {
      history('/');
    });
  }, []);

  useEffect(() => {
    socket.on("join-room-successful", (room) => {
      //history.push(`/game/${room.id}`);
      init(room);
      console.log(room);
    });
    return () => {
      socket.off("join-room-successful");
    };
  }, [init]);

  useEffect(() => {
    socket.on("new-player-join-room", (username) => {
      console.log(username + " has joined");
    });

    // socket.on("sit-successful", (sit) => {
    //   console.log("You had sit: " + sit);
    // });

    // socket.on("ready-successful", () => {
    //   console.log("You had ready");
    // });

    return () => {
      socket.off();
    };
  }, []);

  useEffect(() => {
    socket.on("game-over", (winLine) => {
      console.log("GAME OVER!!!");
      console.log(winLine);
      gameOverHandler(winLine);
    });
    return () => {
      socket.off("game-over");
    };
  }, [gameOverHandler]);

  useEffect(() => {
    socket.on("new-player-sit", (sit) => {
      console.log(sit.player.username + " had sit");
      sitHandler(sit);
    });
    return () => {
      socket.off("new-player-sit");
    };
  }, [sitHandler]);

  useEffect(() => {
    socket.on("new-player-stand-up", (standUp) => {
      console.log(standUp.username + " had stand up");
      standUpHandler(standUp);
    });
    return () => {
      socket.off("new-player-stand-up");
    };
  }, [standUpHandler]);

  useEffect(() => {
    socket.on("new-player-ready", (ready) => {
      console.log(ready.username + " had ready");
      readyHandler(ready);
    });
    return () => {
      socket.off("new-player-ready");
    };
  }, [readyHandler]);

  useEffect(() => {
    socket.on("start-game", () => {
      console.log("Start game");
      startGameHandler();
    });
    return () => {
      socket.off("start-game");
    };
  }, [startGameHandler]);

  useEffect(() => {
    socket.on("new-chat", (chatHistory) => {
      chatHandler(chatHistory);
    });
    return () => {
      socket.off("new-chat");
    };
  }, [chatHandler]);

  return (
    <Grid container className={classes.root} item xs={12}>
      <Grid container justify="space-around">
        <Grid
          item
          container
          xs={3}
          justify="space-around"
          alignItems="center"
          direction="column"
        >
          <PlayerHolder sat={haveSit()} player={playerX} />
          <PlayerHolder sat={haveSit()} player={playerO} />
          <GameAction />
        </Grid>
        <Grid
          item
          container
          xs={5}
          justify="center"
          direction="column"
          alignItems="center"
        >
          <Board />
        </Grid>
        <Grid
          item
          container
          xs={3}
          justify="space-around"
          direction="column"
          alignItems="center"
        >
          <Chat />
          <History />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Game;
