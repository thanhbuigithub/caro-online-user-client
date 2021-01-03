import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import UserContext from '../../../contexts/UserContext';
import EventIcon from '@material-ui/icons/Event';
import Grid from "@material-ui/core/grid";
import moment from 'moment';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  makeStyles
} from '@material-ui/core';

// const user = {
//   avatar: '/static/logo.svg',
//   city: 'Los Angeles',
//   country: 'USA',
//   jobTitle: 'Senior Developer',
//   name: 'Katarina Smith',
//   timezone: 'GTM-7'
// };

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 100,
    width: 100
  }
}));

const Profile = ({ className, ...rest }) => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const date = new Date(user.date);
  const dateText = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
  const timeText = moment(date).format('HH:mm:ss');
  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
        >
          <Avatar
            className={classes.avatar}
            src="/static/logo.svg"
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h3"
          >
            {user.name}
          </Typography>
          <Typography
            color="textSecondary"
            variant="body1"
          >
            {user.isAdmin ? 'Admin' : 'User'}
          </Typography>
          <Grid container justify="space-between" >
            <Grid item xs={12} md={6}  >
              <Box display="flex">
                <EventIcon color='secondary' />
                <Typography
                  color="textSecondary"
                  variant="body1"
                  component="span"
                  style={{ marginLeft: '5px' }}
                >
                  Date Join
              </Typography>
              </Box>
              <Typography
                className={classes.dateText}
                color="textSecondary"
                variant="body1"
                style={{ paddingLeft: '29px' }}
              >
                {dateText}
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} >
              <Box display="flex" justifyContent="flex-end">
                <EventIcon color='secondary' />
                <Typography
                  color="textSecondary"
                  variant="body1"
                  component="span"
                  style={{ marginLeft: '5px' }}
                >
                  Time Join
              </Typography>
              </Box>
              <Typography
                className={classes.dateText}
                color="textSecondary"
                variant="body1"
                style={{ textAlign: 'end' }}
              >

                {timeText}
                {/* {`${moment().format('hh:mm A')} ${user.date}`} */}
              </Typography>

            </Grid>
          </Grid>

        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          color="primary"
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
