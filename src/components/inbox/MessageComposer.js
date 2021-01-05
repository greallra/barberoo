import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import axios from '../../axios';

import { sendMessage } from '../../redux/actions/chat'
import { useSelector, useDispatch} from 'react-redux';


const MC = styled.form`
   display: flex;
   padding: 20px;
   background: var(--superlight-grey);
`
const Input = styled.input`
   border: none;
   border-radius: .5rem;
   padding: 10px;
   margin-right: 10px;
   flex-grow: 1;
   &:focus {
    outline: none;
   }
`
const Send = styled.button`
   
`

export default function MessageComposer() {
    const [text, setText] = useState('')
    const activeMessagesId = useSelector( store => store.chat.activeMessagesId)
    const dispatch = useDispatch()

    function handleSendMessage(e) {
        e.preventDefault()
        
        if(activeMessagesId && text) {
            dispatch(sendMessage(activeMessagesId, text))
            setText('')
        }
       
    }
    return (
        <MC onSubmit={handleSendMessage}>
            <Input text={text} onChange={ (e) => setText(e.target.value) }></Input>
            <IconButton><Button type="submit" variant="outlined">Send</Button></IconButton>
        </MC>
    )
}
