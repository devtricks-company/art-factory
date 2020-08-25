import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import PrefactorItem from './PrefactorItem';
import {GET_ALL_PREFACTOR_STUDENT} from '../../graphql';
import spinner from '../../assets/img/spinner.gif';
import { useEffect } from 'react';

const Prefactor = () => {

    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const {loading,data} = useQuery(GET_ALL_PREFACTOR_STUDENT,{
        variables:{studentID: user && user.id}
    })
    useEffect(() => {
        window.scrollTo(0,800)
    },[]);
    if(loading){
        return(
            <div className="spinner-loading">
                <div>
                    <img src={spinner} alt=""/>
                </div>
            </div>
        )
    }
    return (
        <div className="prefactor">
            <div className="row w-100 text-center p-4">
                  {data && data.getAllPreFactoryByStudentID.length > 0 && data.getAllPreFactoryByStudentID.map(prefactor => 
                    <PrefactorItem key={prefactor.id} prefactor={prefactor} />
                    
                    )}          
            </div>
        </div>
    )
}

export default Prefactor
