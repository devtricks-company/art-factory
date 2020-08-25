import gql from 'graphql-tag';


export const GET_ALL_TEACHER = gql`

query{
  getAllTeachers{
    id
    name
    mobile
    email
    password
    resume
    picture
    active
    createAt
    
    
  }
}

`;

export const GET_ALL_GROUPS = gql`
query{
  getAllGroups{
    id
    name
    active
  }
}

`;

export const GET_ALL_ACTIVE_GROUP = gql`

query{
  getAllActiveGroup{
    id
    name
    
  }
}

`;

export const GET_ALL_COURSE_DETAILS = gql`

query  getAllDetailsCourse($courseId:ID!) {
  getAllDetailsCourse(courseId:$courseId){
    id
    classcode
    duration
    startDate
    days
    capacity
    price
    description
    active
    reserve
    register
    courseId
    
  }
}

`;

export const  GET_ALL_ACTIVE_TEACHER = gql`
query{
  getAllActiveTeachers{
    id
    name
    mobile
    email
    password
    resume
    picture
    active
    createAt
  }
}



`;

export const GET_ALL_COURSES = gql`

query{
  getAllCourses{
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
    typeOfCourse
    createAt,
    ghest
  }
}


`;

export const GET_A_COURSE =  gql`


query  getACourse($id:ID)  {
  getACourse(id:$id){
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
    typeOfCourse
    createAt,
    ghest
  }
}



`;

export const GET_ALL_PATH = gql`

query{
  getAllPath{
    id
    name
    active
    groupId
    icon
  }
}


`;

export const GET_ALL_A_PATH = gql`

query   getAPathPathCourse($pathId:ID!) {
  getAPathPathCourse(pathId:$pathId){
    id
    numberStep
    courseId
    pathId
    active,
    course{
      
      title,

    }
  }
}



`;

export const GET_ALL_MOMENTS = gql`
query{
  getAllMoments{
    id
    picture
    description
    createAt
    active
    showInHome
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

export const GET_ALL_COURSES_GALLERY = gql`
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