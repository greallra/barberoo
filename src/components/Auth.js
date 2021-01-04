import React from 'react';
import useAsync from 'react-use/lib/useAsync';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../http/localStorage';
import { startGetMe } from '../redux/actions/user';

const Auth = ({children})=>{
    //will only run on refresh 
    const dispatch = useDispatch();
    const { loading } = useAsync(async () => {
    const token = await getToken();
        if (token){
        dispatch(startGetMe(token));
        }

    }, []);
    
   
    const user = useSelector( (store) => store.user )
    if (loading) {
        return null;
    }

    return children;
    }


export default Auth;


// import { loadToken } from './http';
// import { useDispatch } from 'react-redux';
// import { authenticateUser } from '../redux/reducers/user';

// export function TokenProvider({ children }) {
//   const dispatch = useDispatch();
//   const { loading } = useAsync(async () => {
//     const value = await loadToken();
//     if (value){
//       dispatch(authenticateUser(value));
//     }

//   }, []);

//   if (loading) {
//     return null;
//   }

//   return children;
// }
