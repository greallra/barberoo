import React from 'react'
import styled from 'styled-components';

const Wrapper = styled.div`
    // height: 90px;
    // background: red;
    // display: flex;
    // align-items: center;
`
const SectionOne = styled.div`
   
`
const HowItWorks = styled.div`
    // height: 90px;
     background: lightred;
    // display: flex;
    // align-items: center;
`
export default function HomeScreen() {
    return (
        <Wrapper>
            <SectionOne>
                <h1>Baberoo is an easy away to aquire a baber</h1>
                <h2>Some of the best freelance barbers in your area and ready to give you a good deal</h2>
            </SectionOne>
            <HowItWorks>
                <h1><span>Pick a baber</span>Confirm<span></span><span>Enjoy</span></h1>
                <p>Baberoo could have some of the best talent and prices in tour area</p>
                <p>some images</p>
            </HowItWorks>
            
        </Wrapper>
    )
}
