import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
// import { Doughnut } from 'react-chartjs-2';
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
  useTheme
} from '@material-ui/core';
import LaptopMacIcon from '@material-ui/icons/LaptopMac';
import PhoneIcon from '@material-ui/icons/Phone';
import TabletIcon from '@material-ui/icons/Tablet';
import PersonIcon from '@material-ui/icons/Person';
import SendIcon from '@material-ui/icons/Send';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import cartouche from '../../library/images/cartouche2.png';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import StatisticalIcon from '../../library/icon/StatisticalIcon'
const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%'
  },
  header: {
    background: `url(${cartouche}) no-repeat`,
    minHeight: '80px',
    display: 'flex',
    textAlign: 'right',
    justifyContent: 'space-between',
    fontWeight: '800'
  },
  list: {
    width: '100%',
    // backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(9),
    textAlign: 'right'
  },
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

const StyledCardHeader = withStyles((theme) => ({
  root: {
    '& .MuiCardHeader-title': {
      color: 'rgba(0, 0, 0, 0.54)',
      fontSize: '1.4rem',
      fontWeight: '800'
    },
    '& .MuiCardHeader-subheader': {
      color: 'black',
      fontWeight: '400',
    },
    backgroundColor: 'none'
  }
}))(CardHeader);


const StyledListItem = withStyles((theme) => ({
  root: {
    "&:hover": {
      borderRadius: '5px',
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root & .MuiBadge-root,& .MuiListItemText-primary, & .MuiSvgIcon-root": {
        color: theme.palette.common.white
      }
    }
  }
}))(ListItem);

const OnlineList = ({ className, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(Array(4).fill(false));

  const handleClick = (indexItem) => {
    const changeArray = open.map((item, index) => index === indexItem ? item = !item : item = false);
    setOpen(changeArray);
  };

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <StyledCardHeader
        className={classes.header}
        avatar={
          <StyledBadge
            style={{ backgroundColor: 'transparent' }}
            overlap="circle"
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            variant="dot"
          >
            <Avatar aria-label="recipe" style={{ backgroundColor: 'transparent', border: '2px solid #fff' }}
            >
              <PersonIcon />
            </Avatar>
          </StyledBadge>
        }
        title="Online"
        subheader="12"
      />
      <Divider />
      <CardContent>
        <Box
          height={300}
          position="relative"
          overflow="auto"
        >
          <List className={classes.list}>
            {[1, 2, 3, 4, 5, 6].map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <StyledListItem button onClick={() => { handleClick(index) }}>
                    <ListItemIcon>
                      <StyledBadge
                        style={{ backgroundColor: 'transparent' }}
                        overlap="circle"
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'right',
                        }}
                        variant="dot"
                      >
                        <Avatar aria-label="recipe" src="/static/logo.svg">
                          <PersonIcon style={{ color: 'black' }} />
                        </Avatar>
                      </StyledBadge>
                    </ListItemIcon>
                    <ListItemText primary="User 1" />
                    {open[index] ? <ExpandLess /> : <ExpandMore />}
                  </StyledListItem>
                  <Collapse in={open[index]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <StyledListItem button className={classes.nested}>
                        <ListItemIcon>
                          <StatisticalIcon />
                        </ListItemIcon>
                        <ListItemText primary="Thông số" />
                      </StyledListItem>
                    </List>
                  </Collapse>
                </React.Fragment>
              )
            })}
          </List>
        </Box>
      </CardContent>
    </Card>
  );
};

OnlineList.propTypes = {
  className: PropTypes.string
};

export default OnlineList;
