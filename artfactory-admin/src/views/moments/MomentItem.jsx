import React,{useState} from "react";
import { TableRow, TableCell ,Switch, IconButton } from "@material-ui/core";
import {MdModeEdit} from 'react-icons/md';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PicturesWall from '../../components/picuter/PicturesWall';
import AlertMessage from "../../components/alertmessage/AlertMessage";


const MomentItem = ({ moment, number }) => {
  const [AlertState,setAlertState] = useState({
    open:false,
    message:'',
    color:''
})

  const [active,setActive] = useState(moment.active);
  const [activeHome,setActiveHome] = useState(moment.showInHome);
  const [open,setOpen] = useState(false);
  const [ momentsState,setMomentState] = useState({
    picture:moment.picture,
    description:moment.description
  })
  const handleClose = e => {
    setOpen(false);
  }
  const [changeActiveMoment,{loading}] = useMutation(CHANGE_ACTIVE_MOMENT,{
    update(_,result){

    },
    onError(err){
      console.log(err.graphQLErrors[0].message);
    },
    variables:{id:moment.id,active: !moment.active }
  })

  const [changeShowInHomeMoment,{loading:ShowLoading}] = useMutation(CHANGE_SHOW_IN_HOEM,{
    update(_,result){

    },
    onError(err){
      console.log(err.graphQLErrors[0].message);
    },
    variables:{id:moment.id,showInHome:!moment.showInHome}
  })

  const [updateMoment,{loading:updateLoading}] = useMutation(UPDATE_MOMENT,{
    update(_,result){

    },
    onError(err){
      setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
      setTimeout(() => {
        setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
     }, 3000);

    },
    variables:{id:moment.id,picture:momentsState.picture,description:momentsState.description}
  })


    const clickHanlderEdit = () => {
        setOpen(true);
    }

    const changeActive = e =>{
      changeActiveMoment();
      setActive(!active);

    }

    const changeShowInActiveHome = e => {
      changeShowInHomeMoment();
      setActiveHome(!activeHome);

    }

    const setUrl = url =>{
        setMomentState({...momentsState,picture:url});
    }

    const changeDescriptionHandler = e =>{
      setMomentState({...momentsState,description:e.target.value});
    }

    const changeClickHandler = e =>{
        updateMoment();
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
      <TableCell>
        <img className="moment-image" src={moment.picture} alt="" />
      </TableCell>
      <TableCell>
        {" "}
        <Switch checked={moment.active} onChange={changeActive} inputProps={{ "aria-label": "secondary checkbox" }} />
      </TableCell>
      <TableCell> <Switch checked={moment.showInHome}  onChange={changeShowInActiveHome} inputProps={{ "aria-label": "secondary checkbox" }} />
      </TableCell>
      <TableCell>
          <IconButton onClick={clickHanlderEdit}>
              <MdModeEdit />
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
        <DialogTitle id="alert-dialog-title" className="alert-dialog-title">{"اضافه کردن لحظه جدید"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description" className="alert-dialog-description">
          <div>
                        <PicturesWall setURL={setUrl} defaultImage={momentsState.picture} />    
                        <textarea name="description" id="description"  rows="5" className="form-control" placeholder="توضیحات لحظه را وارد کنید"
                        value={momentsState.description}
                        onChange={changeDescriptionHandler}
                        ></textarea> 
                    </div>    
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <div className="text-left w-100">
                
          <button className="btn btn-success" onClick={changeClickHandler} >اضافه</button>
            </div>
        </DialogActions>
      </Dialog>
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
    
    </>
  );
};
const CHANGE_ACTIVE_MOMENT = gql`
mutation changteActiveMoments($id:ID!,$active:Boolean)  {
  changeActiveMoments(id:$id,active:$active){
    id
    picture
    description
    createAt
    active
    showInHome
  }
}
`;

const CHANGE_SHOW_IN_HOEM = gql`
  mutation changeShowInHomeMoment($id:ID!,$showInHome:Boolean) {
  changeShowInHomeMoment(id:$id,showInHome:$showInHome){
    id
    picture
    description
    createAt
    active
    showInHome
  }
}

`;

const UPDATE_MOMENT = gql`
mutation updateMoment($id:ID!,$picture:String,$description:String) {
  updateMoment(id:$id,picture:$picture,description:$description){
    id
    picture
    description
    createAt
    active
    showInHome
  }
}

`;
export default MomentItem;
