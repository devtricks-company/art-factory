import React from 'react'
import { TableRow, TableCell, IconButton } from '@material-ui/core'
import {MdEdit} from 'react-icons/md';

const CourseItem = ({history,course,number}) => {
    return (
        <TableRow>
            <TableCell>{number}</TableCell>
            <TableCell> <img src={course.picture} style={{width:"100px",height:"100px",borderRadius:"50%",objectPosition:"top",objectFit:"cover"}} alt=""/> </TableCell>
            <TableCell>{course.title}</TableCell>
            <TableCell></TableCell>
            <TableCell>
                <IconButton onClick={() => history.push(`/admin/addcourse/${course.id}`)}>
                    <MdEdit />
                </IconButton>
            </TableCell>
        </TableRow>
    )
}

export default CourseItem
