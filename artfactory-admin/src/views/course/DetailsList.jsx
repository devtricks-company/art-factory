import React from 'react'
import { Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import {GET_ALL_COURSE_DETAILS} from '../../graphql';
import {useQuery} from '@apollo/react-hooks';
import DetailItem from './DetailItem';

const DetailsList = ({courseId}) => {
    
    const {loading,data} = useQuery(GET_ALL_COURSE_DETAILS,{
        variables:{courseId: courseId && courseId}
    })    

    if(data){
        console.log(data.getAllDetailsCourse);
    }
    
    return (
        <div className="row details-list">
        <div className="col-12">
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>شماره</TableCell>
                        <TableCell>کد کلاس</TableCell>
                        <TableCell>فعال</TableCell>
                        <TableCell>عملیات</TableCell>
                       
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data && data.getAllDetailsCourse.length > 0 && data.getAllDetailsCourse.map((classDetail,index) => 
                        <DetailItem key={classDetail.id} classDetail={classDetail} number={++index} />
                        )}
                </TableBody>
            </Table>
        </div>
    </div>
    )
}

export default DetailsList
