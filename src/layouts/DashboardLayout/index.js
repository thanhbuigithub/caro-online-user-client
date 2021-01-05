import React, { useState, useEffect, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar/index';
import TopBar from './TopBar';

import userApi from '../../api/userApi';
import UserContext from '../../contexts/UserContext';

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
    overflow: 'hidden'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const { handleSaveUser, isUploadAvatar, handleIsUploadAvatar, id, avatar, handleSaveAvatar } = useContext(UserContext);
  useEffect(() => {
    const getProfile = async () => {
      try {
        const fetchUser = await userApi.getProfile();
        await handleSaveUser(fetchUser);
      } catch (err) {
        console.log("header: Failed to get profile: ", err);
      }
    };
    getProfile();

  }, []);

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const fetchUser = await userApi.getAvatar(id);
        if (fetchUser.success) {
          handleSaveAvatar(fetchUser.path);
        }
      } catch (err) {

      }
    };
    getAvatar();

  });

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
