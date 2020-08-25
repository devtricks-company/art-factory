import React from 'react'
import { Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core'
import {GET_ALL_A_PATH} from '../../graphql';
import { useQuery } from '@apollo/react-hooks';
import { PathCourseItem } from './PathCourseItem';


const PathCourseList = (props) => {
    const {loading,data} = useQuery(GET_ALL_A_PATH,{
        variables:{pathId:props.pathID}
    })


    return (
        <div className="path-course-list">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>شماره</TableCell>
                        <TableCell>گام</TableCell>
                        <TableCell>دوره</TableCell>
                        <TableCell>فعال</TableCell>
                        <TableCell>عملیات</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.getAPathPathCourse.length > 0 && data.getAPathPathCourse.map((path,index) => 
                        <PathCourseItem key={path.id} path={path} number={++index} />
                        )}
                </TableBody>
            </Table>
        </div>
    )
}

export default  PathCourseList
