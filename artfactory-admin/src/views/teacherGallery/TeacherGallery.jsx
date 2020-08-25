import React, { useState } from 'react'
import { Paper, TableHead, TableRow, TableCell, Table, TableBody } from '@material-ui/core'
import { Select } from "antd";

import { GET_ALL_TEACHER,GET_ALL_TEACHER_GALLAREY } from '../../graphql';
import { useQuery,useMutation } from '@apollo/react-hooks';
import PicturesWall from "../../components/picuter/PicturesWall";
import gql from 'graphql-tag';
import AlertMessage from "../../components/alertmessage/AlertMessage";

const TeacherGallery = () => {
    const [AlertState,setAlertState] = useState({
        open:false,
        message:'',
        color:''
    })
    
    
    const { Option } = Select;
    const [teacherGallery, setTeacherGallery] = useState({
        picture: '',
        teacherID: ''
    })
    const { loading, data } = useQuery(GET_ALL_TEACHER);
    const {loading:loadingGallery,data:dataGallery} = useQuery(GET_ALL_TEACHER_GALLAREY,{
        variables:{teacherID:teacherGallery.teacherID}
    })
    const setURL = (url) => {
        setTeacherGallery({ ...teacherGallery, picture: url });
    }
    const teacherIDHandler = (value) => {
        setTeacherGallery({ ...teacherGallery, teacherID: value });
    }
    const [addTeacherGallery,{loading:teacherGalleryLoading}] = useMutation(ADD_TEACHER_ID,{
        update(_,result){
          
        },
        onError(err){
            setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
            setTimeout(() => {
              setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
           }, 3000);
        },
        variables:teacherGallery,
        refetchQueries:[{query:GET_ALL_TEACHER_GALLAREY,variables:{teacherID:teacherGallery.teacherID}}]
    })
    const addClickHandler = e => {
        addTeacherGallery();
        setAlertState({open:true,message:"عملیات با موفقیت انجام شد",color:'green'});
        setTimeout(() => {
           setAlertState({open:false,message:"عملیات با موفقیت انجام شد",color:'green'});
        }, 3000);
    }
    return (
        <div className="teacher-gallery">
            <div className="container mt-5">
                <Paper elevation={3} style={{ padding: "50px" }}>
                    <label htmlFor="">مدرس را انتخاب کنید</label>
                    <div>
                        <Select size='large' defaultValue="مدرس خود را انتخاب کنید" onChange={teacherIDHandler} style={{ width: "100%" }}>
                            {data && data.getAllTeachers.length > 0 && data.getAllTeachers.map(teacher =>
                                <Option value={teacher.id}>{teacher.name}</Option>

                            )}
                        </Select>

                      <div className="mt-4">
                      <PicturesWall setURL={setURL} />
                      </div>

                        <button className="btn btn-success" onClick={addClickHandler}>اضافه کردن عکس</button>

                    </div>
                </Paper>
                <Paper elevation={3} style={{ padding: "50px", marginTop: "30px" }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>شماره </TableCell>
                                <TableCell> عکس</TableCell>
                                <TableCell> عملیات</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {dataGallery && dataGallery.getAllGalleryTeacher.length > 0 && dataGallery.getAllGalleryTeacher.map((gallery,index) => 
                                <TableRow>
                                    <TableCell>{++index}</TableCell>
                                    <TableCell><img src={gallery.picture} alt="" className="gallery-image-teacher"/></TableCell>
                                </TableRow>
                                )}
                        </TableBody>
                    </Table>
                </Paper>
            </div>
            {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
        </div>
    )
}

const ADD_TEACHER_ID = gql`
mutation  addTeacherGallery($picture:String!,$teacherID:ID!) {
  addTeacherGallery(picture:$picture,teacherID:$teacherID){
    id
    picture
  }
}

`;

export default TeacherGallery
