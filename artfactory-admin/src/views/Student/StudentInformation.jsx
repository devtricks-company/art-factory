import React from 'react'
import { TableRow, TableCell } from '@material-ui/core';
import moment from 'moment-jalali'

const StudentInformation = ({number,info}) => {
    return (
        <TableRow>
            <TableCell>{number}</TableCell>
            <TableCell>{info.studentName}</TableCell>
            <TableCell>{info.studentMobile}</TableCell>
            <TableCell>{info.courseTitle}</TableCell>
            <TableCell>{info.classcode}</TableCell>
            <TableCell> {moment(parseInt(info.createAt)).format('jYYYY/jM/jD').toLocaleString("fa-IR")}</TableCell>
            <TableCell> {parseInt(info.amount).toLocaleString('fa-IR')} تومان</TableCell>
            <TableCell>{info.instaID}</TableCell>
        </TableRow>
    )
}

export default StudentInformation
