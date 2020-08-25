import React from 'react';
import { Table, TableRow, TableHead, TableCell, Tab, TableBody } from '@material-ui/core';
import {GET_ALL_TEACHER} from '../../graphql';
import {useQuery} from '@apollo/react-hooks';
import TeacherItem from './TeacherItem';

const TeacherTable = () => {
    const {loading,data} = useQuery(GET_ALL_TEACHER);
    return (
        <div className="teacher-table">
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
                            نام
                        </TableCell>
                        <TableCell>
                            فعال
                        </TableCell>
                        <TableCell>
                            عملیات
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.getAllTeachers.length > 0 && data.getAllTeachers.map((teacher,index) => 
                        <TeacherItem key={teacher.id}  teacher={teacher} number={++index} />
                        )}
                </TableBody>
            </Table>
        </div>
    )
}

export default TeacherTable
