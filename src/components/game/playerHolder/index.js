import React, { useState, useContext, useEffect } from "react";
import "./index.css";
import GameContext from "../../../contexts/GameContext";
import config from "../../../config/Config";
import SocketManager from "../../../socketio/SocketManager";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { deepOrange, green, indigo } from "@material-ui/core/colors";
import PlayForWorkIcon from "@material-ui/icons/PlayForWork";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Auth from "../../common/router/auth";
import InvitePlayerModal from "../invitePlayer/InvitePlayerModal";
import clsx from "clsx";

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
    backgroundColor: green[400],
    width: 100,
    height: 100,
  },
  icon: {
    fontSize: 100,
  },
  playerTurn: {
    backgroundColor: deepOrange[400],
    color: "white",
  },
  wrapper: {
    position: "relative",
  },
  progress: {
    color: indigo[400],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -55,
    marginLeft: -55,
  },
}));

function PlayerHolder({ sat, player }) {
  const classes = useStyles();
  const socket = SocketManager.getSocket();
  const {
    isSatPlayer,
    turn,
    isStarted,
    convertChess,
    currentTick,
    turnTimeLimit,
  } = useContext(GameContext);
  const [displayBoardModal, setDisplayBoardModal] = useState(false);

  const handleShowModal = () => {
    setDisplayBoardModal(true);
  };
  const handleHiddenModal = () => {
    setDisplayBoardModal(false);
  };

  const onClickSit = function () {
    socket.emit("sit");
  };

  const playerTurn = () => {
    if (isStarted() && turn === convertChess(player)) return classes.playerTurn;
    return null;
  };

  const divCreate = function () {
    if (sat && player !== null) {
      return (
        <>
          <div>
            <strong>{player.username}</strong>
          </div>
          <div className={classes.wrapper}>
            <Avatar alt={player.username} src="" className={classes.avatar} />
            {playerTurn() !== null && (
              <CircularProgress
                variant="static"
                size={110}
                className={classes.progress}
                value={Math.round((currentTick / turnTimeLimit) * 100)}
              />
            )}
          </div>
          <div>
            <strong>Elo. {player.elo}</strong>
          </div>
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
        <IconButton aria-label="invite" onClick={handleShowModal}>
          <PersonAddIcon className={classes.icon} />
        </IconButton>
      );
  };

  return (
    <Paper className={clsx(classes.root, playerTurn())} elevation={3}>
      {divCreate()}
      {displayBoardModal ? (
        <InvitePlayerModal handleToggleModal={handleHiddenModal} />
      ) : null}
    </Paper>
  );
}

export default PlayerHolder;
