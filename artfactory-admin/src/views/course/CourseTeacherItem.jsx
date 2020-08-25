import React, { useState, useEffect } from 'react'
import { TableRow, TableCell } from '@material-ui/core'
import Switch from '@material-ui/core/Switch';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';

const CourseTeacherItem = ({courseId,teacher,number,defaultTeachers}) => {
    const [select,setSelect] = useState(false);

    useEffect(() => {
      defaultTeachers &&  defaultTeachers.forEach((dTeacher,index) => {
           
         
            if(dTeacher == teacher.id){
                console.log( index + " " + true + " " + dTeacher +" == " + teacher.id);
                setSelect(true);
                
            }
        })
    },[])
  

    const [addTeacherCourse,{loading}] = useMutation(ADD_TEACHER_COURSE,{
        update(_,result){

        },
        onError(err){
            console.log(err.graphQLErrors[0].message);

        },
        variables:{id:courseId,teacherID:teacher.id}
    })
    const changeSelectHandler =  e => {
        addTeacherCourse();
        setSelect(!select);
    }
    return (
        <TableRow>
            <TableCell>{number}</TableCell>
            <TableCell><img src={teacher.picture} alt="" style={{width:"100px",height:"100px",borderRadius:"50%",objectFit:"cover",objectPosition:"top"}}/></TableCell>
            <TableCell>{teacher.name}</TableCell>
            <TableCell>
            <Switch
                   checked={select}
                   onChange={changeSelectHandler} 
                color="primary"
                name="checkedB"
                inputProps={{ 'aria-label': 'primary checkbox' }}
      />
            </TableCell>
        </TableRow>
       
        )
}
const  ADD_TEACHER_COURSE = gql`
mutation  addTeacherCourse($id:ID!,$teacherID:ID!) {
  addTeacherCourse(id:$id,teacherID:$teacherID){
    id
    title
    teachers
  }
}


`;
export default CourseTeacherItem
