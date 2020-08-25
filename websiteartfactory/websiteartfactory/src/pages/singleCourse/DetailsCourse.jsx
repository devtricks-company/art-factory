import React from 'react';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import { GET_ALL_ACTIVE_IN_HOME } from '../../graphql';
import DetailsCourseItem from './DetailsCourseItem';

const DetailsCourse = ({courseID}) => {

    const {loading,data} = useQuery(GET_ALL_DETAILS,{
        variables:{id:courseID && courseID}
    })

    
    return (
        <div className="details-course-item">
            {data && data.getAllActiveDetailsCourse.length > 0 && data.getAllActiveDetailsCourse.map(detail => 
                <DetailsCourseItem key={detail.id} detail={detail} />
                
                )}
        </div>
    )
}
const GET_ALL_DETAILS = gql`
query getAllActiveDetailsCourse($id:ID!) {
  getAllActiveDetailsCourse(courseID:$id){
    id
    classcode
     duration
    startDate
    days
    capacity
    price
    description
    active
    reserve
    register
    courseId
  }
}




`;

export default DetailsCourse
