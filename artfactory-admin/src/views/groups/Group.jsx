import React, { useState } from 'react'
import {IoIosAddCircle} from 'react-icons/io';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import AlertMessage from "../../components/alertmessage/AlertMessage";
import GroupList from './GroupList';
import {CSSTransition} from 'react-transition-group';
import {GET_ALL_GROUPS} from '../../graphql';

const Group = () => {
    const [AlertState,setAlertState] = useState({
        open:false,
        message:'',
        color:''
    })
    const [open,setOpen] = useState(false);
    const [group,setGroup] = useState({
        name:''
    })
    const [table,setTable] = useState(true);
    const handleClose = e => {
        setOpen(false);
    }

    const showNewGroupHanlder = () => {
        setOpen(true);
    }

    const changeGroupNameHanlder = e =>{
        setGroup({...group,name:e.target.value});
    }

    const [addGroup,{loading}] = useMutation(GROUP_ADD,{
        update(_,result){
           
        },
        onError(err){
            setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
            setTimeout(() => {
              setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
           }, 3000);
        },
        variables: group,
        refetchQueries:[{query:GET_ALL_GROUPS}]
    })

    const clickGroupHanlder = () =>{
        addGroup();
        setOpen(false);
        setAlertState({open:true,message:"عملیات با موفقیت انجام شد",color:'green'});
        setTimeout(() => {
           setAlertState({open:false,message:"عملیات با موفقیت انجام شد",color:'green'});
        }, 3000);
        setGroup({name:''})
    }

    return (
        <div className="groups">
          <div className="group__wrapper">
              <div className="row w-100">
                  <div className="col-6 mt-5 group__wrapper_header">
                  <h6>مدیریت گروه ها</h6>
                      <p>در این قسمت می توانید گروه ها را مدیریت نمایید</p>
                  </div>
                  <div className="col-6 mt-5 text-left ">
                  <button className="btn btn-success py-2 px-4" style={{borderRadius:"50px"}} onClick={showNewGroupHanlder} > <IoIosAddCircle style={{fontSize:"18px",marginLeft:"5px"}}/> اضافه کردن مدیریت جدید</button>
                  </div>
              </div>
              <div className="row w-100">
                  <CSSTransition
                        in={table}
                        appear={true}
                        timeout={500}
                        classNames="group-list-"
                  >
                 
                       <GroupList />
                  </CSSTransition>
              </div>
          </div>
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
                        value={group.name}
                        onChange={changeGroupNameHanlder}
                    />
                </div>
                
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <div className="action-dialog">

          <button className="btn btn-success" onClick={clickGroupHanlder} >ذخیره</button>
            </div>
        </DialogActions>
      </Dialog>
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
        </div>
    )
}

const GROUP_ADD = gql`

mutation  addGroup($name:String!) {
  addGroup(name:$name){
    id
    name
    active
  }
}

`;

export default Group
