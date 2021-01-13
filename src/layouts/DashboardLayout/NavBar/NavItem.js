import React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Button, ListItem, makeStyles, Divider } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    margin: "8px 0px",
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: "flex-start",
    letterSpacing: 0,
    padding: "10px 8px",
    textTransform: "none",
    width: "100%",
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: "auto",
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: "1rem",
  },
  active: {
    color: theme.palette.primary.main,
    "& $title": {
      fontWeight: theme.typography.fontWeightMedium,
    },
    "& $icon": {
      color: theme.palette.primary.main,
    },
  },
  startAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  endAvatar: {
    textAlign: "center",
    fontSize: "0.8rem",
  },
}));

const NavItem = ({ className, icon: Icon, title, color, value, ...rest }) => {
  const classes = useStyles();

  return (
    <>
      <ListItem
        className={clsx(classes.item, className)}
        disableGutters
        {...rest}
      >
        <ListItemAvatar>
          <Avatar variant="circle" className={classes.startAvatar}>
            {Icon && <Icon />}
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          disableTypography
          primary={title}
          className={classes.title}
        />
        <ListItemAvatar>
          <Avatar
            style={{ backgroundColor: `${color}` }}
            className={classes.endAvatar}
          >
            {color === "#3949ab" ? value + " %" : value}
          </Avatar>
        </ListItemAvatar>
      </ListItem>
      <Divider style={{ margin: "auto -16px" }} />
    </>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
  color: PropTypes.string,
};

export default NavItem;
