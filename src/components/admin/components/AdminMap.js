import React, { useState, useEffect } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import ClipLoader from "react-spinners/ClipLoader";
import styled from 'styled-components';

import BarberMarker from '../../markers/BarberMarker';
// import UserMarker from '../components/markers/UserMarker';

import UserPopup from '../../popups/UserPopup';

 import { usePosition } from 'use-position';
import axios from '../../../axios'
// import { getLocation } from '../http/geoLocation'
// import { startGetBarbers } from '../redux/actions/barbers'

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

export default function AdminMap() {
 // const barbers = useSelector((store)=> store.barbers)
 // const dispatch = useDispatch()
 const [users, setUsers] = useState([])
 

  const [ viewport, setViewport ] = useState({
    latitude: 53.3498,
    longitude: -6.2603,
    width: "100vw",
    height: "100vh",
    zoom: 11
  });
  
  const {
    latitude,
    longitude,
    speed,
    timestamp,
    accuracy,
    error,
  } = usePosition();

  useEffect(() => {
      if(latitude && longitude) {
          //return an object with the 
          setViewport((prevState) => ({
            ...prevState,
            zoom: 12,
            latitude,
            longitude
          }));
          
      }
  }, [latitude])

  useEffect(() => {
      async function getAllUsers() {
        
        try {
            const res = await axios.get('/admin/users/all')
            console.log(res.data);
            setUsers(res.data)
        } catch (e) {
            console.log(e);
        }
      }
      getAllUsers()
  }, [])



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
      {users.length > 0 && users.map((b, i)=>( 
        <BarberMarker 
          key={i} 
          barber={b} 
        />  
      ))}

      {/* {latitude && longitude && <><UserMarker latitude={latitude} longitude={longitude} /><UserPopup latitude={latitude} longitude={longitude}/> </>} */}
     
      {!latitude && !longitude && <LoaderWrapper>
        <ClipText>Getting your Location</ClipText>
        <ClipLoader
        //   css={override}
          size={20}
          color={"#123abc"}
          loading={true}
        />
      </LoaderWrapper>}

      {latitude && longitude && <Popup
          latitude={53.3498}
          longitude={-6.2303}
          closeButton={true}
          closeOnClick={true}
        //   onClose={() => setTest(false)}
          anchor="top" >
          <div>You are here</div>
        </Popup>} 
    

      {/* {latitude &&  <Marker latitude={latitude} longitude={longitude}><button>hey</button></Marker>} */}
      
    </ReactMapGl>

   
)
  
}

