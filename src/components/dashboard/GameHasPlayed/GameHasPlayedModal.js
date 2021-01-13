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
  colors,
  Avatar,
  Badge,
  Collapse,
  useTheme,
} from "@material-ui/core";
import {
  withStyles,
  makeStyles,
  ThemeProvider,
  createMuiTheme,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import TextField from "@material-ui/core/TextField";
import SocketManager from "../../../socketio/SocketManager";
import GameContext from "../../../contexts/GameContext";
import UserContext from "../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";
import swal from "sweetalert";
import { purple } from "@material-ui/core/colors";
import Grid from "@material-ui/core/Grid";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8e24aa",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  list: {
    width: "500px",
    // backgroundColor: theme.palette.background.paper,
  },
}));
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

const PurpleSwitch = withStyles({
  switchBase: {
    color: purple[300],
    "&$checked": {
      color: purple[500],
    },
    "&$checked + $track": {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const StyledListItem = withStyles((theme) => ({
  root: {
    // "&:hover": {
    //   borderRadius: "5px",
    //   backgroundColor: theme.palette.primary.main,
    //   "& .MuiListItemIcon-root & .MuiBadge-root,& .MuiListItemText-primary, & .MuiSvgIcon-root": {
    //     color: theme.palette.common.white,
    //   },
    // },
  },
}))(ListItem);

export default function InvitePlayerModal({ handleToggleModal }) {
  const classes = useStyles();
  const socket = SocketManager.getSocket();
  const { listUserOnline, _id } = useContext(UserContext);
  let history = useNavigate();
  const theme = useTheme();

  const invite = function (user) {
    console.log("INVITE " + user.username);
    socket.emit("invite", user.id);
  };

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
              Mời người chơi
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container justify="center" alignItems="flex-start">
            <List className={classes.list}>
              {listUserOnline &&
                listUserOnline.map((user, index) => {
                  if (user.id !== _id)
                    return (
                      <React.Fragment key={index}>
                        <StyledListItem>
                          <ListItemIcon>
                            <StyledBadge
                              style={{ backgroundColor: "transparent" }}
                              overlap="circle"
                              anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                              }}
                              variant="dot"
                            >
                              <Avatar
                                aria-label="recipe"
                                src={user.isUploadAvatar ? `${process.env.REACT_APP_ENDPOINT}/api/image/file/${user.id}` : "/static/logo.svg"}
                              >
                                <PersonIcon style={{ color: "black" }} />
                              </Avatar>
                            </StyledBadge>
                          </ListItemIcon>
                          <ListItemText primary={user.username} />
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => invite(user)}
                          >
                            Mời
                          </Button>
                        </StyledListItem>
                      </React.Fragment>
                    );
                })}
            </List>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
