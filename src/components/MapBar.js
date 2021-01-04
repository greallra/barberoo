import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    font-size: 10px;
    display: flex;
`
const Item = styled.div`
    min-width: 70px;
    padding: 15px;
    margin: 5px 10px;
    background: rgba(255,255,255,0.7);
    font-size: 15px;
    border-radius: .5rem;
    text-align: center;
`
const dublin = {
    lat: 53.3228,
    lng: -6.2233
}
export default function MapBar({setViewport}) {
    return (
        <Wrapper>
            <Item>My Location</Item>
            <Item onClick={() => setViewport({latitude: dublin.lat, longitude: dublin.lng,   width: "100vw",
    height: "100vh",
    zoom: 11 }) }>Barbers</Item>   
        </Wrapper>
    )
}
