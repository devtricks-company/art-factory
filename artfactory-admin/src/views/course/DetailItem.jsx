import React, { useState } from "react";
import { TableRow, TableCell, IconButton } from "@material-ui/core";
import Switch from "@material-ui/core/Switch";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {MdEdit} from 'react-icons/md'
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AlertMessage from "../../components/alertmessage/AlertMessage";



const DetailItem = ({ classDetail, number }) => {
    const [AlertState,setAlertState] = useState({
        open:false,
        message:'',
        color:''
    })
    const [active,setActive] = useState(classDetail.active);
    const [open,setOpen] = useState(false);
    const [detail,setDetail] = useState(classDetail);

    const [updateActiveDetail,{loading}] = useMutation(UPATE_DETAIL_ACTIVE,{
        update(_,result){
            console.log(result.data.updateActiveDetail);
        },
        onError(err){
            console.log(err.graphQLErrors[0].message);
        },
        variables:{id:classDetail.id,active:!classDetail.active}
    })
    const changeActiveDetailsHandler = e => {
        updateActiveDetail();
        setActive(!active);
    }
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
          setActive(!active);
      }
    
      const onReserveChange = () => {
        setDetail({...detail,reserve:!detail.reserve});
      }
    
      const onRegisterChange = () =>{
        setDetail({...detail,register:!detail.register});
      }

      const clickShowUpdateHandler = () => {
          setOpen(true);
      }

      const [updateDetail,{loading:DetailLoading}] = useMutation(UPDATE_DETAILS,{
          update(_,result){

          },
          onError(err){
            setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
            setTimeout(() => {
              setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
           }, 3000);
          },
          variables:{
            id:detail.id,
            classcode:detail.classcode,
            duration:detail.duration,
            startDate:detail.startDate,
            days:detail.days,
            capacity:detail.capacity,
            price:detail.price,
            description:detail.description,
            active:active,
            reserve:detail.reserve,
            register:detail.register
              
          }
      });

      const saveClickHanlder = e =>{
          updateDetail();
          setOpen(false);
      }
    
  return (
      <>
    <TableRow>
      <TableCell>{number}</TableCell>
      <TableCell>{classDetail.classcode}</TableCell>
      <TableCell>
        <Switch
        checked={active}
        onChange={changeActiveDetailsHandler}
          color="primary"
          inputProps={{ "aria-label": "primary checkbox" }}
        />
      </TableCell>
      <TableCell>
          <IconButton onClick={clickShowUpdateHandler}>
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
                     checked={active}
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
                <button className="btn btn-success px-4" onClick={saveClickHanlder} >
                    ذخیره
                </button>
            </div>
        </DialogActions>
      </Dialog>
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}

    
</>
  );
};
const UPATE_DETAIL_ACTIVE = gql`

mutation  updateActiveDetail($id:ID!,$active:Boolean)  {
  updateActiveDetail(id:$id,active:$active){
    id
    classcode
    active
  }
}

`;

const UPDATE_DETAILS = gql`

mutation updateDetail(
    $id:ID!,$classcode:String!,$duration:String,
    $startDate:String,
    $days:String,
    $capacity:String,
    $price:String,
    $description:String,
    $active:Boolean,
    $reserve:Boolean,
    $register:Boolean
) {
  updateDetail(
    id:$id,
    classcode:$classcode,
    duration:$duration,
    startDate:$startDate,
    days:$days,
    capacity:$capacity,
    price:$price,
    description:$description,
    active:$active,
    reserve:$reserve,
    register:$register
    
  
  ){
    id
    classcode
    duration
    startDate
    days
    capacity
    price
    description
    active
    reserve
    register
  }
}


`;
export default DetailItem;
