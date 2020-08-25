import React, { useState } from 'react'
import {IoIosAddCircle} from 'react-icons/io';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PicturesWall from '../../components/picuter/PicturesWall'
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import gql from 'graphql-tag';
import {useQuery,useMutation} from '@apollo/react-hooks';
import AlertMessage from "../../components/alertmessage/AlertMessage";
import TeacherTable from './TeacherTable';
import {CSSTransition} from 'react-transition-group';
import {GET_ALL_TEACHER } from '../../graphql';
const Teacher = () => {

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
    const [teacherList,setTeacherList] = useState(true);

    const [teacher,setTeacher] = useState({
      name:'',
      mobile:'',
      email:'',
      password:'',
      resume:'',
      picture:''
    });

    const handleClose = e =>{
        setOpen(false);
    }

    const clickAddHanlder = e => {
        setOpen(true);
    }

    const setURL = url => {
      setTeacher({...teacher,picture:url});
    }

    const changeTeacherHanlder = e => {
      setTeacher({...teacher,[e.target.name]:e.target.value});
    }

    const changeResumeHandler = value => {
      setTeacher({...teacher,resume:value})
    }

    const [addTeacher,{loading:teacherLoading}] = useMutation(ADD_TEACHER,{
      update(_,result){
        console.log(result.data.addTeacher);
      },
      onError(err){
        setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
        setTimeout(() => {
          setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
       }, 3000);

      },
      variables: teacher,
      refetchQueries:[{query:GET_ALL_TEACHER }]

    })


    const saveTacherHandler = e => {
      addTeacher();
      setOpen(false);
      setAlertState({open:true,message:"عملیات با موفقیت انجام شد",color:'green'});
      setTimeout(() => {
         setAlertState({open:false,message:"عملیات با موفقیت انجام شد",color:'green'});
      }, 3000);
      setTeacher({name:'',mobile:'',email:'',password:'',resume:''})
  
    }
    return (
        <div className="teacher">
            <div className="teacher__wrapper">
              <div className="row w-100">
                  <div className="col-6">
                      <h6>مدیریت مدرسان</h6>
                      <p>در این قسمت می توانید مدرسان را مدیریت نمایید</p>
                  </div>
                  <div className="col-6 text-left header_button">
                      <button className="btn btn-success" onClick={clickAddHanlder}> <IoIosAddCircle style={{fontSize:"18px",marginLeft:"5px"}}/> اضافه کردن مدیریت جدید</button>
                  </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <CSSTransition
                    in={teacherList}
                    timeout={500}
                    classNames="teacher-table-"
                    appear={true}
                  >

                      <TeacherTable/>
                  </CSSTransition>
                </div>
              </div>
            </div>
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
                      value={teacher.name}
                      onChange={changeTeacherHanlder}
                    />
                </div>
                <div className="col-6 mt-3">
                    <input type="text" name="mobile" id="mobile" placeholder="موبایل مدرس را وارد کنید" className="form-control p-4" 
                      value={teacher.mobile}
                      onChange={changeTeacherHanlder}
                    />
                </div>
                <div className="col-6 mt-4">
                    <input type="email" name="email" id="email" placeholder="ایمیل مدرس را وارد کنید" className="form-control p-4" 
                      value={teacher.email}
                      onChange={changeTeacherHanlder}
                    
                    />
                </div>
                <div className="col-6 mt-4">
                    <input type="password" name="password" id="password" placeholder="رمز عبور مدرس را وارد کنید" className="form-control p-4"
                      value={teacher.password}
                      onChange={changeTeacherHanlder}
                    />
                </div>
                <div className="col-12 mt-4">
                    <PicturesWall setURL={setURL} /> 
                </div>
                <div className="col-12 mt-4">
                   <ReactQuill modules={moduless} formats={formats} style={{height:"250px"}} value={teacher.resume} 
                   onChange={changeResumeHandler} />
                </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <div className="action-dialog">

          <button className="btn btn-success" onClick={saveTacherHandler}>ذخیره</button>
            </div>
        </DialogActions>
      </Dialog>
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
    
        </div>
    )
}

const ADD_TEACHER = gql`
mutation  addTeacher($name:String!,$mobile:String!,$email:String!,$password:String!,$resume:String,$picture:String) {
  addTeacher(name:$name,mobile:$mobile,email:$email,password:$password,resume:$resume,picture:$picture){
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
export default Teacher
