import React ,{useReducer} from 'react';

import authReducer from './authReducer';
import AuthContext from './authContext';
import {LOGIN_USERADMIN,LOGOUT_USERADMIN} from '../types';
import jwtDecode from 'jwt-decode';

const AuthState = (props) =>{
    const initialState = {
        user:null
    }

    const [state,dispatch] = useReducer(authReducer,initialState);
    if(localStorage.getItem('art-studentpanel')){
       const decodeToken = jwtDecode(localStorage.getItem('art-studentpanel'));
       if(decodeToken.exp * 1000 < Date.now()){
        localStorage.removeItem('art-studentpanel');
       }
       else{
           initialState.user = decodeToken;
       }
    }

    const loginStudentContext = (userData) =>{
        console.log(userData);
        localStorage.setItem('art-studentpanel',userData.token);
        dispatch({
            type:LOGIN_USERADMIN,
            payload:userData,
        })
    }

    const logout = () => {
        localStorage.removeItem('art-studentpanel');
        dispatch({
            type:LOGOUT_USERADMIN
        })
    }


    return(<AuthContext.Provider value={{
        user:state.user,
        loginStudentContext,
        logout
    }}>
        {props.children}
    </AuthContext.Provider>)


}

export default AuthState;