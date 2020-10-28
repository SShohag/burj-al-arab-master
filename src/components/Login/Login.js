import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserLogInContext } from '../../App';
import { CodeSharp } from '@material-ui/icons';
import { useHistory, useLocation } from 'react-router-dom';





const Login = () => {
    
    const [loggedInUser, setLoggedInUser] = useContext(UserLogInContext);

    if ( firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);
    }
    
    const history = useHistory();
    const location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };
    
    const handleGoogleSignIn = ()=>{
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {

            const {displayName, email} = result.user;
            const signInUser = {name: displayName,  email}
            setLoggedInUser(signInUser);
            storeAuthToken();

          }).catch(function(error) {

            const errorMessage = error.message;
            console.log(errorMessage)

          });
    }

    const storeAuthToken = () => {
        firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
        .then(function(idToken) {
            sessionStorage.setItem('token', idToken);
            history.replace(from);
          }).catch(function(error) {
            // Handle error
          });
    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn} >Google sign In</button>
        </div>
    );
};

export default Login;