import axios from '../../axios'
import { setToken, getToken } from '../../http/localStorage'

export const setSignupStatus = (data) => ({
  type: 'SET_SIGNUP_STATUS',
  payload: data
})

export const signup = (data)=> { 
  return async (dispatch, getState) => {
    dispatch(setSignupStatus('loading'))
    try {
      const config = {
        method: 'post',
        url: '/users',
        // headers: {
        //   'Authorization': `Bearer ${getToken()}` 
        // },
        data
      };
      const res = await axios(config)
      console.log(res);
      //set user in store and set token
      setToken(res.data.token)
      dispatch(setSignupStatus('successfull'))
      dispatch(setUser(res.data.user));
    } catch (e) {
      console.log(e);
    }
  }
}

export const setUser = (data, token)=> {
  return {
    type: 'SET_USER',
    payload: data,
    token
  }
}
 

export const setLoginError = (data = '')=> ({
    type: 'SET_LOGIN_ERROR',
    payload: data.error
})

export const startLogin = (email, password) => {
    return async (dispatch, getState)=>{
      //reset error by passing nothing
      dispatch(setLoginError())
      try {
        //get user and conversations
        let res = await axios.post('/users/login', { email, password })
        //set user in store
        if(res.status == 200) {
            setToken(res.data.token)
        }
       
        dispatch(setUser(res.data.user));
        // dispatch(setConversations(res.data.conversations));
    
      } catch (error) {
        //server error
        if(error.response) dispatch(setLoginError(error.response.data))
        //netork error
          console.log(error);
      }
    }
  }

export const startGetMe = (token) => {
  return async (dispatch, getState)=>{
    try {
      let res = await axios.get('/users/me', {
        headers: {
          'Authorization': `Bearer ${token}` 
        }})
      if(res.status === 200) {
         dispatch(setUser(res.data, token));
      }
    } catch (error) {
      console.log(error);
    }
  }
}

export const deleteAvatar = () => {
  return async (dispatch, getState) => {
    try {
      // delete avatar and get back updated user
      const res = await axios.delete('/users/me/avatars',  {
        headers: {
          'Authorization': `Bearer ${getToken()}` 
        }
      })
      dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}
export const uploadAvatar = (files) => {
  return async (dispatch, getState) => {
    try {
      // delete avatar and get back updated user
      const res = await axios.post('/users/me/avatars', {
        avatar: files
      },  {
        headers: {
          'Authorization': `Bearer ${getToken()}` 
        }
      })
      console.log(res);
      //dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}
export const deleteWorkPhoto = (photo_id) => {
  return async (dispatch, getState) => {
    try {
      // delete avatar and get back updated user
      const res = await axios.delete(`/users/me/work_photos/${photo_id}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}` 
        }
      })
      dispatch(setUser(res.data));
    } catch (error) {
      console.log(error);
    }
  }
}

//signup response
let x = {
  "user": {
      "age": 21,
      "work_photos": [],
      "reviews": [],
      "_id": "5fef04bea85c80e57e9b0eea",
      "username": "test",
      "first_name": "Ryan",
      "last_name": "Gill",
      "user_type": "BARBER",
      "email": "test@gmail.com",
      "short_summary": "hey, I am a great ould barber with great styles",
      "pricing": {
          "basic": 22.5
      },
      "geo": {
          "name": "dublin",
          "latitude": 53.3228,
          "longitude": -6.2233
      },
      "rating": {
          "aggregate_rating": "4.4"
      },
      "createdAt": "2021-01-01T11:17:18.503Z",
      "updatedAt": "2021-01-01T11:17:18.582Z",
      "__v": 1
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmVmMDRiZWE4NWM4MGU1N2U5YjBlZWEiLCJpYXQiOjE2MDk0OTk4Mzh9.IdpyvMF_VWRusH--TlFEapCFerK-VXfubJMxIBEHLTs"
}

//read profile repsonse

let y = {
  "pricing": {
      "basic": 22.5
  },
  "geo": {
      "name": "dublin",
      "latitude": 53.3228,
      "longitude": -6.2233
  },
  "rating": {
      "aggregate_rating": "4.4"
  },
  "age": 21,
  "work_photos": [],
  "reviews": [],
  "_id": "5fef04bea85c80e57e9b0eea",
  "username": "test",
  "first_name": "Ryan",
  "last_name": "Gill",
  "user_type": "BARBER",
  "email": "test@gmail.com",
  "short_summary": "hey, I am a great ould barber with great styles",
  "createdAt": "2021-01-01T11:17:18.503Z",
  "updatedAt": "2021-01-01T11:17:18.582Z",
  "__v": 1
}

//login repsonse
 let z = {
  "user": {
      "pricing": {
          "basic": 22.5
      },
      "geo": {
          "name": "dublin",
          "latitude": 53.3228,
          "longitude": -6.2233
      },
      "rating": {
          "aggregate_rating": "4.4"
      },
      "age": 21,
      "work_photos": [],
      "reviews": [],
      "_id": "5fef04bea85c80e57e9b0eea",
      "username": "test",
      "first_name": "Ryan",
      "last_name": "Gill",
      "user_type": "BARBER",
      "email": "test@gmail.com",
      "short_summary": "hey, I am a great ould barber with great styles",
      "createdAt": "2021-01-01T11:17:18.503Z",
      "updatedAt": "2021-01-01T11:22:00.374Z",
      "__v": 3
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmVmMDRiZWE4NWM4MGU1N2U5YjBlZWEiLCJpYXQiOjE2MDk1MDAxMjB9.lT8sOdM09XQpcXfl3ffwcftudl89Yz0wt2Sbjwp9eXU"
}