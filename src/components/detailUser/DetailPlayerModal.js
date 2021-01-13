import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  Switch,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  Avatar,
  Badge,
  Collapse,
  useTheme,
  Button,
} from "@material-ui/core";
import {
  withStyles,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import TextField from "@material-ui/core/TextField";
import SocketManager from "../../socketio/SocketManager";
import UserContext from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import NavItem from "../../layouts/DashboardLayout/NavBar/NavItem";
import CupIcon from "../../library/icon/CupIcon";
import MatchIcon from "../../library/icon/MatchIcon";
import WinmatchIcon from "../../library/icon/WinmatchIcon";
import PercentWin from "../../library/icon/PercentWin";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
  form: {
    width: "600px",
    margin: "auto",
    padding: "2em",
    backgroundColor: "#ffffff",
    marginBottom: "40px",
    borderRadius: "0.125rem",
    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

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
  navItem: {
    width: "400px",
  },
}));

export default function DetailPlayerModal({}) {
  const classes = useStyles();
  const socket = SocketManager.getSocket();
  let history = useNavigate();
  const theme = useTheme();
  const { playerDetails, avatar, setOpenPlayerDetail } = useContext(
    UserContext
  );

  const handleToggleModal = () => {
    setOpenPlayerDetail(false);
  };

  const value = [
    playerDetails.elo,
    playerDetails.numOfMatches,
    playerDetails.winMatches,
    Math.round(
      (playerDetails.winMatches / playerDetails.numOfMatches) * 100,
      2
    ),
  ];

  return (
    <>
      <Dialog
        onClose={handleToggleModal}
        aria-labelledby="customized-dialog-title"
        open={true}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={handleToggleModal}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Box textAlign="center">
            <Typography
              color="textPrimary"
              variant="h2"
              className={classes.tittle}
            >
              Thông tin người chơi
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container justify="center" alignItems="flex-start">
            <Box height="100%" display="flex" flexDirection="column">
              <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
                p={2}
              >
                <Avatar
                  className={classes.avatar}
                  to="/profile"
                  src={avatar || `/static/unknown_avatar.jpg`}
                />
                <Typography
                  className={classes.name}
                  color="textPrimary"
                  variant="h5"
                >
                  {playerDetails.name}
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
                      className={classes.navItem}
                    />
                  ))}
                </List>
              </Box>
            </Box>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
