import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';

const UserPointer = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: blue;
    box-shadow: 3px 3px 3px blue;
    &:hover {
        background: red;
        cursor: pointer;
    }
    
`


function UserMarker({latitude, longitude}) {
    const [showPopup, setShowPopup] = useState(true);
  return (
    <Marker latitude={latitude} longitude={longitude} >
        <UserPointer />
        <Popup 
        latitude={latitude} 
        longitude={longitude} 
        closeButton={true} 
        closeOnClick={false} 
        onClose={() => setShowPopup(false)} 
        anchor="top">
            
        <div>You are here</div>
        </Popup>
    </Marker>
  );
}

export default UserMarker;
