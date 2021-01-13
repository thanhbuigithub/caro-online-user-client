import React, { useState, useContext } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  Avatar,
  Badge,
  withStyles,
  Collapse,
  useTheme,
  Button,
} from "@material-ui/core";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import PhoneIcon from "@material-ui/icons/Phone";
import TabletIcon from "@material-ui/icons/Tablet";
import PersonIcon from "@material-ui/icons/Person";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import cartouche from "../../../library/images/cartouche2.png";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import StatisticalIcon from "../../../library/icon/StatisticalIcon";
import UserContext from "../../../contexts/UserContext";
import config from "../../../config/Config";
import SocketManager from "../../../socketio/SocketManager";
import PasswordInputModal from "../PasswordInput/PasswordInputModal";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  header: {
    background: `url(${cartouche}) no-repeat`,
    minHeight: "80px",
    display: "flex",
    textAlign: "right",
    justifyContent: "space-between",
    fontWeight: "800",
  },
  list: {
    width: "100%",
    // backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(9),
    textAlign: "right",
  },
  greenBadge: {
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
  redBadge: {
    backgroundColor: "red",
    color: "red",
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
}));
const StyledBadge = withStyles((theme) => ({}))(Badge);

const StyledCardHeader = withStyles((theme) => ({
  root: {
    "& .MuiCardHeader-title": {
      color: "rgba(0, 0, 0, 0.54)",
      fontSize: "1.4rem",
      fontWeight: "800",
    },
    "& .MuiCardHeader-subheader": {
      color: "black",
      fontWeight: "400",
    },
    backgroundColor: "none",
  },
}))(CardHeader);

const StyledListItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      borderRadius: "5px",
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root & .MuiBadge-root,& .MuiListItemText-primary, & .MuiSvgIcon-root": {
        color: theme.palette.common.white,
      },
    },
  },
}))(ListItem);

const Game = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(Array(4).fill(false));
  const { rooms } = useContext(UserContext);
  const socket = SocketManager.getSocket();

  const [displayBoardModal, setDisplayBoardModal] = useState(false);
  const handleShowModal = () => {
    setDisplayBoardModal(true);
  };
  const handleHiddenModal = () => {
    setDisplayBoardModal(false);
  };

  const handleClick = (indexItem) => {
    const changeArray = open.map((item, index) =>
      index === indexItem ? (item = !item) : (item = false)
    );
    setOpen(changeArray);
  };

  const joinRoom = function (id) {
    let room = rooms.find((room) => room.id === id);
    if (room) {
      if (room.hasPassword) {
        handleShowModal();
      } else {
        socket.emit("join-room", id);
      }
    }
  };

  const stateBadge = function (state) {
    if (state === config.GAME_STATE.STARTED) {
      return classes.redBadge;
    }
    return classes.greenBadge;
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <StyledCardHeader
        className={classes.header}
        avatar={
          <StyledBadge
            classes={{ badge: classes.greenBadge }}
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
              style={{
                backgroundColor: "transparent",
                border: "2px solid #fff",
              }}
            >
              <PersonIcon />
            </Avatar>
          </StyledBadge>
        }
        title="Bàn chơi"
        subheader={rooms.length}
      />
      <Divider />
      <CardContent>
        <Box height={300} position="relative" overflow="auto">
          <List className={classes.list}>
            {rooms.map((room, index) => {
              return (
                <React.Fragment key={index}>
                  <StyledListItem div>
                    <ListItemIcon>
                      <StyledBadge
                        classes={{ badge: stateBadge(room.state) }}
                        style={{ backgroundColor: "transparent" }}
                        overlap="circle"
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        variant="dot"
                      >
                        <Avatar aria-label="recipe" src="/static/logo.svg">
                          <PersonIcon style={{ color: "black" }} />
                        </Avatar>
                      </StyledBadge>
                    </ListItemIcon>
                    <ListItemText primary={`#${index}: ${room.id}`} />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => joinRoom(room.id)}
                    >
                      Tham gia
                    </Button>
                    {/* {open[index] ? <ExpandLess /> : <ExpandMore />} */}
                  </StyledListItem>
                  <Collapse in={open[index]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {/* <StyledListItem button className={classes.nested}>
                        <StyledBadge
                          style={{ backgroundColor: "transparent" }}
                          overlap="circle"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <Avatar aria-label="recipe" src="/static/logo.svg">
                            <PersonIcon style={{ color: "black" }} />
                          </Avatar>
                        </StyledBadge>
                        <ListItemText
                          primary={
                            room.playerX === null
                              ? "Chưa có"
                              : room.playerX.username
                          }
                        />
                      </StyledListItem>

                      <StyledListItem button className={classes.nested}>
                        <StyledBadge
                          style={{ backgroundColor: "transparent" }}
                          overlap="circle"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <Avatar aria-label="recipe" src="/static/logo.svg">
                            <PersonIcon style={{ color: "black" }} />
                          </Avatar>
                        </StyledBadge>
                        <ListItemText
                          primary={
                            room.playerO === null
                              ? "Chưa có"
                              : room.playerO.username
                          }
                        />
                      </StyledListItem>

                      <StyledListItem button className={classes.nested}>
                        <StyledBadge
                          style={{ backgroundColor: "transparent" }}
                          overlap="circle"
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                          }}
                          variant="dot"
                        >
                          <Avatar aria-label="recipe" src="/static/logo.svg">
                            <PersonIcon style={{ color: "black" }} />
                          </Avatar>
                        </StyledBadge>
                        <ListItemText
                          primary={
                            room.state === config.GAME_STATE.STARTED
                              ? "Đang chơi"
                              : "Chưa bắt đầu"
                          }
                        />
                      </StyledListItem> */}
                    </List>
                  </Collapse>
                  {displayBoardModal ? (
                    <PasswordInputModal
                      handleToggleModal={handleHiddenModal}
                      roomId={room.id}
                    />
                  ) : null}
                </React.Fragment>
              );
            })}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

Game.propTypes = {
  className: PropTypes.string,
};

export default Game;
