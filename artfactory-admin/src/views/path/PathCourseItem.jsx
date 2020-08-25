import React from 'react'
import { Table, TableCell,TableHead, TableRow, Switch,IconButton } from '@material-ui/core'
import { MdEdit } from 'react-icons/md'

export const PathCourseItem = ({path,number}) => {
    return (
     
                <TableRow>
                    <TableCell>{number}</TableCell>
                    <TableCell>{path.numberStep}</TableCell>
                    <TableCell>{path.course.title}</TableCell>
                    <TableCell><Switch color="primary" /></TableCell>
                    <TableCell>
                        <IconButton>
                            <MdEdit />
                        </IconButton>
                    </TableCell>

                </TableRow>
         
    )
}
