import React, { useEffect } from 'react'
import styled from 'styled-components'
import User from '../components/inbox/User'
import Conversations from '../components/inbox/Conversations'
import Message from '../components/inbox/Message'
import MessageComposer from '../components/inbox/MessageComposer'
import { useSelector, useDispatch } from 'react-redux'

import { addMessage } from '../redux/actions/chat'

import Pusher from 'pusher-js'

import img from '../back.jpeg'
const imgLink = 'https://i.imgur.com/TnNwdvV.png'


const Wrapper = styled.div`
   height: calc(100vh - 64px);
   display: flex;

`
const Left = styled.div`
   width: 270px;
`
const Right = styled.div`
   border-left: 1px solid var(--dark);
   flex: 1;
`
const Top = styled.div`
   height: 70px;
   border-bottom: 1px solid var(--dark);
   display: flex;
`
const Bottom = styled.div`
   
`
const TopLeft = styled.div`
    border-bottom: 1px solid var(--dark);   
    height: 70px;
    background: var(--chat-grey);
    border-right: 1px solid var(--dark-grey);
`
const TopRight = styled.div`
    background: var(--chat-grey);   
    height: 70px;
`
const BottomLeft = styled.div`
   
`
const BottomRight = styled.div`
   height: 100%;
   display: flex;
   flex-direction: column;
   background-image: url("paper.gif");
   background-image: url("https://i.imgur.com/TnNwdvV.png");
`
const MessagesWrapper = styled.div`
    padding: 20px;
    flex-grow: 1;
    background-image: ${props => props.activeMessages.length === 0 ? ` none;`: `background-image: url("https://i.imgur.com/TnNwdvV.png");`}
    background-size: cover;
`

export default function Inbox() {
    const activeMessages = useSelector( store => store.chat.activeMessages)
    const inConversationWith = useSelector( store => store.chat.inConversationWith)
    const user = useSelector( store => store.user)
    const dispatch =  useDispatch()

    useEffect(() => {
        // Enable pusher logging - don't include this in production
        // Pusher.logToConsole = true;
        console.log("process.env.REACT_APP_PUSHER_KEY,", process.env.REACT_APP_PUSHER_KEY,);
        const pusher = new Pusher(process.env.REACT_APP_PUSHER_KEY, {
          cluster: 'eu'
        });
    
        var channel = pusher.subscribe('barberoo-channel');
    
        channel.bind('new-message', function(data) {
    
          console.log('new-message', data);
          dispatch(addMessage(data))
          // could refrefesh all messages or refetch all messages
          // setMessages([...messages, data])
        });
        
        pusher.connection.bind('connected', function() {
          console.log('Realtime is go!');
        });
        // var callback = function(eventName, data) {
        //   console.log(`bind global: The event ${eventName} was triggered with data ${JSON.stringify(data)}`);
        // };
        // //bind to all events on the connection
        // pusher.bind_global(callback);
    
        return () => {
          channel.unbind_all();
          channel.unsubscribe();
        }
      }, [])
  
    return (
        <Wrapper>
            <Left>
                    {/* User */}
                    {/* <TopLeft><User></User></TopLeft> */}
                    <BottomLeft><Conversations /></BottomLeft>
            </Left>
            <Right>
                {/* <TopRight>
                    <div>{inConversationWith && inConversationWith.username}</div>
                    {inConversationWith && inConversationWith.username && <img style={{width: 50}} src={`${process.env.REACT_APP_API_URL}/users/${inConversationWith._id}/avatar`} />} 
                </TopRight>   */}
                <BottomRight>
                    <MessagesWrapper activeMessages={activeMessages}>
                        {activeMessages.length > 0 && activeMessages.map((message) => {
                            return <Message {...message}/>
                        })} 
                    </MessagesWrapper>
                    <MessageComposer />
                </BottomRight>
                  
            </Right>
           
        </Wrapper>
    )
}
