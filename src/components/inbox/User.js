import React from 'react'

import { useSelector } from 'react-redux'

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function User() {
    const user = useSelector( store => store.user )
    const classes = useStyles();

    return (
      <div className={classes.root}>
          <Avatar alt="Cindy Baker" src={`${process.env.REACT_APP_API_URL}/users/${user._id}/avatar`} />
          <div>{user.username}</div>
      </div>
    );

}
