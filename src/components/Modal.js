import React from 'react'
import Modal from 'react-modal';
import styled from 'styled-components'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'

const Wrapper = styled.div`
    background: 'red'
`
const H1 = styled.div`
    color: var(--success-green);
    font-size: 16px;
    font-weight: 900;
    padding: 20px;
`

const customStyles = {
    content : {
      backgroundColor: 'white',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        zIndex: 1
      },
  };
export default function ModalComponent({isOpen, setIsOpen}) {
    const history = useHistory();
    return (
        <Wrapper>
            <Modal
          isOpen={isOpen}
        //   onAfterOpen={afterOpenModal}
        //   onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
            <H1>You have succcessfull signed up!</H1>
            <Button variant="contained" color="primary" style={{margin: 'auto', display: 'block'}} onClick={ () => history.push('/profile')}>Start using Barberoo</Button>


        </Modal>
        
            
        </Wrapper>
    )
}
