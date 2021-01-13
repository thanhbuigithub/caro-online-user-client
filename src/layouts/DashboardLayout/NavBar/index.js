import React, { useEffect, useContext, useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";

import NavItem from "./NavItem";
import CupIcon from "../../../library/icon/CupIcon";
import MatchIcon from "../../../library/icon/MatchIcon";
import WinmatchIcon from "../../../library/icon/WinmatchIcon";
import PercentWin from "../../../library/icon/PercentWin";
import UserContext from "../../../contexts/UserContext";
import MatchModal from "./matchModal/allMatchModal";
const colors = ["#e53935", "#43a047", "#fb8c00", "#3949ab"];
const items = [
  {
    icon: CupIcon,
    title: "Số Cúp",
  },
  {
    icon: MatchIcon,
    title: "Tổng số trận",
  },
  {
    icon: WinmatchIcon,
    title: "Số trận thắng",
  },
  {
    icon: PercentWin,
    title: "Tỉ lệ thắng",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256,
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 64,
    height: 64,
  },
  button: {
    textAlign: "center",
    width: "90%",
    margin: `32px auto`,
  },
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const { user, avatar } = useContext(UserContext);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleClickPlayer = () => {
    setOpenModal(true);
  }

  const handleToggle = () => {
    setOpenModal(false);
  };

  const value = [
    user.elo,
    user.numOfMatches,
    user.winMatches,
    Math.round((user.winMatches / user.numOfMatches) * 100, 2),
  ];

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <MatchModal
        status={openModal}
        handleToggle={handleToggle} />
      <Box alignItems="center" display="flex" flexDirection="column" p={2}>
        <Avatar
          className={classes.avatar}
          component={RouterLink}
          to="/profile"
          src={avatar || `/static/unknown_avatar.jpg`}
        />
        <Typography className={classes.name} color="textPrimary" variant="h5">
          {user.name}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.isAdmin ? "Admin" : "User"}
        </Typography>
      </Box>
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item, index) => (
            <NavItem
              key={index}
              title={item.title}
              icon={item.icon}
              color={colors[index]}
              value={value[index]}
            />
          ))}
        </List>
      </Box>
      <Box my={2} className={classes.button}>
        <Button
          onClick={handleClickPlayer}
          color="primary"
          fullWidth
          size="large"
          variant="contained"
        >
          Lịch sử trận đấu
        </Button>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
  data: PropTypes.object,
};

NavBar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false,
  data: null,
};

export default NavBar;
