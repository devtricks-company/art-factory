import React, { useState, useMemo } from 'react'
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Table, TableBody, TableRow, TableCell, TableHead } from '@material-ui/core';
import TeacherCourseItem from './TeacherCourseItem';
import Gallery from 'react-photo-gallery';
import { GET_ALL_COURSE_GALLERY } from '../../graphql';
import { digitsArToFa, digitsArToEn, digitsEnToFa, digitsFaToEn, addCommas } from "persian-tools2"
import { useEffect } from 'react';

const CourseDetailsPage = (props) => {
    const { loading, data } = useQuery(GET_ALL_ACTIVE_GROUP);
    const { loading: couseDetailsLoading, data: dataCourse } = useQuery(GET_A_COURSE, {
        variables: { id: props.match.params.id }
    })

    useEffect(() => {
        window.scrollTo(0,0);
    },[])
    const { loading: loadingGallery, data: DataGallery } = useQuery(GET_ALL_COURSE_GALLERY, {
        variables: { courseID: props.match.params.id }
    });
    const [photos, setPhotos] = useState(null);

    useMemo(() => {
        if (DataGallery && DataGallery.getAllGalleryCourse.length > 0) {
            console.log(DataGallery.getAllGalleryCourse)
            setPhotos(DataGallery.getAllGalleryCourse);
        }
    }, [DataGallery]);


    const { loading: detailsActiveLoading, data: dataDetails } = useQuery(GET_ALL_DETAILS, {

        variables: { id: props.match.params.id }
    })



    return (
        <div className="new-course-details-page pt-5">
            <div className="container-fluid mt-5 pt-5">
                <div className="row">
                    <div className="col-12 col-lg-10 course-content">
                        <div className="row">
                            <div className="col-12 col-lg-9">
                                <img src={dataCourse && dataCourse.getACourse.videoPoster} alt="" />
                                <h1>{dataCourse && dataCourse.getACourse.title}</h1>
                                <p dangerouslySetInnerHTML={{ __html: dataCourse && dataCourse.getACourse.description }}></p>
                            </div>
                            <div className="col-12 col-lg-3 aside ">
                                <p><span>قیمت</span> : {dataDetails && digitsEnToFa(addCommas(dataDetails.getAllActiveDetailsCourse[0].price)) } تومان</p>
                                <p> {dataDetails && digitsEnToFa(dataDetails.getAllActiveDetailsCourse[0].duration)}</p>
                                <p>   {dataDetails && digitsEnToFa(dataDetails.getAllActiveDetailsCourse[0].startDate)}</p>

                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-2 text-right group-col">
                        <p> گروه های آموزشی</p>

                        {data && data.getAllActiveGroup.length > 0 && data.getAllActiveGroup.map(group =>
                            <p><a href={`/#/allcourse?category=${group.id}`}>{group.name}</a></p>

                        )}
                    </div>
                </div>

                <div className="teacher-container">
                    {dataDetails && dataDetails.getAllActiveDetailsCourse.length > 0 && dataDetails.getAllActiveDetailsCourse.map(detail =>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>مدرس</TableCell>
                                    <TableCell>تاریخ و زمان</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TeacherCourseItem key={detail.id} teachers={dataCourse && dataCourse.getACourse.teachers} details={detail} />
                            </TableBody>
                        </Table>

                    )}

                </div>
               
                {photos ?

                    <section id="course-gallery" >
                        <h5 >گالری دوره</h5>
                        <div>
                            <Gallery photos={photos} />
                        </div>

                    </section>

                    : null}

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

const GET_ALL_ACTIVE_GROUP = gql`
query{
  getAllActiveGroup{
    id
    name
    active
  }
   
}
`;


const GET_ALL_ACTIVE_COURSE = gql`
query  getAllActiveCourseByGroup($groupID:ID!) {
  getAllActiveCourseByGroup(groupID:$groupID){
    id
    title
    picture
    group

  }

}

`;

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

export default CourseDetailsPage
