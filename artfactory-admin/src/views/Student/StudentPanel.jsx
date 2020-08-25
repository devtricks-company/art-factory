import React, { useMemo } from 'react'
import { Select } from "antd";
import gql from 'graphql-tag';
import {GET_ALL_COURSES,GET_ALL_COURSE_DETAILS} from '../../graphql';
import { useQuery } from '@apollo/react-hooks';
import { useState } from 'react';
import { useEffect } from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import StudentInformation from './StudentInformation';
const { Option } = Select;
const StudentPanel = () => {
    const {loading:courseLoading,data:courseData} = useQuery(GET_ALL_COURSES);
  
    const [courseID,setCourseID] = useState("");
    const [DetailID,setDetailID] = useState("");
    const [Detail,setDetail] = useState(null);
    
    const {loading:detailLoading,data:detailData} = useQuery(GET_ALL_COURSE_DETAILS,{
        variables:{courseId:courseID}
    })
    const {loading:infoLoading,data:infoData} = useQuery(GET_ALL_REGISTER_STUDENT , {
        variables:{courseID,DetailID}
    })
    if(infoData){
        console.log('yesss')
        console.log(infoData.getAllRegisterStudent);
    }
    useMemo(() => {
        if(detailData){
            setDetail(detailData.getAllDetailsCourse); 
        }
        
    },[courseID,detailData,infoData]);
   

    
    const onchangeCourseHandler = value => {
        setCourseID(value);
    }

    const onChangeDetailHandler = value =>{
         setDetailID(value);   
    }

    return (
        <div class="student-panel">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-6"> <Select style={{ width: "100%", textAlign: "right" }} onChange={onchangeCourseHandler}>
                        {courseData && courseData.getAllCourses.map(course => 
                            <Option key={course.id} value={course.id}>{course.title}</Option> 
                            )}                 
                    </Select></div>
                    <div className="col-6"> <Select  style={{ width: "100%", textAlign: "right" }} onChange={onChangeDetailHandler}>
                       {Detail && Detail.map(det => 
                        <Option key={det.id} value={det.id}>{det.classcode}</Option>
                        )}
                    </Select></div>
                </div>
                <div className="row">
                    <div className="col-12 mt-5">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>شماره</TableCell>
                                    <TableCell>نام</TableCell>
                                    <TableCell>شماره موبایل</TableCell>
                                    <TableCell>نام دوره</TableCell>
                                    <TableCell>کد کلاس</TableCell>
                                    <TableCell> تاریخ</TableCell>
                                    <TableCell> قیمت پرداختی</TableCell>
                                    <TableCell>Insta ID</TableCell>


                                </TableRow>
                              
                            </TableHead>
                            <TableBody>
                                    {infoData && infoData.getAllRegisterStudent.length > 0 && infoData.getAllRegisterStudent.map((info,index) => 
                                        <StudentInformation key={info.id} info={info} number={++index} /> 
                                        )}
                                </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </div>
    )
}


const GET_ALL_REGISTER_STUDENT = gql`
query getAllRegisterStudent($courseID:ID!,$DetailID:ID!) {
  getAllRegisterStudent(courseID:$courseID,DetailID:$DetailID){
    createAt
    studentID
    courseID
    detailID
    courseTitle
    studentName
    studentMobile
    classcode,
    amount,
    instaID
  }
}




`;
export default StudentPanel
