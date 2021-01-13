import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
// import "./index.css";
import Board from "./board";
import Grid from "@material-ui/core/grid";
import Button from "@material-ui/core/button";
import { makeStyles } from "@material-ui/core/styles";
import GameContext from "../../contexts/GameContext";
import SocketManager from "../../socketio/SocketManager";
import GameAction from "./gameAction";
import PlayerHolder from "./playerHolder";
import config from "../../config/Config";
import Chat from "./chat";
import History from "./history";
import UsersInRoomModal from "./usersInRoom/UserInRoomModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

const ToastContent = ({ player, acceptDraw, closeToast, toastProps }) => (
  <Grid
    container
    justify="space-around"
    direction="column"
    spacing={2}
    align="center"
    style={{ padding: 10, color: "white" }}
  >
    <Grid item xs={12}>
      {player.username} xin hoà !!!
    </Grid>
    <Grid container item xs={12} justify="center">
      <Grid container item xs={6} justify="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => acceptDraw()}
        >
          Đồng ý
        </Button>
      </Grid>
      <Grid container item xs={6} justify="center">
        <Button variant="contained" color="secondary" onClick={closeToast}>
          Bỏ qua
        </Button>
      </Grid>
    </Grid>
  </Grid>
);

function Game() {
  const classes = useStyles();
  const match = useParams();
  const location = useLocation();
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
    setPlayers,
  } = useContext(GameContext);
  const socket = SocketManager.getSocket();
  let history = useNavigate();
  const haveSit = function () {
    return playerX !== null || playerO !== null;
  };

  const [displayBoardModal, setDisplayBoardModal] = useState(false);
  const handleShowModal = () => {
    setDisplayBoardModal(true);
  };
  const handleHiddenModal = () => {
    setDisplayBoardModal(false);
  };

  // GAME HANDLE
  useEffect(() => {
    console.log("GAME RENDER");
    if (location.search !== "") {
      const urlParams = new URLSearchParams(location.search);
      const pwd = urlParams.get("pwd");
      socket.emit("join-room", match.id, pwd);
    } else socket.emit("join-room", match.id);
    console.log("EMIT JOIN-ROOM");
    socket.on("join-room-failed", () => {
      history("/");
    });

    return () => {
      socket.emit("leave-room");
    };
  }, [location]);

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
    socket.on("new-player-join-room", (players) => {
      //console.log(username + " has joined");
      setPlayers(players);
    });

    return () => {
      socket.off("new-player-join-room");
    };
  }, [setPlayers]);

  useEffect(() => {
    socket.on("game-over", ({ winner, winLine, playerX, playerO }) => {
      console.log("GAME OVER!!!");
      console.log(winLine);
      gameOverHandler(winner, winLine, playerX, playerO);
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

  useEffect(() => {
    socket.on("new-surrender", (player) => {
      toast.info(`${player.username} đã đầu hàng`);
    });
  }, []);

  const acceptDraw = () => {
    socket.emit("accept-draw");
  };

  useEffect(() => {
    socket.on("draw-request", (player) => {
      toast.error(<ToastContent player={player} acceptDraw={acceptDraw} />);
    });
  }, []);

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
          <Button variant="contained" color="default" onClick={handleShowModal}>
            Danh sách người chơi
          </Button>
          {displayBoardModal ? (
            <UsersInRoomModal handleToggleModal={handleHiddenModal} />
          ) : null}
          <Chat />
          <History />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Game;
