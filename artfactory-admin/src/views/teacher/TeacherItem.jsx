import React, { useState } from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import { Switch } from "@material-ui/core";
import {MdEdit} from 'react-icons/md';
import gql from 'graphql-tag';

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PicturesWall from '../../components/picuter/PicturesWall'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {useMutation} from '@apollo/react-hooks';
import AlertMessage from "../../components/alertmessage/AlertMessage";

const TeacherItem = ({ teacher, number }) => {
    
  const [AlertState,setAlertState] = useState({
    open:false,
    message:'',
    color:''
})

    const moduless = {
        toolbar: [
          [{ header: [1, 2, false] }],
          [{ size: ["small", false, "large", "huge"] }],
          ["bold", "italic", "underline", "strike", "blockquote"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
          ],

          ["link", "image"],
          [{ direction: "rtl" }],
    
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"]
        ]
      };
      const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "direction",
        "size",
        "color",
        "font",
        "align"
      ];


    
    
    const [open,setOpen] = useState(false);
      const [teacherItem,setTeacherItem] = useState(teacher);
      
    const [active,setActive] = useState(teacher.active);
  const [updateTeacherActive,{loading}] = useMutation(UPATE_ACTIVE_TEACHER,{
      update(_,result){
       console.log(result.data.updateTeacherActive);
      },
      onError(err){
        console.log(err.graphQLErrors[0].message);
      },
      variables:{id:teacher.id,active:!teacher.active}
  })
    const changeActive = e => {
        updateTeacherActive();
        setActive(!active);
    }

    const updateHandler = e => {
        setOpen(true);
    }

    const changeTeacherHanlder = e => {

    }

    const handleClose = e => {
        setOpen(false);
    }
    
    const changeTeacherHandler = e => {
        setTeacherItem({...teacherItem,[e.target.name]:e.target.value});

    }
    const setUrl = url => {
        setTeacherItem({...teacherItem,picture:url});

    }
    const changeResumeHanlder = value => {
        setTeacherItem({...teacherItem,resume:value});
    }

    const [updateTeacher,{loading:teacherLoading}] = useMutation(UPDATE_TEACHER,{
        update(_,result){
        
        },
        onError(err){
            setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
            setTimeout(() => {
              setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
           }, 3000);
        },
        variables:{id:teacher.id,name:teacherItem.name,mobile:teacherItem.mobile,email:teacherItem.email,password:teacherItem.password,picture:teacherItem.picture,resume:teacherItem.resume}
    })

    const saveClickHanlder = () => {
        updateTeacher();
        setOpen(false);
        setAlertState({open:true,message:"عملیات با موفقیت انجام شد",color:'green'});
        setTimeout(() => {
           setAlertState({open:false,message:"عملیات با موفقیت انجام شد",color:'green'});
        }, 3000);
    }


  return (
      <>
    <TableRow>
      <TableCell>{number}</TableCell>
      <TableCell> <img src={teacher.picture} alt="" width="100" height="100" style={{borderRadius:"50%",objectFit:"cover",objectPosition:'center'}} /></TableCell>
      <TableCell>{teacher.name}</TableCell>
      <TableCell>
        <Switch
        checked={active}
        onChange={changeActive}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </TableCell>
      <TableCell>
          <IconButton onClick={updateHandler}>
              <MdEdit />
          </IconButton>
      </TableCell>
    </TableRow>
    <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" className="alert-dialog-title">{"اضافه کردن مدرس جدید"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="alert-dialog-description">
            <div className="row">
                <div className="col-6 mt-3">
                    <input type="text" name="name" id="name" placeholder="نام مدرس را وارد کنید" className="form-control p-4" 
                     value={teacherItem.name}
                     onChange={changeTeacherHandler}
                    />
                </div>
                <div className="col-6 mt-3">
                    <input type="text" name="mobile" id="mobile" placeholder="موبایل مدرس را وارد کنید" className="form-control p-4" 
                    value={teacherItem.mobile}
                    onChange={changeTeacherHandler}
                    />
                </div>
                <div className="col-6 mt-4">
                    <input type="email" name="email" id="email" placeholder="ایمیل مدرس را وارد کنید" className="form-control p-4" 
                      
                    value={teacherItem.email}
                    onChange={changeTeacherHandler}
                    />
                </div>
                <div className="col-6 mt-4">
                    <input type="password" name="password" id="password" placeholder="رمز عبور مدرس را وارد کنید" className="form-control p-4"
                     value={teacherItem.password}
                     onChange={changeTeacherHandler}
                    />
                </div>
                <div className="col-12 mt-4">
                    <PicturesWall  setURL={setUrl} defaultImage={teacherItem.picture} /> 
                </div>
                <div className="col-12 mt-4">
                   <ReactQuill modules={moduless} formats={formats} style={{height:"250px"}}
                   value={teacherItem.resume}
                   onChange={changeResumeHanlder}
                   />
                 
                </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <div className="action-dialog">

          <button className="btn btn-success" onClick={saveClickHanlder}>ذخیره</button>
            </div>
        </DialogActions>
      </Dialog>
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
    </>
  );
};
const UPATE_ACTIVE_TEACHER = gql`
mutation updateTeacherActive($id:ID!,$active:Boolean) {
  updateTeacherActive(id:$id,active:$active){
    id
    name
    mobile
    email
    password
    resume
    picture
    active
    createAt
    
  }
}
`;


const UPDATE_TEACHER = gql`

mutation  updateTeacher($id:ID!,$name:String,$mobile:String,$email:String,$password:String,$resume:String,$picture:String) {
  updateTeacher(id:$id,name:$name,mobile:$mobile,email:$email,password:$password,resume:$resume,picture:$picture){
    id
    name
    mobile
    email
    password
    resume
    picture
  }
}
`;
export default TeacherItem;
