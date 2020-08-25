import React from "react";
import {withRouter} from 'react-router-dom';

const HomeCourseItem = (props) => {
  const {course} = props;
  const clickHanlder = e => {
    props.history.push(`/course/${course.id}`);
  }
  
  return (
   
      <div className="col-lg-4 col-md-6 col-12 course-item-home" >
        <img src={course.picture} alt={course.title} />
        <div className="overlay-course" onClick={clickHanlder}>
            <div className="px-4 py-2">
            <img src={course.teacherPic} alt={course.title}/>
            <h4>{course.title}</h4>
            <p>{course.shortDescription}</p>
            </div>

        </div>
      </div>
   
  );
};

export default withRouter(HomeCourseItem);
