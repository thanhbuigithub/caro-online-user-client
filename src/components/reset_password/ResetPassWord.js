import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import userApi from "../../api/userApi";

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    title: {
        margin: '1em 0',
        fontFamily: 'ThirstyScript',
        color: '#8e24aa',
        fontSize: '2.5em'
    },
    active: {
        marginTop: '0.35em',
        color: '#555'
    },
    form: {
        width: '500px',
        margin: 'auto',
        padding: '2em',
        backgroundColor: '#ffffff',
        marginBottom: '40px',
        borderRadius: '0.125rem',
        boxShadow: '0 4px 20px 0 rgba(0,0,0,0.1)'
    },
    activeButton: {
        padding: '10px',
        marginTop: '20px',
        backgroundColor: '#8e24aa',
        '&:hover': {
            backgroundColor: '#9F45B7'
        }
    },
    resetButton: {
        padding: '10px',
        backgroundColor: '#048DFF',
        '&:hover': {
            backgroundColor: '#3CB3FF'
        }
    },
    loginButton: {
        padding: '10px',
        backgroundColor: '#048DFF',
        '&:hover': {
            backgroundColor: '#3CB3FF'
        }
    },
    or: {
        margin: '10px',
    },
    link: {
        display: 'block',
        width: '100%',
        color: '#ffffff',
        textDecoration: 'none'
    }
}));


export default function ResetPassWord({ match }) {
    const classes = useStyles();
    const [form, setForm] = useState({
        token: '',
        passWordNew: '',
        passWordConfirm: '',
        showLogin: false
    });
    const { token, passWordNew, passWordConfirm, showLogin } = form;

    useEffect(() => {
        let token = match.params.token;
        if (token) {
            setForm({ ...form, token });
        };
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const handleChange = text => e => {
        setForm({ ...form, [text]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passWordNew && passWordConfirm && (passWordNew === passWordConfirm)) {
            try {
                const res = await userApi.resetPassword(passWordNew, token);
                setForm({
                    ...form,
                    passWordNew: '',
                    passWordConfirm: '',
                    showLogin: true
                });
                toast.success(res.message);
            } catch (err) {
                console.log(err);
                toast.error(err.response.data);
            }
        } else {
            if (!passWordNew || !passWordConfirm) {
                toast.info('Vui lòng điền đầy đủ thông tin !');
            } else {
                toast.error('Mật khẩu không trùng khớp ');
            }
        }

    };

    return (
        <Container component="main" maxWidth="md">
            <CssBaseline />
            <ToastContainer />
            <Typography variant="h4" align="center" className={classes.title}>
                Caro Online
                </Typography>
            <div className={classes.paper}>
                <form className={classes.form} noValidate onSubmit={handleSubmit}>
                    <Typography variant="h4" align="center" gutterBottom className={classes.active}>
                        New Password User
                    </Typography>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name={passWordNew}
                        value={passWordNew}
                        label="New password"
                        type="password"
                        id="password"
                        onChange={handleChange('passWordNew')}
                        autoComplete="current-password" />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name={passWordConfirm}
                        value={passWordConfirm}
                        onChange={handleChange('passWordConfirm')}
                        label="Confirm password"
                        type="password"
                        id="confirm-password" />
                    <Button
                        className={classes.activeButton}
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary">
                        Reset Password
                    </Button>
                    <Typography align="center" className={classes.or}>Or&nbsp;
                    </Typography>
                    {!showLogin ? <Link to="/forgot_password" className={classes.link}>
                        <Button
                            className={classes.resetButton}
                            fullWidth
                            variant="contained"
                            color="primary">
                            Reset Again
                    </Button>
                    </Link> : <Link to="/login" className={classes.link}>
                            <Button
                                className={classes.loginButton}
                                fullWidth
                                variant="contained"
                                color="primary">
                                Login
                    </Button>
                        </Link>}

                </form>
            </div>
        </Container>
    );
}