import React from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
const CourseTeacherItem = ({teacherID}) => {
    console.log(teacherID);
    const {loading,data} = useQuery(GET_A_TEACHER,{
        variables:{id:teacherID && teacherID}
    });
    console.log(data && data.getATeacher);
    return (
        <div className="course-teacher-item">
            <div className="row">
                <div className="col-3">
                    <img src={data && data.getATeacher.picture} alt="" className="teacher-image"/>
                    <h6 className="teacher-name mt-4">{data && data.getATeacher.name}</h6>
                </div>
                <div className="col-9">
                    <p className="teacher-resume" dangerouslySetInnerHTML={{__html:data && data.getATeacher.resume}}></p>
                </div>
            </div>
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

export default CourseTeacherItem
