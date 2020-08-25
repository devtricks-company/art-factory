import React from "react";
import { GET_ALL_ACTIVE_IN_HOME } from "../../graphql";
import { useQuery } from "@apollo/react-hooks";
import HomeCourseItem from "./HomeCourseItem";

const NewCourse = () => {
  const { loading, data } = useQuery(GET_ALL_ACTIVE_IN_HOME);

  return (
    <div className="new-course text-center w-100">
      <h2>دوره های آموزشی</h2>
      <span></span>
      <div className="row w-100">
        {data &&
          data.getAllActiveCourseInHome.length > 0 &&
          data.getAllActiveCourseInHome.map((course) => (
            <HomeCourseItem key={course.id} course={course} />
          ))}
      </div>
      <div className="all-couerses"> <a href="#">دیدن تمامی دوره ها</a></div>
    </div>
  );
};

export default NewCourse;
