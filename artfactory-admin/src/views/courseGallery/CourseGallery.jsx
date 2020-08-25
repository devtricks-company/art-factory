import React from 'react'
import { Paper, Table, TableRow, TableHead, TableCell, TableBody } from '@material-ui/core'
import { Select } from 'antd';
import { GET_ALL_COURSES } from '../../graphql';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useState } from 'react';
import PicturesWall from '../../components/picuter/PicturesWall';
import gql from 'graphql-tag';
import AlertMessage from "../../components/alertmessage/AlertMessage";
import { GET_ALL_COURSES_GALLERY } from '../../graphql';

const CourseGallery = () => {
    const { Option } = Select;
    const [AlertState, setAlertState] = useState({
        open: false,
        message: '',
        color: ''
    })
    const [courseGallery, setCourseGallery] = useState({
        src: '',
        width: '',
        height: '',
        courseID: ''
    })
    const { loading, data } = useQuery(GET_ALL_COURSES);
    const { loading: gallleryCourseLoading, data: galleryCourseData } = useQuery(GET_ALL_COURSES_GALLERY, {
        variables: { courseID: courseGallery.courseID }
    })
    if (galleryCourseData) {
        console.log(galleryCourseData.getAllGalleryCourse)
    }

    const changeClickHandler = value => {
        setCourseGallery({ ...courseGallery, courseID: value });
    }

    const setURL = url => {
        setCourseGallery({ ...courseGallery, src: url });
    }

    const changeValueHandler = e => {
        setCourseGallery({ ...courseGallery, [e.target.name]: e.target.value });
    }

    const [addCourseGallery, { loading: addPicLoading }] = useMutation(ADD_COURSE_GALLERY, {
        update(_, result) {
            console.log(result);
        },
        onError(err) {
            setAlertState({ open: true, message: err.graphQLErrors[0].message, color: 'red' });
            setTimeout(() => {
                setAlertState({ open: false, message: err.graphQLErrors[0].message, color: 'red' });
            }, 3000);
        },
        variables: courseGallery
    })

    const clickHandlerSave = () => {
        addCourseGallery();
        setAlertState({ open: true, message: "عملیات با موفقیت انجام شد", color: 'green' });
        setTimeout(() => {
            setAlertState({ open: false, message: "عملیات با موفقیت انجام شد", color: 'green' });
        }, 3000);
    }
    return (
        <div className="course-gallery">
            <div className="container">
                <Paper elevation={3} style={{ padding: "50px", marginTop: "4rem", textAlign: "right" }}>
                    <label htmlFor="">دوره را انتخاب کنید</label>
                    <Select size='large' defaultValue="دوره خود را انتخاب کنید" onChange={changeClickHandler} style={{ width: "100%" }}>
                        {data && data.getAllCourses.length > 0 && data.getAllCourses.map(course =>
                            <Option value={course.id}>{course.title}</Option>

                        )}

                    </Select>
                    <div className="dimension-wrapper">
                        <div className="width-wrapper">
                            <input type="number" id="width" name="width" placeholder="مقیاس عرض را وارد کنید" className="form-control"
                                value={courseGallery.width}
                                onChange={changeValueHandler}
                            />
                        </div>
                        <div className="height-wrapper">
                            <input type="number" id="height" name="height" placeholder="مقیاس ارتفاع را وارد کنید" className="form-control"
                                value={courseGallery.height}
                                onChange={changeValueHandler}

                            />
                        </div>
                    </div>
                    <div>
                        <PicturesWall setURL={setURL} />
                    </div>
                    <div>
                        <button className="btn btn-success" onClick={clickHandlerSave} >ثبت عکس</button>
                    </div>
                </Paper>

                <Paper elevation={3} style={{ padding: "50px", marginTop: "2rem" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    شماره
                                    </TableCell>
                                <TableCell>
                                    عکس
                                    </TableCell>
                                <TableCell>
                                    عملیات
                                    </TableCell>

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {galleryCourseData && galleryCourseData.getAllGalleryCourse.length > 0 && galleryCourseData.getAllGalleryCourse.map((gallery, index) =>
                                <TableRow>
                                    <TableCell>{++index}</TableCell>
                                    <TableCell>
                                        <img className="course-image-gallery" src={gallery.src} alt="" />
                                    </TableCell>

                                </TableRow>

                            )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
            {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
        </div>
    )
}

const ADD_COURSE_GALLERY = gql`

mutation addCourseGallery($src:String!,$width:String,$height:String,$courseID:ID!) {
  addCourseGallery(src:$src,width:$width,height:$height,courseID:$courseID){
    id
    src
    width
    height
    courseID
  }
}
`;

export default CourseGallery
