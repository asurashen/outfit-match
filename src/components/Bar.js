import React, { Component, useState, useEffect } from 'react'
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import CameraIcon from '@mui/icons-material/PhotoCamera';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {DialogTitile, FormControl, InputLabel, Input} from '@material-ui/core'
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';



const useStyles = makeStyles(theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    formControl: {
        marginTop: theme.spacing(2),
    },
}));






function Bar(props){
    const classes = useStyles();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [token, setToken] = useState("");
    const [open, setOpen] = React.useState(false);
    const [openS, setOpenS] = React.useState(false);
    const [openI, setOpenI] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [admin, setAdmin] = React.useState(false);
    const [openSnackLogin, setOpenSnackLogin] = React.useState(false);
    const [openSnackSignUp, setOpenSnackSignUp] = React.useState(false);

    const handleCloseSL = () =>{
        setOpenSnackLogin(false);
    }

    const handleCloseSS = () =>{
        setOpenSnackSignUp(false);
    }


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log(token);
    };


    const handleSubmit = () =>{
        fetchLogin();

    };


    const handleLogout = () =>{
        setIsLoggedIn(false);
        props.loginCallback({'isLogin':false, 'token':'', 'admin':false})
    };

    const handleCloseS = () => {
        setOpenS(false);
    };

    const handleClickOpenS = () => {
        setOpenS(true);
    };

    const handleSubmitS = () => {
        console.log(email)
        console.log(password)
        var myHeaders = new Headers();

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://glass-mantra-365915.ue.r.appspot.com/signup", requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                setOpenSnackSignUp(true);
            })
            .catch(error => console.log('error', error));
        setOpenS(false);
    };

    const fetchLogin = () =>{
        var myHeaders = new Headers();

        var formdata = new FormData();
        formdata.append("email", email);
        formdata.append("password", password);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch("https://glass-mantra-365915.ue.r.appspot.com/login", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result);
                    setToken(result['token']);
                    //console.log(result['token']);
                    setIsLoggedIn(true);
                    handleClose();
                    setOpenSnackLogin(true);
                }
            )
            .catch(error => console.log('error', error));
    }

    const fetchAdmin = () =>{
        var myHeaders = new Headers();
        console.log(token)
        myHeaders.append("x-access-token", token);

        console.log(token)
        var formdata = new FormData();

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'

        };

        fetch("https://glass-mantra-365915.ue.r.appspot.com/profile", requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result);
                setAdmin(result['admin'])}
                )
            .catch(error => console.log('error', error));
    }

    const handleCallback = () =>{
        console.log(admin)
        props.loginCallback({'isLogin':true, 'token':token, 'admin':admin});

    };

    const handleOpenI = () =>{
        setOpenI(true);
        fetchAdmin();
        handleCallback();

    };

    const handleCloseI = () =>{
        setOpenI(false);
    }


    return(
        <Toolbar sx={{ flexWrap: 'wrap', backgroundColor: (`obj.#D0D0D0`) }}>
            <CameraIcon sx={{ mr: 2 }} />
            <Typography variant="h6" color="inherit" noWrap  sx={{ flexGrow: 1 }}>
                Outfit Finder
            </Typography>
            <nav>
                <Button color="inherit" >Support</Button>
                {isLoggedIn ? (
                    <>
                        <Button color="inherit" onClick={handleLogout}>Log Out</Button>
                        <Button color="inherit" onClick={handleOpenI} sx={{ my: 1, mx: 1.5 }}>Check Profile</Button>
                    </>
                ) : (
                    <>
                        <Button variant="outlined" color="inherit" onClick={handleClickOpen}>
                            Login in
                        </Button>

                        <Button variant="outlined" color="inherit" onClick={handleClickOpenS} sx={{ my: 1, mx: 1.5 }}>
                            Sign Up
                        </Button>

                    </>
                )}
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Log In</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter your email address and password to log in.
                        </DialogContentText>
                        <form className={classes.form} onSubmit={handleSubmit}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">Cancel</Button>
                        <Button onClick={handleSubmit} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>

                <Dialog open={openS} onClose={handleCloseS}>
                    <DialogTitle>Sign Up</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Please enter email address and password to sign up.
                        </DialogContentText>
                        <form className={classes.form} onSubmit={handleSubmitS}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="email">Email Address</InputLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={event => setEmail(event.target.value)}
                                />
                            </FormControl>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={event => setPassword(event.target.value)}
                                />
                            </FormControl>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseS} color="primary">Cancel</Button>
                        <Button onClick={handleSubmitS} color="primary">Submit</Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={openI}
                    onClose={handleCloseI}
                    aria-labelledby="user-info-dialog-title"
                    aria-describedby="user-info-dialog-description"
                >
                    <DialogTitle id="user-info-dialog-title">User Information</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="user-info-dialog-description">
                            <p>Email: {email}</p>
                            {admin? (<p>You are in admin mode</p>):(<p>You are in normal mode</p>)}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        {admin? (
                            <>
                                <Button onClick={handleCallback} color="primary">
                                    View Admin Feature
                                </Button>
                                <Button onClick={handleCloseI} color="primary">
                                    Close
                                </Button>

                            </>
                            ):(
                                <Button onClick={handleCloseI} color="primary">
                                    Close
                        </Button>)}

                    </DialogActions>
                </Dialog>
            </nav>
            <>
                <Snackbar
                    open={openSnackLogin}
                    autoHideDuration={6000}
                    onClose={handleCloseSL}
                    message="Successfully Logged In"
                />
                <Snackbar
                    open={openSnackSignUp}
                    autoHideDuration={6000}
                    onClose={handleCloseSS}
                    message="Successfully Signed Up"
                />
            </>


        </Toolbar>

    )

}
export  default  Bar;