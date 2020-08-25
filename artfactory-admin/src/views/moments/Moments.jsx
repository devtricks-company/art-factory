import React, { useState } from 'react'
import { Paper, Table, TableHead, TableRow, TableCell,TableBody } from '@material-ui/core'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PicturesWall from '../../components/picuter/PicturesWall';
import gql from 'graphql-tag';
import {useMutation, useQuery} from '@apollo/react-hooks';
import {GET_ALL_MOMENTS} from '../../graphql';
import MomentItem from './MomentItem';
import AlertMessage from "../../components/alertmessage/AlertMessage";

const Moments = () => {
    const [open,setOpen] = useState(false);
    const [moment,setMoment] = useState({
        picture:'',
        description:''
    })
    const [AlertState,setAlertState] = useState({
      open:false,
      message:'',
      color:''
  })
  

    const {loading:momentsLoading,data} = useQuery(GET_ALL_MOMENTS);
    const [addNewMoments,{loading}] = useMutation(ADD_MOMENTS,{
      update(_,result){
        console.log(result);
      },
      onError(err){
        setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
            setTimeout(() => {
              setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
           }, 3000);
      },
      variables:moment
    })
    const handleClose = () =>{
        setOpen(false);
    }
    const clickHanlder = () => {
        setOpen(true);
    }

    const setUrl = (url) => {
        setMoment({...moment,picture:url})
    }

    const onChangeMomentHanlder = e => {
        setMoment({...moment,description:e.target.value})
    }

    const clickHandlerMoments = e =>{
      addNewMoments();
      setOpen(false);
      setAlertState({open:true,message:"عملیات با موفقیت انجام شد",color:'green'});
      setTimeout(() => {
         setAlertState({open:false,message:"عملیات با موفقیت انجام شد",color:'green'});
      }, 3000);
      
    }

    if(momentsLoading){
      return(
        <h1>loading ...</h1>
      )
    }
    return (
        <div className="moments mt-5">
           <div className="container mt-5">
               <div style={{direction:"rtl",textAlign:"left"}}>
                    <button className="btn btn-success" onClick={clickHanlder}>اضافه کردن لحظه جدید</button>
               </div>
                <Paper elevation style={{padding:"50px",marginTop:"50px"}}>
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
                           فعال
                         </TableCell>
                         <TableCell>
                           نمایش در صحفه اصلی
                         </TableCell>
                         <TableCell>
                           جزییات
                         </TableCell>
                       </TableRow>
                     </TableHead>
                     <TableBody>
                          {data && data.getAllMoments.length > 0 && data.getAllMoments.map((moment,index) => 
                            <MomentItem key={moment.id} moment={moment} number={++index} /> 
                            ) }
                     </TableBody>
                   </Table>
                </Paper>
           </div>
           <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="lg"
      >
        <DialogTitle id="alert-dialog-title" className="alert-dialog-title">{"اضافه کردن لحظه جدید"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="alert-dialog-description">
          <div>
                        <PicturesWall setURL={setUrl} />    
                        <textarea name="description" id="description"  rows="5" className="form-control" placeholder="توضیحات لحظه را وارد کنید"
                        value={moment.description}
                        onChange={onChangeMomentHanlder}
                        ></textarea> 
                    </div>    
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <div className="text-left w-100">
                
          <button className="btn btn-success" onClick={clickHandlerMoments}>اضافه</button>
            </div>
        </DialogActions>
      </Dialog>
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
        </div>
    )
}

const ADD_MOMENTS = gql`

mutation addNewMoments($picture:String,$description:String)  {
  addNewMoments(picture:$picture,description:$description){
    id
    picture
    description
    createAt
  }
}
`;
export default Moments
