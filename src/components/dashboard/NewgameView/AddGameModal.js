import React, { useState, useEffect, useContext } from "react";
import {
  Box,
  InputAdornment,
  Switch,
  FormControlLabel
} from '@material-ui/core';
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
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import SocketManager from "../../../socketio/SocketManager";
import GameContext from "../../../contexts/GameContext";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import { Formik } from 'formik';
import swal from 'sweetalert';
import { purple } from '@material-ui/core/colors';
import Grid from "@material-ui/core/Grid";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#8e24aa",
    },
  },
});

const useStyles = makeStyles((theme) => ({
  form: {
    width: "500px",
    margin: "auto",
    padding: "1em",
    backgroundColor: "#ffffff",
    marginBottom: "40px",
    borderRadius: "0.125rem",
    boxShadow: "0 4px 20px 0 rgba(0,0,0,0.1)",
  },
  loginButton: {
    padding: "10px",
    marginTop: "20px",
    backgroundColor: "#2cbc63",
    "&:hover": {
      backgroundColor: "#22934d",
    },
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
    '&$checked': {
      color: purple[500],
    },
    '&$checked + $track': {
      backgroundColor: purple[500],
    },
  },
  checked: {},
  track: {},
})(Switch);

export default function AddBoardModal({ handleToggleModal }) {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [checkedA, setCheckedA] = useState(true);
  const [checkedB, setCheckedB] = useState(false);
  const [form, setForm] = useState({
    name: "",
    content: "",
  });
  const { name, content } = form;
  const socket = SocketManager.getSocket();
  const { init } = useContext(GameContext);
  let history = useNavigate();

  const handleChange = (text) => (e) => {
    setForm({ ...form, [text]: e.target.value });
  };

  const handleChangeCheckboxA = (event) => {
    setCheckedA(event.target.checked);
    setCheckedB(!event.target.checked);
  };

  const handleChangeCheckboxB = (event) => {
    setCheckedA(!event.target.checked);
    setCheckedB(event.target.checked);
  };

  const handleClose = () => {
    handleToggleModal();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const onClickCreate = () => {
    socket.emit("create-room");
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
              Create new game
                  </Typography>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <Grid container justify="center">
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <PurpleSwitch
                    checked={checkedA}
                    onChange={handleChangeCheckboxA}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    labelplacement="start"
                    edge="end"
                  />
                }
                label="Public"
              /></Grid>
            <Grid item xs={6}>
              <FormControlLabel

                control={
                  <Switch
                    checked={checkedB}
                    onChange={handleChangeCheckboxB}
                    name="checkedA"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                    color="secondary"
                    labelplacement="start"
                    edge="end"
                  />
                }
                label="Set password"
              />
            </Grid>
          </Grid>
          <Formik
            initialValues={{
              password: ''
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string().max(10, 'Password contains at most 10 characters').required('Password is required')
            })}
            onSubmit={async (values) => {
              const { password } = values;
              await swal({
                title: "Creating...",
                text: "Please wait",
                icon: "/static/loading.gif",
                button: false,
                timer: 2000,
                closeOnClickOutside: false,
                closeOnEsc: false
              })
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                {checkedB ? (<TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <VpnKeyIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={(e) => setShowPassword(!showPassword)}
                          onMouseDown={(e) => {
                            e.preventDefault();
                          }}
                          edge="end"
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                />) : null}


                <Box my={2}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    onClick={onClickCreate}
                  >
                    Create
            </Button>
                </Box>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
    </>
  );
}
