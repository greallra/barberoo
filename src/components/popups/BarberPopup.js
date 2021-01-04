import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { Popup } from 'react-map-gl';
import StarRating from '../StarRating';
import { ButtonGreen, ButtonWhite } from '../core/styled';
import { FiMenu } from 'react-icons/fi';

import { startConversation } from '../../redux/actions/chat'
import { useSelector, useDispatch } from 'react-redux'
import Masonry, {ResponsiveMasonry} from "react-responsive-masonry"

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Row = styled.div`
  display: flex;
  align-items: center;
 
`
const Row2 = styled.div`
  display: flex; 
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: grey;
`
const Img = styled.img`
  width: 50px;
  border-radius: 50%;
`

const Username = styled.h5`
  margin: 5px 0;
  font-weight: 400;
  font-size: var(--l);
`
const ShortDescription = styled.div`
  max-width: 200px;
  font-size: var(--n);
`
const AggregateRating = styled.div`
  padding: 0 6px;
  font-weight: 800;
`
const Reviews = styled.div`
  color: grey;
`
const Spacer = styled.div`
  padding: 5px 0;
`
const Line = styled.div`
  border-bottom: 1px solid #dadbdd;
  margin: 18px 0;
  width: 100%;
`
const PriceWrapper = styled.div`
 
`
const Price = styled.span`

 font-size: 28px;
`
const H3 = styled.div`
 text-align: center;
 padding: 8px;
 font-size: 15px;
 font-weight: 800;
`

function BaberPopup({barber, togglePopup}) {
  const history = useHistory();
  const user = useSelector(store => store.user) 
  const dispatch = useDispatch()

  function handle(e) {
    console.log(e.target);
    history.push(`/barber/${barber.uuid}`)
  }
  function handleSendMessage() {
    //open user chat
    //create conversation between baber and user (create conversation route - send barber id)
    dispatch(startConversation(user._id, barber._id))
    history.push(`/inbox`)
  }
  return (
 <Popup 
      latitude={barber.geo.latitude} 
      longitude={barber.geo.longitude} 
      closeButton={true} 
      closeOnClick={false} 
      onClose={()=> togglePopup(false)}
      className="barber-popup"
      anchor="bottom">

      <Column>
          <div><Img src={barber.avatar ? `${process.env.REACT_APP_API_URL}/users/${barber._id}/avatar` : `https://via.placeholder.com/50`}/></div>  
          <Username>{barber.username}</Username>  
          <ShortDescription>{barber.short_summary.substr(0, 53) + "\u2026"}</ShortDescription>
          <Spacer />
          <Row>
            <StarRating rating={barber.rating}/>
            <AggregateRating>{barber.rating ? barber.rating.aggregate_rating : 'No rating'}</AggregateRating>
            {/* <AggregateRating>{barber.rating.aggregate_rating}</AggregateRating> */}
            <Reviews>({barber.reviews.length} reviews)</Reviews>
          </Row>
          <Spacer />
          <Row>
            <ButtonGreen style={{marginRight: '10px'}} onClick={handleSendMessage}>Send Message</ButtonGreen>
            <ButtonWhite>Get a quote</ButtonWhite>
          </Row>
          <Line />
          <Row2>
            <FiMenu  onClick={handle}/>
            <Row><div style={{padding: '0 7px'}}>STARTING AT </div> <Price>€{barber.pricing.basic} </Price></Row>
          </Row2>
      </Column>
      <Column>
        <H3>Recent Work</H3>
        <Masonry columnsCount={3} gutter="10px">  
            {barber.work_photos.length > 0 && barber.work_photos.map( photo => <img 
            src={`${process.env.REACT_APP_API_URL}/users/${barber._id}/${photo._id}/work_photos`} 
            key={photo._id}
            style={{width: "100%", display: "block"}}
            />)}      
        </Masonry>
        <H3>Reviews</H3>
        
      </Column>
  </Popup>
  );

}

export default BaberPopup;
