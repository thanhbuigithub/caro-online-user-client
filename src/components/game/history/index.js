import React, { useState, useContext, useEffect } from "react";
import GameContext from "../../../contexts/GameContext";
import config from "../../../config/Config";
import SocketManager from "../../../socketio/SocketManager";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    height: 200,
    overflow: "auto",
    "& > li div": {
      transition: "0.3s ease-out all",
      backgroundColor: "white",
      width: "80%",
      margin: "auto",
      marginBottom: "5px",
    },
  },
  cur: {
    "& > div": {
      border: "4px solid #f1c40f",
      transform: "skewX(-10deg)",
      fontWeight: "bold",
    },
    "&:hover div": {
      backgroundColor: "#f1c40f",
      color: "white",
    },
  },
  pre: {
    "& > div": {
      border: "2px solid #2ecc71",
    },
  },
  "&:hover div": {
    backgroundColor: "#2ecc71",
    color: "white",
  },
}));

function History({}) {
  const { history } = useContext(GameContext);
  const classes = useStyles();
  // const history = [
  //   { x: 1, y: 1, chess: 1 },
  //   { x: 1, y: 1, chess: 1 },
  // ];

  useEffect(() => {
    let objDiv = document.getElementById("history");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [history]);

  const moves = history.map((move, index) => {
    const desc = `${index}: ${move.chess === config.playerX ? "X" : "O"} (${
      move.x
    }, ${move.y})`;
    return (
      <li
        key={index}
        className={
          index === history.length - 1
            ? classes.cur
            : index < history.length - 1
            ? classes.pre
            : "after"
        }
      >
        <div>{desc}</div>
      </li>
    );
  });

  return (
    <ol className={classes.root} id="history">
      {moves}
    </ol>
  );
}

export default History;
