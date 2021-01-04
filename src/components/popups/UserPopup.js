import React, { useState } from 'react';
import styled from 'styled-components';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';

const Nav = styled.div`
    height: 90px;
    background: red;
    display: flex;
    align-items: center;
`

function UserPopup({latitude, longitude}) {

  return (
    <Popup latitude={latitude} longitude={longitude}>
      <div>You are here</div>
    </Popup>
  );
}

export default UserPopup;
