
import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux'

import { StandardPageWrapper } from '../components/core/styled'
import EditProfile from '../components/settings/EditProfile'



import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"



const ActiveComponent = styled.div`
flex-grow: 1;
`
const ThisWrapper = styled.div`
    display: flex;
    border: 1px solid var(--lightgrey);
    width: 900px;
    margin: auto;
`
const SideNav = styled.div`
    display: flex;
    flex-direction: column;
    width: 230px;
    border-right: 1px solid var(--lightgrey);
`
const NavItem = styled.div`
    padding: 20px;
  
    display: flex;
    align-items: center;
`


export default function ProfileScreen() {
    const user = useSelector(store => store.user) 
    const [activeComponent, setActiveComponent] = useState('edit-profile')
    

    function getActiveComponent(){
        switch (activeComponent) {
             case 'edit-profile':
                 return <EditProfile user={user}/>
                 default:
                 return null;
         }
     }

    return (
        <StandardPageWrapper>
            <ThisWrapper>
                <SideNav>
                    <NavItem>Edit Profile</NavItem>
                    <NavItem>Change Password</NavItem>
                    <NavItem>Language</NavItem>
                </SideNav>
                <ActiveComponent>
                    {getActiveComponent()}
                    
                    {/* <Masonry columnsCount={3} gutter="10px">
                    
                        {user.work_photos.length > 0 && user.work_photos.map( photo => <img 
                        src={`${process.env.REACT_APP_API_URL}/users/${user._id}/${photo._id}/work_photos`} 
                        key={photo._id}
                        style={{width: "100%", display: "block"}}
                        />)}
                        
                    </Masonry> */}
                </ActiveComponent>
            </ThisWrapper>
        </StandardPageWrapper>
    )
}
