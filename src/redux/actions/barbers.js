import axios from '../../axios'
import { getToken } from '../../http/localStorage'

export const setBarbers = (data) => ({
    type: 'SET_BARBERS',
    data
})

export const startGetBarbers = () => {
    const token = getToken()
    return async (dispatch, getState)=>{
      try {
        let res = await axios.get('/users/barbers', {
          headers: {
            'Authorization': `Bearer ${token}` 
          }})
        if(res.status === 200) {
            dispatch(setBarbers(res.data));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
