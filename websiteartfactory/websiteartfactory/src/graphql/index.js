import gql from "graphql-tag";

export const GET_ALL_ACTIVE_IN_HOME = gql`
  query {
    getAllActiveCourseInHome {
      id
      title
      shortDescription
      picture
      typeOfCourse
      teacherPic
      teacherPicTwo
    }
  }
`;
export const GET_ALL_PREFACTOR_STUDENT = gql`
  query getAllPreFactoryByStudentID($studentID: ID!) {
    getAllPreFactoryByStudentID(studentID: $studentID) {
      id
      courseID
      detailsID
      studentID
      createAt
      payment
      course {
        id
        title
        picture,
        ghest
      }
      detail {
        id
        classcode
        startDate
        days
        price
      }
    }
  }
`;

export const GET_ALL_STUDENT_COURSES = gql`
  query  getAllStudentCourses($studentID:ID!){
    getAllStudentCourses(studentID: $studentID) {
      id
      studentID
      courseID
      detailID
      refID
      courseTitle
      coursePicture
    }
  }
`;

export const GET_ALL_WORKSHOP = gql`
  query {
    getALLActiveWorkshopInHome {
      id
      title
      shortDescription
      teacherPic
      teacherPicTwo
      picture
      teacherName
      teacherNameTwo
    }
  }
`;

export const GET_ALL_EVENTS_IN_HOME = gql`
  query {
    getAllActiveEventsInHome {
      id
      title
      teacherPic
      shortDescription
      picture
    }
  }
`;


export const  GET_ALL_TEACHER_GALLAREY = gql`
query getAllGalleryTeacher($teacherID:ID!){
 getAllGalleryTeacher(teacherID:$teacherID){
  id
  picture
  
}
}


`;

export const GET_ALL_COURSE_GALLERY = gql`
query  getAllGalleryCourse($courseID:ID!) {
  getAllGalleryCourse(courseID:$courseID){
    id
    src
    width
    height
    courseID
  }
}


`;
