import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import scissors from '../scissors.png'
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { removeToken } from '../http/localStorage'

import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

const Nav = styled.div`
    height: 90px;
    background: red;
    display: flex;
    align-items: center;
`
const NavItem = styled.div`
    padding: 20px;
    color: white;
`
const NavItemsCont = styled.div`
    padding: 20px;
    display: flex;
    flex-grow: 4;
`
const NavLogo = styled.div`
    padding: 20px;
    flex-grow: 1;
`

const useStyles = makeStyles((theme) => ({
  root: {

  },
  appBar: {
    background: 'red'
  },
  navItem: {
    margin: '0 10px',
    fontWeight: 300,
    '&:hover': {
      cursor: 'pointer',
      color: 'var(--lightgrey)'
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  authSection: {
    marginLeft: 'auto',
  },
  publicSection: {
    marginLeft: 'auto',
    display: 'flex',
  },
}));


function NavBar() {
  const user = useSelector(store => store.user) 
  const history = useHistory()
  const location = useLocation()

  function logout(){
    removeToken();
    window.location.href = '/'
  }

  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const active = {
    color: 'var(--faded-red)',
    fontWeight: 500
  }
  const activeNav = location.pathname.slice(1);
  return (
    <div className={classes.root}>
      {/* <FormGroup>
        <FormControlLabel
          control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          {/* IS AUTHENTICATED */}
          {user.isAuthenticated && user.user_type !== 'ADMIN' && ( <>
            <Typography variant="h6"  onClick={ () => history.push('/map')} className={classes.navItem} style={activeNav === "map" ?  active : null}>
              Barbers
            </Typography>
            <Typography variant="h6" onClick={ () => history.push('/profile')} className={classes.navItem} style={activeNav === "profile" ?  active : null}>
              Profile
            </Typography>
            <Typography variant="h6" onClick={ () => history.push('/inbox')} className={classes.navItem} style={activeNav === "inbox" ?  active : null}>
              Inbox
            </Typography>
          </> )}
          {user.isAuthenticated && user.user_type !== 'ADMIN' && (
            <div className={classes.authSection}>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
                <MenuItem onClick={ () => { handleClose(); history.push('/settings'); }}>Settings</MenuItem>
                <MenuItem onClick={logout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
          {/* END IS AUTHENTICATED */}
          {/* PUBLIC */}
          {!user.isAuthenticated && <>
            <IconButton  color="inherit">
            <Typography variant="h6"  onClick={ () => history.push('/map')}>
              How it Works
            </Typography>
          </IconButton>
            <IconButton  color="inherit">
            <Typography variant="h6"  onClick={ () => history.push('/map')}>
              Contact
            </Typography>
          </IconButton>
          </>}
          {!user.isAuthenticated &&   <div className={classes.publicSection}>
                <MenuItem onClick={ () => history.push('/login')}>Login</MenuItem>
                <MenuItem onClick={ () => history.push('/signup')}>Signup</MenuItem>
            </div>}
          {/* END PUBLIC */}
          {/* ADMIN */}
          {user.user_type === 'ADMIN' && <>
          <IconButton  color="inherit">
            <Typography variant="h6"  onClick={ () => history.push('/admin-map')}>
             Map (All users)
            </Typography>
          </IconButton>
          
          </>}

          {/*END ADMIN */}
        </Toolbar>
      </AppBar>
    </div>

  )
  return (
    <Nav>
      <NavLogo><img src={scissors} style={{width: '24px'}} alt=""/></NavLogo>
      <NavItemsCont>

       
        {user.isAuthenticated ? 
        <>
        <NavLink to="/map"><NavItem>Find a barber</NavItem></NavLink>
        <NavItem onClick={logout}>Logout</NavItem>
          <NavLink to="/dashboard"><Avatar alt="Remy Sharp" src="" /></NavLink>
          <div>{user.first_name}</div>
          
        </>
        : 
        <>
         <NavLink to="/howitworks"><NavItem>How It Works</NavItem></NavLink>
          <NavLink to="/contact"><NavItem>Contact</NavItem></NavLink>
          <NavLink to="/login"><NavItem>Login</NavItem></NavLink>
          <NavLink to="/signup"><NavItem>Sign Up</NavItem></NavLink>
        </>
        }
      </NavItemsCont>
    </Nav>
  );
}

export default NavBar;




        