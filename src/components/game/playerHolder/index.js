import React, { useContext, useEffect } from "react";
import "./index.css";
import GameContext from "../../../contexts/GameContext";
import Config from "../../../config/Config";
import SocketManager from "../../../socketio/SocketManager";
import Button from "@material-ui/core/button";
import Paper from "@material-ui/core/paper";
import Avatar from "@material-ui/core/avatar";
import { deepOrange, green } from "@material-ui/core/colors";
import PlayForWorkIcon from "@material-ui/icons/PlayForWork";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../../common/router/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 200,
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "column",
  },
  avatar: {
    backgroundColor: green[500],
    width: 100,
    height: 100,
  },
  icon: {
    fontSize: 100,
  },
}));

function PlayerHolder({ sat, player }) {
  const classes = useStyles();
  const socket = SocketManager.getSocket();
  const { isSatPlayer } = useContext(GameContext);

  const onClickSit = function () {
    socket.emit("sit");
  };

  const divCreate = function () {
    if (sat && player !== null) {
      return (
        <>
          <div>{player.username}</div>
          <Avatar alt={player.username} src="" className={classes.avatar} />
          <div>Elo. 1000</div>
        </>
      );
    }

    if (!sat || !isSatPlayer()) {
      return (
        <IconButton aria-label="sit" onClick={onClickSit}>
          <PlayForWorkIcon className={classes.icon} />
        </IconButton>
      );
    }

    if (player === null)
      return (
        <IconButton aria-label="invite">
          <PersonAddIcon className={classes.icon} />
        </IconButton>
      );
  };

  return (
    <Paper className={classes.root} elevation={3}>
      {divCreate()}
    </Paper>
  );
}

export default PlayerHolder;
