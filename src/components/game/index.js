import React, { useEffect } from "react";
import { useState, useContext } from "react";
// import "./index.css";
import Board from "./board";
import Grid from "@material-ui/core/grid";
import Button from "@material-ui/core/button";
import { makeStyles } from "@material-ui/core/styles";
import GameContext from "../../contexts/GameContext";
import SocketManager from "../../socketio/SocketManager";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function Game({ match }) {
  const classes = useStyles();
  const { setWinLine } = useContext(GameContext);
  const socket = SocketManager.getSocket();

  useEffect(() => {
    console.log("RESET GAME");

    socket.on("new-player-join-room", (username) => {
      console.log(username + " has joined");
    });

    socket.on("sit-successful", (sit) => {
      console.log("You had sit: " + sit);
    });

    socket.on("new-player-sit", (username) => {
      console.log(username + " had sit");
    });

    socket.on("ready-successful", () => {
      console.log("You had ready");
    });

    socket.on("new-player-ready", (username) => {
      console.log(username + " had ready");
    });

    socket.on("game-over", (winLine) => {
      console.log("GAME OVER!!!");
      console.log(winLine);
      if (winLine) {
        setWinLine(winLine);
      }
    });

    return () => {
      socket.off();
    };
  }, []);

  const onClickSit = function () {
    socket.emit("sit");
  };

  const onClickReady = function () {
    socket.emit("ready");
  };

  return (
    <div className="game">
      <Grid container className={classes.root}>
        <Grid item xs={12}>
          <Grid container justify="center">
            <Grid item xs={2} justify="center">
              <Button variant="contained" onClick={onClickSit}>
                Sit
              </Button>
              <Button variant="contained" onClick={onClickReady}>
                Ready
              </Button>
            </Grid>
            <Grid item xs={8} justify="center">
              <Board />
            </Grid>
            <Grid item xs={2} justify="center">
              Chat
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default Game;
