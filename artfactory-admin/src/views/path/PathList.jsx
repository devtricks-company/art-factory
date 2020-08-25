import React from 'react'
import {GET_ALL_PATH} from '../../graphql';
import {useQuery} from '@apollo/react-hooks';
import PathItem from './PathItem';

const PathList = () => {

        const {loading,data} = useQuery(GET_ALL_PATH);


    return (
        <div className="row w-100 path-list">

            {data && data.getAllPath.length > 0 && data.getAllPath.map(path => 
                <PathItem key={path.id} path={path} />
                
                )}    
        </div>
    )
}

export default PathList
