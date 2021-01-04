import React, { useEffect } from "react";
import MapScreen from '../screens/MapScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import NavBar from '../components/Navbar';
import HomeScreen from '../screens/HomeScreen'
import SignupScreen from '../screens/SignupScreen'
import LoginScreen from '../screens/LoginScreen'
import InboxScreen from '../screens/InboxScreen'
import Admin from '../components/admin/Admin'

import { useDispatch, useSelector } from 'react-redux'

import { getToken } from '../http/localStorage'
import { startGetMe } from '../redux/actions/user'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { FiUnlock } from "react-icons/fi";



export default function MainRouter() {
    const dispatch = useDispatch()
    // const store = useSelector( (store) => store )

    // useEffect(() => {
    //    console.log("store", store);
        
    //   }, [store])
 

    const PrivateRoute = ({component}) => {
        const user = useSelector( (store) => store.user )

        // check store for token
        // console.log("user", user);
        // console.log("user.isAuthenticated", user.isAuthenticated);
        if (user.isAuthenticated){
          return component
        }
       
        return <Redirect to="/" />
      }
      

    return (
        <>
        <Router>  
           <NavBar />
           <Switch>
                {/* Public routes */}
                <Route path="/" exact>
                    <HomeScreen />
                </Route>
                <Route path="/test" exact>
                    
                </Route>
                <Route path="/signup">
                    <SignupScreen />
                </Route>
                <Route path="/login">
                    <LoginScreen />
                </Route>
                {/* Private routes */}
                <Route path="/settings">
                    <PrivateRoute component={<SettingsScreen />} />
                </Route>
                <Route path="/profile">
                    <PrivateRoute component={<ProfileScreen />} />
                </Route>
                <Route path="/map">
                    <PrivateRoute component={<MapScreen />} />
                </Route>
                <Route path="/inbox">
                    <PrivateRoute component={<InboxScreen />} />
                </Route>
                <Route 
                    exact={true}
                    path="/barber/:id" 
                    component={ProfileScreen}
                />
                {/* ADMIN ROUTES */}
                <Route path="/admin" exact>
                    <Admin />
                </Route>
                <Route path="/admin-map" exact>
                    <Admin />
                </Route>
            </Switch>
        </Router>
        </>
    )
}