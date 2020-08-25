import React from 'react'

import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {GET_ALL_COURSES} from '../../graphql';
import {useQuery} from '@apollo/react-hooks';
import CourseItem from './CourseItem';
import {withRouter} from 'react-router-dom'





const Course = (props) => {
   
  const {loading,data} = useQuery(GET_ALL_COURSES);




    return (
       <div className="course">
         <div className="course__wrapper">
            <div className="row mt-5">
              <div className="col-6 course__wrapper_header_title">
                <h6>مدیریت دوره ها</h6>
                <p>در این قسمت شما می توانید دوره ها را مدیریت کنید</p>
              </div>
              <div className="col-6 text-left">
                <button className="btn btn-success px-5 py-2" style={{borderRadius:"50px"}} onClick={() => props.history.push('/admin/addcourse')}>اضافه کردن دوره جدید</button>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-12">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>شماره</TableCell>
                      <TableCell>عکس</TableCell>
                      <TableCell>عنوان</TableCell>
                      <TableCell>فعال</TableCell>
                      <TableCell>عملیات</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      {data && data.getAllCourses.length > 0 && data.getAllCourses.map((course,index) => 
                          <CourseItem key={course.id} course={course} number={++index} {...props}/>
                        )}
                  </TableBody>
                </Table>
              </div>
            </div>
         </div>
       </div>
    )
}

export default withRouter(Course)
