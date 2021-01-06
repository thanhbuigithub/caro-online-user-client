import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar/index';
import TopBar from './TopBar';

import userApi from '../../api/userApi';
import UserContext from '../../contexts/UserContext';
import socketManager from "../../socketio/SocketManager";
import auth from "../../components/common/router/auth";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const location = useLocation();
  let history = useNavigate();
  const socket = socketManager.getSocket();
  const isHomePage = location.pathname === '/';
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { handleSaveUser, handleIsUploadAvatar, _id, avatar, handleSaveAvatar } = useContext(UserContext);


  useEffect(() => {
    const user = auth.getCurrentUser();
    console.log(user);
    socket.emit("join", user._id);
    // return () => {
    //   socketManager.closeSocket();
    // };
  }, []);


  useEffect(() => {
    const getProfile = async () => {
      try {
        const fetchUser = await userApi.getProfile();
        await handleSaveUser(fetchUser);
        socket.emit("join", fetchUser._id);
      } catch (err) {
        console.log("header: Failed to get profile: ", err);
      }
    };
    getProfile();

  }, []);


  useEffect(() => {
    const getAvatar = async () => {
      try {
        const fetchUser = await userApi.getAvatar(_id);
        if (fetchUser.success) {
          handleSaveAvatar(fetchUser.path);
        }
      } catch (err) {
        console.log('Avatar not updated')
      }
    };
    getAvatar();

  }, [avatar]);

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

  return (
    <div className={classes.root}>
      <TopBar
        onMobileNavOpen={() => setMobileNavOpen(true)} />
      {isHomePage ?
        (<>
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
          </div></>) : (<div className={classes.contentContainer} style={{ paddingTop: '64px' }}>
            <div className={classes.content}>
              <Outlet />
            </div>
          </div>)}
    </div>
  );
};

export default DashboardLayout;
