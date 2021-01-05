import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';


import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { startLogin } from '../redux/actions/user'

import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


const Wrapper = styled.label`
    // height: 90px;
    // background: red;
    // display: flex;
    // align-items: center;
`

export default function LoginScreen() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const dispatch = useDispatch()
    const user = useSelector( (store) => store.user )
    const errorMessage = useSelector( (store) => store.user.loginErrorMessage )

    function handleSubmit(e){
        e.preventDefault();
        //validate
        dispatch(startLogin(email, password))
    }
 
    useEffect(() => {
      console.log("errorMessage", errorMessage);
  
    }, [errorMessage])
    // useEffect(() => {
    //   console.log("user", user);
      
    // }, [user])
      
    if (user.isAuthenticated){
      history.push('/profile')
    }
  

    return (
        <Wrapper>
            <form className={classes.root} noValidate autoComplete="off" onSubmit={handleSubmit}>
                {errorMessage ? <Alert severity="error">{errorMessage}</Alert> : <Alert severity="error" style={{visibility: 'hidden'}}></Alert>} 
                <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Email" value={email} onChange={ e => setEmail(e.target.value)}/>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" label="Password" value={password} onChange={ e => setPassword(e.target.value) }/>
                <Button variant="contained" color="secondary" type="submit">
                Login
                </Button>
            </form>
   
        </Wrapper>
    )
}
