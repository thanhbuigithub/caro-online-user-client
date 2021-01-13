import React, { useState, useContext, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  Icon,
  makeStyles,
  withStyles,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  Button,
  Typography,
  Menu,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import InputIcon from "@material-ui/icons/Input";
import PersonIcon from "@material-ui/icons/Person";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Logo from "../../components/Logo";
import auth from "../../components/common/router/auth";
import UserContext from "../../contexts/UserContext";
import socketManager from "../../socketio/SocketManager";
import userApi from "../../api/userApi";
import Auth from "../../components/common/router/auth";

const StyledMenu = withStyles({
  paper: {
    border: "2px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const useStyles = makeStyles((theme) => ({
  root: {},
  menuItem: {
    display: "flex",
    alignItems: "center",
    minWidth: 185,
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    marginLeft: theme.spacing(1),
    backgroundColor: "transparent",
  },
  button: {
    display: "flex",
    justifyContent: "space-between",
    paddingRight: "20px",
    paddingLeft: "20px",
    borderRadius: "24px",
    color: theme.palette.common.white,
    "&:hover": {
      color: theme.palette.common.black,
      background: "rgba(255, 255, 255, 0.6)", //rgba(0, 0, 0, 0.04)
      "& .MuiSvgIcon-root": {
        color: theme.palette.common.black,
      },
    },
  },
}));

const TopBar = ({ className, data, onMobileNavOpen, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const { _id, user, handleSaveUser, handleSaveAvatar, avatar } = useContext(
    UserContext
  );
  const socket = socketManager.getSocket();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    const user = Auth.getCurrentUser();
    console.log(socket);
    console.log("EMIT JOIN");
    socket.emit("join", user._id);
    // return () => {
    //   socketManager.closeSocket();
    // };
  }, []);

  useEffect(() => {
    const getProfile = async () => {
      try {
        console.log("TOPBAR RENDERING");
        const fetchUser = await userApi.getProfile();
        handleSaveUser(fetchUser);
        // socket.emit("join", fetchUser._id);
        // console.log("EMIT JOIN");
        console.log("USER: " + JSON.stringify(fetchUser));
        //socket.emit("join", fetchUser._id);
      } catch (err) {
        console.log("header: Failed to get profile: ", err);
      }
    };
    getProfile();
  }, []);

  // useEffect(() => {
  //   //const user = auth.getCurrentUser();
  //   console.log(user);
  //   socket.emit("join", user._id);
  //   // return () => {
  //   //   socketManager.closeSocket();
  //   // };
  // }, []);

  useEffect(() => {
    const getAvatar = async () => {
      try {
        const fetchUser = await userApi.getAvatar(_id);
        if (fetchUser.success) {
          handleSaveAvatar(fetchUser.path);
        }
      } catch (err) {
        console.log("Avatar not updated");
      }
    };
    getAvatar();
  }, [avatar, _id]);

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
        <Box flexGrow={1} />
        <Button
          aria-haspopup="true"
          aria-controls="simple-menu"
          onClick={handleClick}
          className={classes.button}
        >
          <Typography
            align="left"
            variant="subtitle1"
            style={{ textTransform: "capitalize" }}
          >
            Hi,&nbsp;
            <Typography variant="overline" style={{ textTransform: "none" }}>
              {user.name}
            </Typography>
          </Typography>
          <Avatar className={classes.avatar}>
            <InputIcon />
          </Avatar>
        </Button>
        <StyledMenu
          id="customized-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <StyledMenuItem
            onClick={() => {
              navigate("/profile");
              handleClose();
            }}
          >
            <ListItemIcon>
              <PersonIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Profile" />
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => {
              navigate("/change_password");
              handleClose();
            }}
          >
            <ListItemIcon>
              <VpnKeyIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </StyledMenuItem>
          <StyledMenuItem
            onClick={() => {
              auth.logout(() => {
                navigate("/login");
              });
            }}
          >
            <ListItemIcon>
              <ExitToAppIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </StyledMenuItem>
        </StyledMenu>
        {/* <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",//bottom
            horizontal: "left",//left
          }}
          transformOrigin={{
            vertical: "bottom",//bottom
            horizontal: "right",//right
          }}
          getContentAnchorEl={null}
        >
          <MenuItem >Profile</MenuItem>
          {/* {!isSocialLogin ? <MenuItem onClick={handleChangePassword}>Change Password</MenuItem> : null} */}
        {/* <MenuItem >Logout</MenuItem>
        </Menu> } */}
        <Hidden lgUp>
          <IconButton
            style={{ marginLeft: "8px" }}
            color="inherit"
            onClick={onMobileNavOpen}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
};

export default TopBar;
