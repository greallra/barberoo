import React from 'react';
import styled from 'styled-components';

export const StandardPageWrapper = styled.div`
    padding: 20px 50px;
    max-width: 900px;
    margin: auto;
    // display: flex;
    // justify-content: center;
`

export const ButtonWhite = styled.div`
    padding: 10px 16px;
    border-radius: .5rem;
    font-size: 14px;
    font-weight: 700;
    border: 1px solid var(--dark);
    background-color: var(--white);
    color: var(--dark);

    &:hover {
        cursor: pointer;
  
    }
`

export const ButtonGreen = styled.div`
    padding: 10px 16px;
    border-radius: .5rem;
    font-size: 14px;
    font-weight: 700;
    border: 1px solid var(--light-black);
    background-color: var(--secondary);
    color: var(--white);

    &:hover {
        cursor: pointer;
    }
`