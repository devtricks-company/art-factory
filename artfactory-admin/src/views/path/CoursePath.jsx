import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { GET_ALL_COURSES } from "../../graphql";
import { useQuery,useMutation } from "@apollo/react-hooks";
import { Switch } from "@material-ui/core";
import gql from 'graphql-tag';
import AlertMessage from "../../components/alertmessage/AlertMessage";
import PathCourseList from  './PathCourseList';
const CoursePath = (props) => {
    const [AlertState,setAlertState] = useState({
        open:false,
        message:'',
        color:''
    })
  const [open, setOpen] = useState(false);
  const [active,setActive] = useState(false);
  const [pathCourse,setPathCourse] = useState({
      numberStep:'',
      courseId:'',
      pathId:props.match.params.id
  })

  const { loading, data } = useQuery(GET_ALL_COURSES);

  const handleClose = (e) => {
    setOpen(false);
  };

  const showCourseDialog = () => {
    setOpen(true);
  };

  const [addCoursePath,{loading:loadingCoursePath}] = useMutation(ADD_PATH_COURSE,{
      update(_,result){
          console.log(result);
      },
      onError(err){
        setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
        setTimeout(() => {
          setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
       }, 3000);
      },
      variables:pathCourse
  })
  const onChangeActiveHandler = id => {
      setPathCourse({...pathCourse,courseId:id})  
      setActive(!active);
  }

  const onChangePathState = e => {
      setPathCourse({...pathCourse,numberStep:e.target.value});
  }

  const savePathCourseHanlder = e => {
      addCoursePath();
      setOpen(false);
      setAlertState({open:true,message:"عملیات با موفقیت انجام شد",color:'green'});
      setTimeout(() => {
         setAlertState({open:false,message:"عملیات با موفقیت انجام شد",color:'green'});
      }, 3000);
  }

  return (
    <div className="course-path w-75 mx-auto ">
      <div className="row w-100 course-path__wrapper mt-5">
        <div className="col-6 text-right">
          <h6>مدیریت مسیرها </h6>
          <p>در این قسمت شما می توانید مسیر ها را مدیریت کنید</p>
        </div>
        <div className="col-6 text-left">
          <button
            className="btn btn-success px-4 py-2"
            style={{ borderRadius: "50px" }}
            onClick={showCourseDialog}
          >
            اضافه کردن مسیر جدید
          </button>
        </div>
      </div>
      <div className="row">
          <div className="col-12">
               <PathCourseList pathID={props.match.params.id} />
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
          {"افزودن دوره به مسیر"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            className="alert-dialog-description"
          >
            <input
              type="number"
              name="numberStep"
              id="numberStep"
              className="form-control p-4"
              placeholder="شماره دوره در مسیر"
              value={CoursePath.numberStep}
              onChange={onChangePathState}
            />
            <div className="list-group mt-3">
              {data &&
                data.getAllCourses.length > 0 &&
                data.getAllCourses.map((course, index) => (
                  <div className="list-group-item text-right p-4">
                    <div className="course-number">
                      <span>{++index}</span>
                    </div>
                    <div classsName="course-image">
                      <img
                        src={course.picture}
                        alt={course.title}
                        style={{
                          width: "70px",
                          height: "70px",
                          borderRadius: "50px",
                        }}
                      />
                    </div>
                    <div className="course-name">
                      <span>{course.title}</span>
                    </div>
                    <div className="course-select">
                      <Switch
                         checked={active}
                         onChange={() => onChangeActiveHandler(course.id)}   
                         color="primary"
                        name="checkedB"
                        inputProps={{ "aria-label": "primary checkbox" }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <div className="text-left w-100">
                <button className="btn btn-success" onClick={savePathCourseHanlder}>
                    ذخیره
                </button>
            </div>
        </DialogActions>
      </Dialog>
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
    </div>
  );
};
const ADD_PATH_COURSE = gql`
mutation  addCoursePath($numberStep:String!,$courseId:String!,$pathId:String!) {
  addCoursePath(numberStep:$numberStep,courseId:$courseId,pathId:$pathId){
    id
    courseId
    pathId
    active
  }
}


`;
export default CoursePath;
