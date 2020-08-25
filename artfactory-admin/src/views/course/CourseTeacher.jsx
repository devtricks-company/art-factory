import React from 'react'
import { Table, TableHead, TableRow,TableCell, TableBody } from '@material-ui/core'
import {GET_ALL_ACTIVE_TEACHER} from '../../graphql';
import { useQuery } from '@apollo/react-hooks';
import CourseTeacherItem from './CourseTeacherItem';
const CourseTeacher = ({courseId,teachers}) => {
    const {loading,data} = useQuery(GET_ALL_ACTIVE_TEACHER);

    return (
        <div>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>شماره</TableCell>
                        <TableCell>عکس</TableCell>
                        <TableCell>نام</TableCell>
                        <TableCell>انتخاب</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.getAllActiveTeachers.length > 0 && data.getAllActiveTeachers.map((teacher,index) => 
                        <CourseTeacherItem key={teacher.id} defaultTeachers={teachers} teacher={teacher} number={++index}  courseId={courseId && courseId } />
                        )}
                </TableBody>
            </Table>
        </div>
    )
}

export default CourseTeacher
