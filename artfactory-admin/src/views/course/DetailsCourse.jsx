import React, { useState,useEffect } from "react";

import { CSSTransition } from "react-transition-group";
import DetailsList from "./DetailsList";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Switch from "@material-ui/core/Switch";
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {GET_ALL_COURSE_DETAILS} from '../../graphql';
import AlertMessage from "../../components/alertmessage/AlertMessage";

const DetailsCourse = ({ courseId }) => {
    const [AlertState,setAlertState] = useState({
        open:false,
        message:'',
        color:''
    })
    
  const [appearState, setAppearState] = useState(true);
  const [open, setOpen] = useState(false);
  const [detail,setDetail] = useState({
    classcode:'',
    duration:'',
    startDate:'',
    days:'',
    capacity:'',
    price:'',
    description:'',
    reserve:false,
    register:false,
    active:false,
    courseId:courseId && courseId
  })
  useEffect(() => {
      setDetail({...detail,courseId:courseId})
  }, [courseId])
  const [addDetails,{loading}]= useMutation(ADD_DETAIL,{
      update(_,result){
            console.log(result.data.addDetails);
      },
      onError(err){
        setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
        setTimeout(() => {
          setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
       }, 3000);
      },
      variables:detail,
      refetchQueries:[{query:GET_ALL_COURSE_DETAILS,variables:{courseId}}]
  })
  const handleClose = () => {
    setOpen(false);
  };

  const detailsClickHanlder = () => {
    setOpen(true);
  };

  const detailChangeHanlder = e => {
      setDetail({...detail,[e.target.name]:e.target.value});
  }

  const onActiveChange = () =>{
      setDetail({...detail,active:!detail.active});
  }

  const onReserveChange = () => {
    setDetail({...detail,reserve:!detail.reserve});
  }

  const onRegisterChange = () =>{
    setDetail({...detail,register:!detail.register});
  }

  const saveClickHanlder = e => {
    addDetails();
    setOpen(false);
  }
  return (
    <div className="details-course">
      <div className="row mt-5">
        <div className="col-6 text-righ details-course__header_title">
          <h6>مدیریت کلاس ها</h6>
          <p>دراین قسمت شما می تواننید کلاس های اینه دوره را مدیریت نمایید</p>
        </div>
        <div className="col-6 text-left details-course__header_button">
          <button
            className="btn btn-success py-2 "
            onClick={detailsClickHanlder}
          >
            اضافه کرددن کلاس جدید
          </button>
        </div>
      </div>
      <CSSTransition
        in={appearState}
        timeout={500}
        classNames="details-list-"
        appear={true}
      >
        <DetailsList courseId={courseId} />
      </CSSTransition>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" className="alert-dialog-title">
          {"اضافه کردن کلاس جدید"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="alert-dialog-description"
          >
            <div className="row">
              <div className="col-6 ">
                <input
                  type="text"
                  name="classcode"
                  id="classcode"
                  placeholder="کد کلاس را وارد کنید"
                  className="form-control p-4"
                  value={detail.classcode}
                  onChange={detailChangeHanlder}
                />
              </div>

              <div className="col-6">
                <input
                  type="text"
                  name="duration"
                  id="duration"
                  placeholder="مدت زمان  کلاس به ساعت را وارد کنید"
                  className="form-control p-4"
                  value={detail.duration}
                  onChange={detailChangeHanlder}
                />
              </div>
              <div className="col-6 mt-3">
                <input
                  type="text"
                  name="startDate"
                  id="startDate"
                  placeholder="تاریخ شروع  کلاس"
                  className="form-control p-4"
                  value={detail.startDate}
                  onChange={detailChangeHanlder}
                />
              </div>
              <div className="col-6 mt-3">
                <input
                  type="text"
                  name="days"
                  id="days"
                  placeholder="روزهای برگزاری کلاس"
                  className="form-control p-4"
                  value={detail.days}
                  onChange={detailChangeHanlder}
                />
              </div>
              <div className="col-6 mt-3">
                <input
                  type="text"
                  name="capacity"
                  id="capcity"
                  placeholder=" ظرفبت  کلاس"
                  className="form-control p-4"
                  value={detail.capacity}
                  onChange={detailChangeHanlder} 

                />
              </div>
              <div className="col-6 mt-3">
                <input
                  type="text"
                  name="price"
                  id="price"
                  placeholder="مبلغ پرداختی"
                  className="form-control p-4"
                  value={detail.price}
                  onChange={detailChangeHanlder}
                />
              </div>
              <div className="col-12 mt-3">
                <textarea
                  name="description"
                  id="description"
                  className="form-control p-4"
                  rows="4"
                  placeholder="توضیحات کلاس را وارد کنید"
                  value={detail.description}
                  onChange={detailChangeHanlder}
                ></textarea>
              </div>
              <div className="col-4 text-center mt-3">
                <FormControlLabel
                  control={
                    <Switch
                     checked={detail.active}
                     onChange={onActiveChange}
                      color="primary"
                    />
                  }
                  label="فعال"
                />
              </div>
              <div className="col-4 text-center mt-3">
                <FormControlLabel
                  control={
                    <Switch
                    checked={detail.reserve}
                    onChange={onReserveChange}
                    
                      color="primary"
                    />
                  }
                  label="رزرو"
                />
              </div>
              <div className="col-4 text-center mt-3">
                <FormControlLabel
                  control={
                    <Switch
                    checked={detail.register}
                     onChange={onRegisterChange}
                     
                      color="primary"
                    />
                  }
                  label="ثبت نام"
                />
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <div className="text-left w-100">
                <button className="btn btn-success px-4" onClick={saveClickHanlder}>
                    ذخیره
                </button>
            </div>
        </DialogActions>
      </Dialog>
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}

    </div>
  );
};
const ADD_DETAIL = gql`

mutation  addDetails($classcode:String!,
    $duration:String,
    $startDate:String,
    $days:String,
    $capacity:String,
    $price:String,
    $description:String,
    $active:Boolean,
    $reserve:Boolean,
    $register:Boolean,
    $courseId:ID!) {
 addDetails(classcode:$classcode, duration:$duration,startDate:$startDate,days:$days,capacity:$capacity,price:$price,
  description:$description,active:$active,
  reserve:$reserve,
  register:$register,courseId:$courseId){
    id
    classcode
    duration
    startDate
    days
    capacity
    price
    description
    reserve
    register
    active
    courseId
  }
}


`;
export default DetailsCourse;
