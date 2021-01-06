import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  makeStyles
} from '@material-ui/core';
import Logo from '../../components/Logo';
import auth from '../../components/common/router/auth';
const useStyles = makeStyles(({
  root: {},
  toolbar: {
    height: 64
  }
}));

const TopBar = ({ className, ...rest }) => {
  const classes = useStyles();
  const isAuthenticated = auth.isAuthenticated();
  return (
    <AppBar
      className={clsx(classes.root, className)}
      elevation={0}
      {...rest}
    >
      <Toolbar className={classes.toolbar}>
        {isAuthenticated ? (<RouterLink to="/">
          <Logo />
        </RouterLink>) : (<RouterLink to="/login">
          <Logo />
        </RouterLink>)}

      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string
};

export default TopBar;
