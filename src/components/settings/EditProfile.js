import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components';

import { makeStyles } from '@material-ui/core/styles';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { deleteAvatar, uploadAvatar } from '../../redux/actions/user'
import { useDispatch } from 'react-redux'
import axios from '../../axios'


import { ToastContainer, toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }));
  

const Wrapper = styled.div`
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    
`
const Row = styled.div`
  display: flex;
//   border-radius: 50%;
  min-height: 60px;
  align-items: center;
`
const Left = styled.div`
  font-weight: 900;
  text-align: end;
  width: 100px;

`
const Item = styled.div`
    width: 140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const Input = styled.input`
    width: 140px;
    border-radius: .5rem;
    border: 1px solid var(--lightgrey);
    outline: none;
    padding: 10px;
    box-sizing: border-box;
`
const Gutter = styled.div`
  width: 50px;
`

const Img = styled.img`
  width: 50px;
  border-radius: 50%;
`
const InputEdit = styled.div`
  
`
const FileInput = styled.input`
    position:absolute; 
    top:-500px;
`


export default function EditProfile({user}) {
    const classes = useStyles()
    const dispatch = useDispatch()
    const input = useRef()
    const form = useRef()
    const [file, setFile] = useState(null)
  

    function handleDeleteAvatar(){
       dispatch(deleteAvatar())
       notify("Deleting Avatar")
    }
    function handleEditAvatar(){
        input.current.click()
    }
    const notify = (message) => toast.info(message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    function handleSubmit(e) {
        //e.preventDefault()
       

        //dispatch(uploadAvatar())
    }

    async function upload(){
        // console.log(input.current.files);
        // dispatch(uploadAvatar(file))
        //'Content-Type': 'application/x-www-form-urlencoded'
        try {
            // var bodyFormData = new FormData();
            // // bodyFormData.append('userName', 'Fred');
            // bodyFormData.append('file', file);
            // //formData.append('file', fileToUpload, fileToUpload.name);

            // const res = await axios({
            //     method: 'post',
            //     url: '/users/me/avatars',
            //     data: bodyFormData,
            //     headers: {
            //         'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU3MzVhNjg1YWIwNzIzYmQ4MjRiMWYiLCJpYXQiOjE2MDk2NzMwNzV9.ZB1AxTRhMmw3WVgya-WQbiklJbi_3UAuMIcyBllCVw4',
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     },
            //     })
            //     .then(function (response) {
            //         //handle success
            //         console.log(response);
            //     })
            //     .catch(function (response) {
            //         //handle error
            //         console.log(response);
            //     });
            //     console.log(res);

                // let data = new FormData();
                // data.append('file', file, 'avatar');

              
                // axios.post('/users/me/avatars', data, {
                // headers: {
                //     'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmU3MzVhNjg1YWIwNzIzYmQ4MjRiMWYiLCJpYXQiOjE2MDk2NzMwNzV9.ZB1AxTRhMmw3WVgya-WQbiklJbi_3UAuMIcyBllCVw4',
                //     'accept': 'application/json',
                //     'Accept-Language': 'en-US,en;q=0.8',
                //     'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
                // }
                // })
                // .then((response) => {
                //     //handle success
                //     console.log(response);
                // }).catch((error) => {
                //     //handle error
                //     console.log(error);
                // });
             
            
        } catch (error) {
            console.log(error);
        }
        
    }
    function selectFile(){
        if(input.current.files.length > 0) {
            setFile(input.current.files[0])
        } else { 
            setFile(null)
        }
    }

    useEffect(() => {
        console.log(input.current.files);
        console.log(document.getElementById('fileInput').files);
        
    }, [input])

    return (
        <Wrapper>
            <Row>
                <Left>Username</Left>
                <Gutter />
                <Item>{user.username}</Item>
            </Row>
            <Row>
                <Left>Avatar</Left>
                <Gutter />
                <Item>
                    <Img src={user.avatar ? `${process.env.REACT_APP_API_URL}/users/${user._id}/avatar` : `https://via.placeholder.com/50`}/>
                    <IconButton>
                        {!file && <EditIcon onClick={handleEditAvatar} /> }
                        {file && <CheckCircleIcon style={{color: 'var(--success-green)'}} onClick={upload} /> }
                        <form onSubmit={handleSubmit} ref={form}>
                            <FileInput type="file"  name="avatar" ref={input} id="fileInput" onChange={selectFile} />
                        </form>
                    </IconButton>
                    <IconButton><HighlightOffIcon onClick={handleDeleteAvatar}/></IconButton>
                </Item>
            </Row>
            <Row>
                <Left>First Name</Left>
                <Gutter />
                <Input value={user.first_name}/>
            </Row>
            <Row>
                <Left>Last Name</Left>
                <Gutter />
                <Input value={user.last_name}/>
            </Row>
            <Row>
                <Left>Email</Left>
                <Gutter />
                <Input value={user.email}/>
            </Row>
            <Row>
                <Left>Age</Left>
                <Gutter />
                <Input value={user.age}/>
            </Row>
            <ToastContainer 
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
                    {/* 
                    <List component="nav" className={classes.root} aria-label="mailbox folders">
                        <ListItem button>
                            <ListItemText primary={user.first_name} />
                        </ListItem>
                        <Divider />
                        <ListItem button divider>
                            <ListItemText primary={user.last_name} />
                        </ListItem>
                        <ListItem button>
                            <ListItemText primary={user.age} />
                        </ListItem>
                        <Divider light />
                        <ListItem button>
                            <ListItemText primary={user.email} />
                        </ListItem>
                    </List>     */}
        </Wrapper>
    )
}
