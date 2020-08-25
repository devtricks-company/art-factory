import React from 'react'
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';

const TeachersDetails = ({teacherID}) => {
    const {loading,data} = useQuery(GET_A_TEACHER,{
        variables:{id:teacherID && teacherID}
    })
    return (
        <div className="teacher-details">
            <img src={data && data.getATeacher.picture} alt=""/>
            <p><a href={`/#/teacher/${teacherID}`}>{data && data.getATeacher.name}</a></p>
        </div>
    )
}

const GET_A_TEACHER = gql`

query getATeacher($id:ID!) {
  getATeacher(id:$id){
    id
    name
    resume
    picture
    
  }
}

`;

export default TeachersDetails
