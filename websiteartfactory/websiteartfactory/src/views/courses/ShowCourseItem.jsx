import React from "react";
import { TableRow,TableCell } from "@material-ui/core";

const ShowCourseItem = ({ course, number }) => {
  return (
    <TableRow>
      <TableCell>{number}</TableCell>
      <TableCell><img src={course.coursePicture} alt={course.title}/></TableCell>
      <TableCell>{course.courseTitle}</TableCell>
      <TableCell>{course.refID}</TableCell>
    </TableRow>
  );
};

export default ShowCourseItem;
