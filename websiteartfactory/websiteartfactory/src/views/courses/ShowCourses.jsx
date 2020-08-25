import React from 'react';
import {GET_ALL_STUDENT_COURSES} from '../../graphql';
import {useQuery} from '@apollo/react-hooks';
import { useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import ShowCourseItem from './ShowCourseItem';
import spinner from '../../assets/img/spinner.gif';
import { useEffect } from 'react';
const ShowCourses = () => {
    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const {loading,data} = useQuery(GET_ALL_STUDENT_COURSES,{
        variables:{studentID:user && user.id}
    });
    useEffect(() => {
        window.scrollTo(0,800);
    })
  
    if(loading){
        return(
           <div className="spinner-loading">
               <div className="text-center">
                   <img src={spinner} alt="" width="150"/>
               </div>
              
           </div>
           
        )
    }
    
        return (
            <div className="show-courses mt-5 pt-5">
                 <Table>
                     <TableHead>
                         <TableRow>
                             <TableCell>شماره</TableCell>
                             <TableCell>عکس دوره</TableCell>
                             <TableCell>نام دوره</TableCell>
                             <TableCell>شماره ارجاع</TableCell>
                             <TableCell>جزییات</TableCell>
    
                         </TableRow>
                     </TableHead>
                     <TableBody>
                     {data && data.getAllStudentCourses.length > 0 && data.getAllStudentCourses.map((course,index) => 
                    <ShowCourseItem key={course.id} course={course} number={++index} />
                    )}
                     </TableBody>
                 </Table>
               
            </div>
        )
    
   
    
}

export default ShowCourses
