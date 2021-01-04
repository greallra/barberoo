import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import scissors from '../../scissors.png';
import BarberPopup from '../popups/BarberPopup';

const ScissorsImgWrapper = styled.div`
    padding: 8px;
    border-radius: 50%;
    background: var(--transparent-white);
    box-shadow: 3px 3px 3px #e78267;
    &:hover {
        background: #e78267;
        box-shadow: 3px 3px 3px white;
        cursor: pointer;
    }
    
`
function BarberMarker({barber, toggle}) {
  const [ popupOpen, togglePopup ] = useState(false);

  function toggle() {
    if(popupOpen) {
      togglePopup(false);
    } else {
      togglePopup(true);
    }
  }

  return (
    <>
      <Marker latitude={barber.geo.latitude} longitude={barber.geo.longitude} >
          <ScissorsImgWrapper onClick={toggle}>
            <img src={scissors} alt="" style={{width: '15px'}} />
          </ScissorsImgWrapper>
      </Marker>
      {popupOpen && <BarberPopup barber={barber} togglePopup={togglePopup}/>}
      
    </>
  );
}

export default BarberMarker;
