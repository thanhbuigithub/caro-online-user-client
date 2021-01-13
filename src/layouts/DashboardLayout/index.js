import React, { useState, useEffect, useContext } from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import { makeStyles, Button, Grid } from "@material-ui/core";
import NavBar from "./NavBar/index";
import TopBar from "./TopBar";

import userApi from "../../api/userApi";
import UserContext from "../../contexts/UserContext";
import socketManager from "../../socketio/SocketManager";
import auth from "../../components/common/router/auth";
import GameContext from "../../contexts/GameContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: "flex",
    height: "100%",
    overflow: "hidden",
    width: "100%",
  },
  wrapper: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
    paddingTop: 64,
    [theme.breakpoints.up("lg")]: {
      paddingLeft: 256,
    },
  },
  contentContainer: {
    display: "flex",
    flex: "1 1 auto",
    overflow: "hidden",
  },
  content: {
    flex: "1 1 auto",
    height: "100%",
    overflow: "auto",
  },
}));

const ToastContent = ({
  sender,
  roomId,
  password,
  acceptInvite,
  closeToast,
  toastProps,
}) => (
  <Grid
    container
    justify="space-around"
    direction="column"
    spacing={2}
    align="center"
    style={{ padding: 10, color: "white" }}
  >
    <Grid item xs={12}>
      {sender.username} mời bạn vào trận!
    </Grid>
    <Grid container item xs={12} justify="center">
      <Grid container item xs={6} justify="center">
        <Button
          variant="contained"
          color="primary"
          onClick={() => acceptInvite(roomId, password)}
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

const DashboardLayout = () => {
  const classes = useStyles();
  const location = useLocation();
  let history = useNavigate();
  const socket = socketManager.getSocket();
  const isHomePage = location.pathname === "/";
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { setListUserOnline, setRooms, setRankList } = useContext(UserContext);

  const {
    handleSaveUser,
    handleIsUploadAvatar,
    isUploadAvatar,
    _id,
    avatar,
    handleSaveAvatar,
    user,
  } = useContext(UserContext);
  const match = useParams();

  const acceptInvite = (roomId, password) => {
    socket.emit("accept-invite", roomId);
    if (password) history(`/game/${roomId}?pwd=${password}`);
    else history(`/game/${roomId}`);
  };

  useEffect(() => {
    socket.on("new-connect", (list_user_online) => {
      console.log("New Connect");
      setListUserOnline(list_user_online);
    });
    return () => {
      socket.off("new-connect");
    };
  }, [setListUserOnline]);

  useEffect(() => {
    socket.on("new-room", (rooms) => {
      console.log("New Room");
      setRooms(rooms);
    });
    return () => {
      socket.off("new-room");
    };
  }, [setRooms]);

  useEffect(() => {
    socket.on("new-rank-list", (rankList) => {
      setRankList(rankList);
    });
    return () => {
      socket.off("new-rank-list");
    };
  }, [setRankList]);

  useEffect(() => {
    socket.on("new-invite", ({ sender, roomId, password }) => {
      console.log("New Invite");
      toast.success(
        <ToastContent
          sender={sender}
          roomId={roomId}
          password={password}
          acceptInvite={acceptInvite}
        />
      );
      //setListUserOnline(list_user_online);
    });
  }, []);
  // useEffect(() => {
  //   const fetchAvatar = async () => {
  //     try {
  //       const avatarUser = await userApi.loadAvatar(id);
  //       handleSaveAvatar(avatarUser);
  //       console.log(avatarUser);
  //       handleIsUploadAvatar(false);
  //     } catch (err) {
  //       console.log("Error: ", err.response);
  //     }
  //   };
  //   if (isUploadAvatar) {
  //     return fetchAvatar();
  //   }
  // }, []);

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const id = auth.getCurrentUser()._id;
        const fetchUser = await userApi.getAvatar(id);
        if (fetchUser.success) {
          // handleSaveAvatar(fetchUser.path);
          handleSaveAvatar(fetchUser.pathId);
          console.log("Update Avatar First");
        }
      } catch (err) {
        console.log("Avatar not updated");
      }
    };
    getAvatar();
  }, []);

  useEffect(() => {
    const fetchAvatar = async () => {
      try {
        const id = auth.getCurrentUser()._id;
        const fetchUser = await userApi.getAvatar(id);
        if (fetchUser.success) {
          // handleSaveAvatar(fetchUser.path);
          handleSaveAvatar(fetchUser.pathId);
          console.log("Update Avatar Later");
          handleIsUploadAvatar(false);
        }
      } catch (err) {
        console.log("Error: ", err.response);
      }
    };
    if (isUploadAvatar) {
      fetchAvatar();
    }
  });

  return (
    <div className={classes.root}>
      <TopBar onMobileNavOpen={() => setMobileNavOpen(true)} />
      {isHomePage ? (
        <>
          <NavBar
            onMobileClose={() => setMobileNavOpen(false)}
            openMobile={isMobileNavOpen}
          />
          <div className={classes.wrapper}>
            <div className={classes.contentContainer}>
              <div className={classes.content}>
                <Outlet />
              </div>
            </div>
          </div>
        </>
      ) : (
        <div
          className={classes.contentContainer}
          style={{ paddingTop: "64px" }}
        >
          <div className={classes.content}>
            <Outlet />
          </div>
        </div>
      )}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default DashboardLayout;
