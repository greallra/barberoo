import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux'
import { getConversations, toggleConversation, deleteConversation } from '../../redux/actions/chat'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import Avatar from '@material-ui/core/Avatar';



const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    // alignItems: 'center',
    // '& > *': {
    //   margin: theme.spacing(1),
    // },
  },
  active: {
      background: 'var(--superlight-grey)'
  }
}));

const SettingsWrapper = styled.div`
  border: var(--grey-rounded);
  position: absolute;
  display: flex;
  flex-direction: column;
  right: -87px;
    z-index: 5;
`
const SettingsItem = styled.div`
 padding: 10px;
 font-size: var(--xs);
`
export default function Conversations() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const me = useSelector(store => store.user) 
    const store = useSelector(store => store) 
    const conversations = useSelector( store => store.chat.conversations)
    const activeMessagesId = useSelector( store => store.chat.activeMessagesId)

    useEffect(() => {
       dispatch(getConversations())
    }, [])
    useEffect(() => {
      console.log("store", store);
    }, [store])

    function handleToggleConversation(_id){
      dispatch(toggleConversation(_id))
    }
   
    function handleDeleteConversation(id) {
      dispatch(deleteConversation(id))
    }

    return (
      <div className={classes.root}>
           <List component="nav" className={classes.root} aria-label="mailbox folders">
              {conversations && conversations.length > 0 ? conversations.map( (conversation, i) => {
                let notMe = conversation.users.find( (user => user.first_name !== me.first_name))
         
                return ( <>
                  <ListItem 
                    button 
                    onClick={ () => handleToggleConversation(conversation._id) } 
                    key={conversation._id} 
                    className={ conversation._id === activeMessagesId ? classes.active : '' }>
                      <ListItemText primary={notMe ? notMe.username : 'nada'} />
                      <IconButton>
                        <DeleteIcon style={{color: 'var(--lightest-grey)'}} onClick={ () => handleDeleteConversation(conversation._id) }/>
                      </IconButton>
                      {/* <SettingsWrapper>
                        <SettingsItem>Delete Conversation</SettingsItem>
                      </SettingsWrapper> */}
                  </ListItem>
                  <Divider light />
                </>
                )

              }): (
                <ListItem button divider>
                  <ListItemText primary="no chats" />
                </ListItem>
              )}
                {/* <ListItem button className={ classes.active }>
                    <ListItemText primary="name" />
                </ListItem>
                <Divider />
                <ListItem button divider>
                    <ListItemText primary="name" />
                </ListItem>
                <ListItem button>
                    <ListItemText primary="name" />
                </ListItem>
                <Divider light />
                <ListItem button>
                    <ListItemText primary="name" />
                </ListItem> */}
            </List>  
      </div>
    );
    }