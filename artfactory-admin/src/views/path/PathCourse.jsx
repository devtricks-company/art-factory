import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Select } from "antd";
import PicturesWall from "../../components/picuter/PicturesWall";
import { GET_ALL_GROUPS} from '../../graphql';
import { useQuery,useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import PathList from "./PathList";
import AlertMessage from "../../components/alertmessage/AlertMessage";
import {GET_ALL_PATH} from '../../graphql';
import {CSSTransition} from 'react-transition-group';
import PathCourseList from "./PathCourseList";



const { Option, OptGroup } = Select;
 
const PathCourse = (props) => {
  const [AlertState,setAlertState] = useState({
    open:false,
    message:'',
    color:''
})

  const {loading,data} = useQuery(GET_ALL_GROUPS);  
  const [open, setOpen] = useState(false);
  const [paths,setPahts] = useState(true);

  const [pathState,setPathState] = useState({
      name:'',
      icon:'',
      groupId: "",
     
  })
  const handleClose = () => {
    setOpen(false);
  };
  const [addPath,{loading:PathLoading}] = useMutation(ADD_PATH,{
    update(_,result){
      
    },
    onError(err){
      setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
      setTimeout(() => {
        setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
     }, 3000);

    },
    refetchQueries:[{query:GET_ALL_PATH}],
    variables: pathState
  })
  const saveClickHanlder = e => {
      addPath();
      setOpen(false);
      setAlertState({open:true,message:"عملیات با موفقیت انجام شد",color:'green'});
      setTimeout(() => {
         setAlertState({open:false,message:"عملیات با موفقیت انجام شد",color:'green'});
      }, 3000);

  

  }
  const showClickHandler = () => {
    setOpen(true);
  };

  const changePathStateHandler = e => {
      setPathState({...pathState,[e.target.name]:e.target.value});
  }

  const setUrl = url => {
      setPathState({...pathState,icon:url})
  }

  const changeGroupState = value => {
        setPathState({...pathState,groupId:value});
  }

  return (
    <div className="path-course">
      <div className="path-course__wrapper">
        <div className="row mt-5">
          <div className="col-6 text-right path-course__wrapper_header">
            <h6>مدیریت مسیرها </h6>
            <p>در این قسمت شما می توانید مسیر ها را مدیریت کنید</p>
          </div>
          <div className="col-6">
            <button
              className="btn btn-success px-4 py-2"
              style={{ borderRadius: "50px" }}
              onClick={showClickHandler}
            >
              اضافه کردن مسیر جدید
            </button>
          </div>
        </div>
     
        <div className="mt-5">
          <CSSTransition
            in={paths}
            timeout={500}
            classNames="path-list-"
            appear={true}
            
          >
            <PathList />
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
        <DialogTitle id="alert-dialog-title" className="alert-dialog-title">
          {"اضافه کردن مسیر جدید"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="alert-dialog-description"
          >
            <div className="row mt-3">
              <div className="col-12 text-right">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="نام مسیر را وارد کنید"
                  className="form-control p-4"
                  value={pathState.name}
                  onChange={changePathStateHandler}
                />
                <Select
                  defaultValue="گروه را انتخاب کنید"
                  style={{
                    width: "100%",
                    textAlign: "right",
                    marginTop: "1.5rem",
                  }}
                  listHeight={250}
                  listItemHeight={50}
                  onChange={changeGroupState}
                >
                  {data && data.getAllGroups.length > 0 && data.getAllGroups.map(group => 
                     <Option value={group.id}>{group.name}</Option>
                    )}
                </Select>
             <div className="mt-3">   <PicturesWall setURL={setUrl} /></div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <div className="text-left w-100">
                <button className="btn btn-success px-5" style={{borderRadius:"50px"}}
                 onClick={saveClickHanlder}>ذخیره</button>
            </div>
        </DialogActions>
      </Dialog>
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}

    </div>
  );
};

const ADD_PATH = gql`
mutation addPath($name:String!,$icon:String,$groupId:String!) {
  addPath(name:$name,icon:$icon,groupId:$groupId){
    id
    name
    icon
    groupId
    active
    
  }
}

`;

export default PathCourse;
