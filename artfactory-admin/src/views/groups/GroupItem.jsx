import React, { useState } from "react";
import { TableRow, TableCell,Switch, IconButton } from "@material-ui/core";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {MdEdit} from 'react-icons/md';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AlertMessage from "../../components/alertmessage/AlertMessage";

const GroupItem = ({ group, number }) => {
    const [AlertState,setAlertState] = useState({
        open:false,
        message:'',
        color:''
    })
    const [active,setActive] = useState(group.active);
    const [open,setOpen] = useState(false);
    const [groupState,setGroupState] = useState(group);
    const handleClose = () =>{
        setOpen(false);
    }

    const [updateActiveGroup,{loading}] = useMutation(UPATE_ACTIVE_GROUP,{
        update(_,result){

        },
        onError(err){
            setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
            setTimeout(() => {
              setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
           }, 3000);
        },
        variables:{id:group.id,active:!group.active}
    })


    const changeActiveHandler = e => {
        updateActiveGroup();
        setActive(!active);
    }

    const clickHandlerShow = () =>{
        setOpen(true);
    }


    const changeGroupHandler = e => {
        setGroupState({...groupState,name:e.target.value});
    }

    const [updateGroup,{loading:GroupLoading}] = useMutation(UPDATE_GROUP,{
        update(_,result){

        },
        onError(err){
            console.log(err.graphQLErrors[0].message);
        },
        variables:{id:group.id,name:groupState.name}
    });

    const saveClickHandler = () =>{
        updateGroup();
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
        <TableCell>{group.name}</TableCell>
        <TableCell>
          <Switch
                checked={active}
                onChange={changeActiveHandler}
            color="primary"
            inputProps={{ "aria-label": "primary checkbox" }}
          />
        </TableCell>
        <TableCell>
           <IconButton onClick={clickHandlerShow}>
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
        <DialogTitle id="alert-dialog-title" className="alert-dialog-title">{"اضافه کردن گروه جدید"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="alert-dialog-description">
            <div className="row">
                <div className="col-12 mt-3">
                    <input type="text" name="name" id="name" placeholder="نام گروه را وارد کنید" className="form-control p-4" 
                      value={groupState.name}
                      onChange={changeGroupHandler}
                    />
                </div>
                
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <div className="action-dialog">

          <button className="btn btn-success" onClick={saveClickHandler} >ذخیره</button>
            </div>
        </DialogActions>
      </Dialog>
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
    </>
  );
};

const UPATE_ACTIVE_GROUP = gql`
mutation  updateActiveGroup($id:ID!,$active:Boolean) {
  updateActiveGroup(id:$id,active:$active){
    id
    name
    active
  }
}

`;

const UPDATE_GROUP = gql`
mutation  updateGroup($id:ID!,$name:String) {
  updateGroup(id:$id,name:$name){
    id
    name
    active
  }
}
`;
export default GroupItem;
