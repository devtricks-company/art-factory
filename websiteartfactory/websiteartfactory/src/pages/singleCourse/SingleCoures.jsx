import React,{useState , useMemo} from 'react'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_ACTIVE_IN_HOME } from '../../graphql';
import DetailsCourse from './DetailsCourse';
import ReactPlayer from 'react-player'
import CourseTeacherItem from './CourseTeacherItem';
import { useEffect } from 'react';

const SingleCoures = (props) => {

    const {loading,data} = useQuery(GET_A_COURSE,{
        variables:{id:props.match.params.id}
    })

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);
    
    

    return (
        <div  className="single-course">
            <div className="row w-100 mt-5 mx-0">
                <div className="col-9 m-0 p-0">
                    <section id="single-course" className="header-single-course" style={{background:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)), url('${data && data.getACourse.picture}')`}} >
                           <div className="course-header-container container">
                           <h2 className="title-course" >{data && data.getACourse.title}</h2>
                            <p className="short-course">{data && data.getACourse.shortDescription}</p>
                           </div>
                    </section>
                    <section className="course-body">
                        <div className="row">
                            <div className="col-12 c-description">
                                <div className="container p-5">
                                    <h6 className="course-body-description">توضیحات</h6>
                                    <p className="course-description" dangerouslySetInnerHTML={{__html:data && data.getACourse.description}}></p>
                                </div>
                            </div>
                            <div className="col-12 text-center py-5">
                                {data && data.getACourse.teachers.length > 0 && data.getACourse.teachers.map(teacherID => 
                                    
                                    <CourseTeacherItem key={teacherID} teacherID={teacherID}  />
                                    ) } 
                            </div>
                            <div className="col-12 text-center py-5 video-course">
                                  <ReactPlayer style={{margin:"0 auto"}} url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
                            </div>
                         
                        </div>
                    </section>
                </div>
                <div className="col-3 class-course m-0 p-0">
                       <DetailsCourse courseID={data && data.getACourse.id} /> 
                </div>
            </div>
        </div>
    )
}

const GET_A_COURSE = gql`
query getACourse($id:ID!) {
getACourse(id:$id){
  id
  title
  shortDescription
  description
  details
  teachers
  group
  picture
  video
  videoPoster
  showHome
  active
  typeOfCourse
  createAt
}
}




`;


export default SingleCoures
