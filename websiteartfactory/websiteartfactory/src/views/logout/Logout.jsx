import React from 'react'
import { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import { useEffect } from 'react';

const Logout = () => {
    const authContext = useContext(AuthContext);
    const {logout} = authContext;

    useEffect(() => {
        logout();
    },[])
    return (
        <div>
            
        </div>
    )
}

export default Logout
