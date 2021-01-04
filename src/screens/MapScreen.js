import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import data from '../data';
import ClipLoader from "react-spinners/ClipLoader";
import styled from 'styled-components';

import BarberMarker from '../components/markers/BarberMarker';
import UserMarker from '../components/markers/UserMarker';
import MapBar from '../components/MapBar';
import UserPopup from '../components/popups/UserPopup';

import { usePosition } from 'use-position';
import { useSelector, useDispatch } from 'react-redux';
import { getLocation } from '../http/geoLocation'
import { startGetBarbers } from '../redux/actions/barbers'

//docs
//https://visgl.github.io/react-map-gl/docs/api-reference/marker
//https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/#next-steps
//based on https://docs.mapbox.com/mapbox-gl-js/api/markers/#marker

const LoaderWrapper = styled.div`
    display: flex;
    width: 200px;
    justify-content: space-between;
    margin: 10px 10px 0 10px;
    align-items: center;
    padding: 10px 20px;
    border-radius: .5rem;
    background: var(--transparent-black);
    box-shadow: 3px 3px 3px grey;
    &:hover {
        background: red;
        cursor: pointer;
    }
    
`
const ClipText = styled.div`
    font-size: 10px;
`

function Map() {
  const barbers = useSelector((store)=> store.barbers)
  const dispatch = useDispatch()
  console.log("barbers", barbers);

  const [ viewport, setViewport ] = useState({
    latitude: 53.3498,
    longitude: -6.2603,
    width: "100vw",
    height: "100vh",
    zoom: 11
  });
  const [ user ] = useState(data.user)
  const {
    latitude,
    longitude,
    speed,
    timestamp,
    accuracy,
    error,
  } = usePosition();

  const [test, setTest] = useState(true);

     function toggle() {
            setTest((prevState)=>( { 
              popupOpen: !prevState.popupOpen 
            } 
          ))
    }
  useEffect(() => {
      if(latitude && longitude) {
          //return an object with the 
          setViewport((prevState) => ({
            ...prevState,
            zoom: 10,
            latitude,
            longitude
          }));
          
      }
   
     
  }, [latitude])

  useEffect(() => {
    dispatch(startGetBarbers())
  }, [])
  console.log("usePosition()", usePosition());
   console.log("barbers", barbers);
return(
    <ReactMapGl 
    {...viewport} 
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    //to move map reset viewport
    onViewportChange={viewport => {
      setViewport(viewport)
    }}
    //choose map here: https://studio.mapbox.com/
    mapStyle="mapbox://styles/greallra/ckh4yv72f0cc619p4btr5qlkf"
    >
      <MapBar setViewport={setViewport}/>
      {barbers.length > 0 && barbers.map((b, i)=>( 
        <BarberMarker 
          key={i} 
          barber={b} 
        />  
      ))}
      
      {!latitude && !longitude && <LoaderWrapper>
        <ClipText>Getting your Location</ClipText>
        <ClipLoader
        //   css={override}
          size={20}
          color={"#123abc"}
          loading={true}
        />
      </LoaderWrapper>}

      {latitude && <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton={true}
          closeOnClick={true}
          // onClose={() => setTest(false)}
          anchor="top" >
          <div>You are here</div>
        </Popup>}
    

      
    </ReactMapGl>

   
)
  
}

export default Map;