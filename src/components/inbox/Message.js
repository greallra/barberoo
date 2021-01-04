import React from 'react'
import styled from 'styled-components'
import Avatar from '@material-ui/core/Avatar';
import moment from 'moment';

const AdminWrapper = styled.div`
    width: fit-content;
    margin: 5px auto;
    align-items: center;
    padding: 12px;
    display: flex;
    padding: 12px;
    font-size: 10px;
    background: lightblue;
    border-radius: .5rem;
`
const Body = styled.div`
    width: fit-content;
    align-items: center;
    margin: 5px 0;
    padding: 12px;
    display: flex;
    padding: 12px;
    border-radius: .5rem;
    background: white;
`
const Wrapper = styled.div`
    width: fit-content;
    align-items: center;
    margin: 5px 0;
    padding: 12px;
    display: flex;
    padding: 12px;
 
    border-radius: .5rem;
    position: relative;
`
const Msg = styled.div`
    width: fit-content;
    margin-right: 20px;
    border-radius: .5rem;
`
const Timestamp = styled.div`
    font-size: 10px;
`
const Username = styled.div`
    font-size: 10px;

`
const Sender = styled.div`
    font-size: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    min-width: 100px;
`

export default function Message({text, sender, createdAt}) {
    const userType = sender.user_type;
    if(userType === 'ADMIN') {
        return (
            <AdminWrapper>
                <Msg>{text}</Msg>
                <Timestamp>{moment(createdAt).format('MM:SS')}</Timestamp>
            </AdminWrapper>
        )
    }
    else if(userType === 'BARBER') {
        console.log(`${process.env.REACT_APP_API_URL}/users/${sender._id}/avatar`);
        return (
            <Wrapper>
                <Sender>
                    <Avatar style={{ width: 35, height: 35}} sizes="5" src={`${process.env.REACT_APP_API_URL}/users/${sender._id}/avatar`} />
                    <Username>{sender.username}</Username>
                </Sender>
                <Body>
                    <Msg>{text}</Msg>
                    <Timestamp>{moment(createdAt).format('MM:SS')}</Timestamp>
                </Body>
            </Wrapper>
        )
    }
    else if(userType === 'CLIENT') {
        return (
            <Wrapper>
                <Sender>
                    <Avatar style={{ width: 35, height: 35}} sizes="5" src={`${process.env.REACT_APP_API_URL}/users/${sender._id}/avatar`} />
                    <Username>{sender.username}</Username>
                </Sender>
                <Body>
                    <Msg>{text}</Msg>
                    <Timestamp>{moment(createdAt).format('MM:SS')}</Timestamp>
                </Body>
            </Wrapper>
        )
    } else {
        return <>null</>
    }
    
}
