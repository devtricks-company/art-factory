import React, { useState, useEffect, useMemo } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Paper } from "@material-ui/core";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import PicturesWall from "../../components/picuter/PicturesWall";
import { Select } from "antd";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { GET_ALL_ACTIVE_GROUP } from "../../graphql";
import { useQuery, useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import DetailsCourse from "./DetailsCourse";
import CourseTeacher from "./CourseTeacher";
import AlertMessage from "../../components/alertmessage/AlertMessage";
import {GET_A_COURSE} from '../../graphql';
import {GET_ALL_COURSES} from '../../graphql';

const { Option } = Select;

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    direction: "rtl",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

function getSteps() {
  return ["مشخصات دوره", "مشخصات کلاس", "انتخاب مدرس"];
}

const AddCourse = (props) => {
  const [pathId,setPathID] = useState('');
  useMemo(() => {
      setPathID(props.match.params.id);
  }, [pathId]);
 

  let {loading:SingleCourseLoading,data:SingleCourse} = useQuery(GET_A_COURSE,{variables:{id:pathId}});
 
  const [courseSingle,setCourseSingle] = useState(null);
  const [courseId, setCourseId] = useState("");
  const [descriptionState,setDescriptionState] = useState("");
 
  
 


useMemo(() => {
  if(props.match.params.id){
    if(SingleCourse){
    
       setCourseSingle({
        id:SingleCourse.getACourse.id,
        title: !SingleCourse.getACourse.title ? "" : SingleCourse.getACourse.title,
        shortDescription: SingleCourse.getACourse && SingleCourse.getACourse.shortDescription,
        description:"",
        details: [],
        teachers: SingleCourse.getACourse && SingleCourse.getACourse.teachers ,
        group:  SingleCourse.getACourse && SingleCourse.getACourse.group ,
        picture: SingleCourse.getACourse &&  SingleCourse.getACourse.picture ,
        video:SingleCourse.getACourse &&  SingleCourse.getACourse.video ,
        videoPoster: SingleCourse.getACourse &&  SingleCourse.getACourse.videoPoster ,
        showHome: SingleCourse.getACourse &&  SingleCourse.getACourse.showHome ,
        active:SingleCourse.getACourse &&  SingleCourse.getACourse.active,
        typeOfCourse: SingleCourse.getACourse &&  SingleCourse.getACourse.typeOfCourse,
        ghest: SingleCourse.getACourse &&  SingleCourse.getACourse.ghest
       });
       setCourseId(props.match.params.id);
       
      setDescriptionState(SingleCourse.getACourse.description && SingleCourse.getACourse.description );
    }
  }
 else{
      setCourseSingle({
        id:"",
       title: "",
       shortDescription: "",
       description: "",
       details: [],
       teachers: [],
       group: "",
       picture: "",
       video: "",
       videoPoster: "",
       showHome: false,
       active: false,
       typeOfCourse: "دوره آموزشی",
       ghest:false
     })
  }
},[SingleCourse]);

  const [AlertState, setAlertState] = useState({
    open: false,
    message: "",
    color: "",
  });
  const moduless = {
    toolbar: [
      [{ header: [1, 2, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],

      ["link", "image"],
      [{ direction: "rtl" }],

      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ],
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
    "align",
  ];

  const [course,setCourse] = useState(courseSingle);



  const { loading, data } = useQuery(GET_ALL_ACTIVE_GROUP);

  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const onChangeCourseHandler = (e) => {
  
    setCourseSingle({ ...courseSingle, [e.target.name]: e.target.value });
  };

  if(SingleCourse){
    console.log(SingleCourse.getACourse && SingleCourse.getACourse.ghest)
  }
  

  const changeDescriptionHandler = (value) => {
    setDescriptionState(value);
  };

  const typeSelectHandler = (value) => {
    setCourseSingle({ ...courseSingle, typeOfCourse: value });
  };

  const changeShowHome = (e) => {
    setCourseSingle({ ...courseSingle, showHome: !courseSingle.showHome });
  };
  const changeActive = (e) => {
    setCourseSingle({ ...courseSingle, active: !courseSingle.active });
  };
  const changeGhest = e => {
    setCourseSingle({ ...courseSingle, ghest: !courseSingle.ghest });
  }
  const pictureUrl = (url) => {
    setCourseSingle({ ...courseSingle, picture: url });
  };

  const VideoUrl = (url) => {
    setCourseSingle({ ...courseSingle, video: url });
  };

  const VideoPosterUrl = (url) => {
    setCourseSingle({ ...courseSingle, videoPoster: url });
  };

  const changeGroupHanlder = (value) => {
    setCourseSingle({ ...courseSingle, group: value });
  };




  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <div className="row w-100 inforamtion">
           
            <div className="col-8 information__partone">
              <h5>مشخصات دوره</h5>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="عنوان دوره را وارد کنید"
                className="form-control p-4 mt-3"
                value={courseSingle && courseSingle.title}
                onChange={onChangeCourseHandler}
              />

              <textarea
                name="shortDescription"
                id="shortDescription"
                className="form-control p-4 mt-4"
                rows="5"
                placeholder="توضیحات کوتاه دوره"
                value={ courseSingle && courseSingle.shortDescription}
                onChange={onChangeCourseHandler}
              ></textarea>

              <ReactQuill
                modules={moduless}
                formats={formats}
                style={{ height: "250px" }}
                style={{ marginTop: "2rem", height: "200px" }}
                value={descriptionState && descriptionState}
                onChange={changeDescriptionHandler}
              />
            </div>
            <div className="col-3 information__partone side">
              <h6>نوع دوره</h6>
              {courseSingle && <Select
                defaultValue={courseSingle && courseSingle.typeOfCourse}
                style={{ width: 200, textAlign: "right" }}
                onChange={typeSelectHandler}
              >
                <Option style={{ textAlign: "right" }} value="دوره آموزشی">
                  دوره آموزشی
                </Option>
                <Option style={{ textAlign: "right" }} value="کارگاه آموزشی">
                  کارگاه آموزشی
                </Option>

                <Option style={{ textAlign: "right" }} value="رویداد">
                  رویداد
                </Option>
              </Select>}
              
              <h6 className="mt-5"> گروه دوره</h6>
              {courseSingle &&  <Select
                defaultValue={courseSingle && courseSingle.group}
                style={{ width: 200, textAlign: "right" }}
                onChange={changeGroupHanlder}
              >
                {data &&
                  data.getAllActiveGroup &&
                  data.getAllActiveGroup.map((group) => (
                    <Option key={group.id} value={group.id}>
                      {group.name}
                    </Option>
                  ))}
              </Select>}
             
              <div>
                <FormControlLabel
                  style={{ marginTop: "3rem" }}
                  control={
                    <Switch
                      checked={courseSingle && courseSingle.showHome}
                      onChange={changeShowHome}
                      color="primary"
                    />
                  }
                  label="نمایش در صحفه "
                />
              </div>
              <div>
                <FormControlLabel
                  style={{ marginTop: "1rem", textAlign: "right" }}
                  control={
                    <Switch
                      checked={courseSingle && courseSingle.active}
                      onChange={changeActive}
                      color="primary"
                    />
                  }
                  label="فعال "
                />
              </div>
              <div>
                <FormControlLabel
                  style={{ marginTop: "1rem", textAlign: "right" }}
                  control={
                    <Switch
                      checked={courseSingle && courseSingle.ghest}
                      onChange={changeGhest}
                      color="primary"
                    />
                  }
                  label="اقساطی "
                />
              </div>
            </div>
            <div className="col-8 information__partone type">
              <h5>خصوصیات تصویری دوره</h5>
              <div className="row mt-5">
                <div className="col-4">
                  <h6 className="text-left">عکس دوره</h6>
                  {courseSingle &&  <PicturesWall
                    defaultImage={courseSingle && courseSingle.picture}
                    setURL={pictureUrl}
                  />}
                 
                </div>
                <div className="col-4">
                  <h6 className="text-left">ویدیو دوره</h6>
                  {courseSingle && <PicturesWall
                    defaultImage={courseSingle && courseSingle.video }
                    setURL={VideoUrl}
                  /> }
                  
                </div>
                <div className="col-4">
                  <h6 className="text-left">پوستر ویدیو دوره</h6>
                  {courseSingle &&  <PicturesWall
                    defaultImage={ courseSingle && courseSingle.videoPoster}
                    setURL={VideoPosterUrl}
                  /> }
                 
                </div>
              </div>
            </div>
          </div>
        );
      case 1:
        return <DetailsCourse courseId={courseId} />;
      case 2:
        return <CourseTeacher courseId={courseId} teachers={courseSingle && courseSingle.teachers } />;
      default:
        return "Unknown stepIndex";
    }
  }

  const steps = getSteps();
  const [addCourse, { loading: courseLoading, data: cData }] = useMutation(
    ADD_COURSE,
    {
      async update(_, result) {},
      onError(err) {
        console.log(err.graphQLErrors[0].message);
      },
      variables: {...courseSingle,description:descriptionState,id:courseId ? courseId : ""},
      refetchQueries:[{query:GET_ALL_COURSES}],
      onCompleted({ addCourse }) {
        setCourseId(addCourse.id);
      },
    }
  );
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
    
    }
    if (activeStep === 0) {
      addCourse();
    }
    if (activeStep === 1) {
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
   props.history.push('/admin/course');
  };

  const setURL = (url) => {};

  return (
    <div className="add-course">
      <div className="add-course__wrapper mt-5">
        <div className={classes.root}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <Typography className={classes.instructions}>
                  <div
                    style={{
                      direction: "ltr",
                      textAlign: "center",
                      background: "#fff",
                      padding: "5rem 0",
                      marginTop: "3rem",
                    }}
                  >
                    <div class="svg-box">
                      <svg class="circular green-stroke">
                        <circle
                          class="path"
                          cx="75"
                          cy="75"
                          r="50"
                          fill="none"
                          stroke-width="5"
                          stroke-miterlimit="10"
                        />
                      </svg>
                      <svg class="checkmark green-stroke">
                        <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
                          <path
                            class="checkmark__check"
                            fill="none"
                            d="M616.306,283.025L634.087,300.805L673.361,261.53"
                          />
                        </g>
                      </svg>
                    </div>
                    <div className="messageDilog">دوره با موفقیت ثبت شد</div>
                  </div>
                </Typography>
                <Button onClick={handleReset}>اضافه کردن دوره چدید</Button>
              </div>
            ) : (
              <div>
                <Typography className={classes.instructions}>
                  {getStepContent(activeStep)}
                </Typography>
                <div className="text-left">
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.backButton}
                  >
                    بازگشت
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                  >
                    {activeStep === steps.length - 1 ? "اتمام" : "بعدی"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
const ADD_COURSE = gql`
  mutation addCourse(
    $id:ID,
    $title: String!
    $shortDescription: String
    $description: String
    $details: [String]
    $teachers: [String]
    $group: String
    $picture: String
    $video: String
    $videoPoster: String
    $showHome: Boolean
    $active: Boolean
    $typeOfCourse: String,
    $ghest:Boolean
  ) {
    addCourse(
      id:$id,
      title: $title
      shortDescription: $shortDescription
      description: $description
      details: $details
      teachers: $teachers
      group: $group
      picture: $picture
      video: $video
      videoPoster: $videoPoster
      showHome: $showHome
      active: $active
      typeOfCourse: $typeOfCourse,
      ghest:$ghest
    ) {
      id
      title
      shortDescription
      description
      details
      teachers
      group
      picture
      video
      videoPoster
      showHome
      active
      typeOfCourse,
      ghest
    }
  }
`;
export default AddCourse;
