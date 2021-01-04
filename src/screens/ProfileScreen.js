
import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { StandardPageWrapper } from '../components/core/styled'
import WorkPhotos from '../components/profile/WorkPhotos'

import SettingsIcon from '@material-ui/icons/Settings';
import IconButton from '@material-ui/core/IconButton';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import EuroIcon from '@material-ui/icons/Euro';

const TopRow = styled.div`
    display: flex;
    border-bottom: 1px solid var(--superlight-grey);
`
const Left = styled.div`
    width: 250px;
    padding: 40px;
`
const Right = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    padding: 40px;
`
const Img = styled.img`
    width: 200px;
    border-radius: 50%;
`
const Row = styled.div`
    padding: 10px;
    display: flex;
    align-items: center;
`
const Username = styled.div`
    font-size: var(--l);
    font-weight: 300;
 
`
const EditWrapper = styled.div`
    display: flex;
    margin: 0 10px;
    height: fit-content;
    align-items: center;
    justify-content: center;
    // background: var(--lightgrey);
    border-radius: .5rem;
    border: 1px solid var(--lightest-grey);
    font-size: var(--n);
    
`
const Text = styled.div`
    font-size: var(--n);
    padding: 5px;
`
const ShortSummary = styled.div`
    font-size: var(--n);
    padding: 15px;
    border: var(--grey-rounded);
    border-radius: .5rem;
    min-height: 70px;
`
const Tabs = styled.div`
    display: flex;
    margin: 0 10px;
    padding: 20px;
    height: fit-content;
    align-items: center;
    justify-content: center;
   
`
const Tab = styled.div`
    color:  ${props => props.activeTab ? 'var(--black)': 'var(--lightish-grey)'};
    display: flex;
    margin: 0 10px;
    height: fit-content;
    align-items: center;
    justify-content: center;
    &:hover {
        cursor: pointer;
        color: var(--black);
    }
`
 

export default function ProfileScreen() {
    const user = useSelector(store => store.user)
    const history = useHistory()
    const [activeTab, setActiveTab] = useState('photos')

    function renderActiveTab(){
        if(activeTab === 'photos') {
            return <WorkPhotos user={user}/>
        }
    }

    return (
        <StandardPageWrapper>

            <TopRow>
                <Left>
                    <Img src={user.avatar ? `${process.env.REACT_APP_API_URL}/users/${user._id}/avatar` : `https://via.placeholder.com/50`}/>
                </Left>
                <Right>
                    <Row>
                        <Username>{user.username}</Username>
                        <EditWrapper onClick={ () => history.push('/settings')}>
                            <Text>Edit Profile</Text>
                            <IconButton style={{padding: 5}}>
                                <SettingsIcon />
                            </IconButton>
                        </EditWrapper>
                    </Row>
                    <Row>
                        <Text style={{padding: 0}}>{user.user_type}</Text>
                    </Row>
                    <Row>
                        <ShortSummary >{user.short_summary}</ShortSummary>
                    </Row>
                </Right>
            </TopRow>

            <Tabs>
                <Tab activeTab={activeTab === 'photos'} onClick={ () => setActiveTab('photos') }><Text>Recent Work</Text> <PhotoLibraryIcon /></Tab>
                <Tab activeTab={activeTab === 'pricing'} onClick={ () => setActiveTab('pricing')}><Text>Pricing</Text> <EuroIcon /></Tab>
            </Tabs>
           
            {renderActiveTab()}
        </StandardPageWrapper>
    )
}
