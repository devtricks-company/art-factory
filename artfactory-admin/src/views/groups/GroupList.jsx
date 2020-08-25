import React from 'react';
import { Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core';
import {GET_ALL_GROUPS} from '../../graphql';
import {useQuery} from '@apollo/react-hooks';
import GroupItem from './GroupItem';
const GroupList = () => {

    const {loading,data} = useQuery(GET_ALL_GROUPS);
    return (
        <div className="group-list w-100 mt-5">
               <Table>
                      <TableHead>
                          <TableRow>
                              <TableCell>شماره</TableCell>
                              <TableCell>نام</TableCell>
                              <TableCell>فعال</TableCell>
                              <TableCell>عملیات</TableCell>
                          </TableRow>
                      </TableHead>
                      <TableBody>
                            {data && data.getAllGroups.length > 0 && data.getAllGroups.map((group,index) =>
                                <GroupItem key={group.id} group={group} number={++index} />
                                
                                )}
                      </TableBody>
                  </Table>
        </div>
    )
}

export default GroupList
