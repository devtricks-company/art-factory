const {gql} = require('apollo-server-express');

const typeDefs = gql`

type Admin{
    id:ID!,
    name:String!,
    mobile:String!,
    email:String!,
    password:String!
    active:Boolean,
    createAt:String,
    token:String
}

type Teacher{
    id:ID!
    name:String,
    mobile:String,
    email:String,
    password:String,
    resume:String,
    picture:String,
    active:Boolean,
    createAt:String
}

type Group{
    id:ID!,
    name:String,
    active:Boolean
}

type Course{
    id:ID!
    title:String,
    shortDescription:String,
    description:String,
    details:[String],
    teachers:[String],
    group:String,
    picture:String,
    video:String,
    videoPoster:String,
    showHome:Boolean,
    active:Boolean,
    typeOfCourse:String,
    createAt:String
    teacherPic:String,
    teacherPicTwo:String,
    teacherName:String,
    teacherNameTwo:String,
    ghest:Boolean
}

type Detail{
    id:ID!
    classcode:String,
    duration:String,
    startDate:String,
    days:String,
    capacity:String,
    price:String,
    description:String,
    active:Boolean,
    reserve:Boolean,
    register:Boolean,
    courseId:ID!
}

type Path{
    id:ID!,
    name:String,
    icon:String,
    groupId:String
    active:Boolean
}

type PathCourse{
    id:ID!,
    numberStep:String,
    courseId:ID,
    pathId:ID
    active:Boolean
    course:Course

}
type RegisterdCourse{
    id:ID!,
    studentID:ID,
    courseID:ID,
    detailID:ID,
    refID:String,
    createAt:String,
    courseTitle:String,
    coursePicture:String,
    studentName:String,
    studentMobile:String,
    classcode:String,
    amount:String,
    instaID:String
}
type Student{
    id:ID!,
    studentNumber:String,
    name:String,
    password:String,
    lastName:String,
    nationCode:String,
    mobile:String,
    educationLevel:String,
    email:String,
    educationMajor:String,
    tel:String,
    addresss:String,
    reserveID:[String],
    courses:[ID],
    finance:[String],
    preFactor:[ID],
    createAt:String,
    active:Boolean,
    token:String,
    Gender:String,
    instaID:String
}
type Prefactor{
    id:ID!
    courseID:ID!,
    detailsID:ID!,
    studentID:ID!,
    createAt:String,
    payment:Boolean,
    course:Course,
    detail:Detail
}

type Moments{
    id:ID
    picture:String,
    description:String,
    createAt:String
    active:Boolean,
    showInHome:Boolean
}

type TeacherGallery{
    id:ID!,
    picture:String,
    createAt:String,
    teacherID:ID!
}
type CourseGallery{
    id:ID!,
    src:String,
    width:String,
    height:String,
    courseID:ID,
    createAt:String,
}

type Reserve{
    id:ID!,
    studentID:ID!,
    courseID:ID!,
    detailsID:ID!,
    createAt:String
}

type Query{
    #admin
    getAllAdmin:[Admin]!
    #Teacher
    getAllTeachers:[Teacher]!
    getAllActiveTeachers:[Teacher]!
    getATeacher(id:ID!):Teacher!
    #Group
    getAllGroups:[Group]!
    getAllActiveGroup:[Group]!

    #Details
    getAllDetailsCourse(courseId:ID!):[Detail]!
    getAllActiveDetailsCourse(courseID:ID):[Detail]!
    getACourse(id:ID):Course!
    getAllActiveCourseByGroup(groupID:ID!):[Course]!

    #course
    getAllActiveCourse:[Course]!
    getAllCourses:[Course]!
    getAllActiveCourseInHome:[Course]!
    getACourseById(id:ID!):Course!
    #Path
    getAllPath:[Path]!

    getAPathPathCourse(pathId:ID!): [PathCourse]!

    #preFactor
    getAllPreFactoryByStudentID(studentID:ID!):[Prefactor]!

    getAllStudentCourses(studentID:ID!):[RegisterdCourse]

    getALLActiveWorkshopInHome:[Course]!

    getAllActiveEventsInHome:[Course]!

    getAllMoments:[Moments]!

    getAllMomentActiveShowHome:[Moments]!

    getAllGalleryTeacher(teacherID:ID!):[TeacherGallery]!

    getAllGalleryCourse(courseID:ID!):[CourseGallery]!

    getAllRegisterStudent(courseID:ID!,DetailID:ID!):[RegisterdCourse]

}



type Mutation{

# ======================================================================================
#admin
    addAdmin(name:String!,mobile:String!,email:String!,password:String!):Admin!
    loginAdmin(mobile:String!,password:String!):Admin!

# ============================================================================================= 
#teacher

    addTeacher(name:String!,mobile:String!,email:String!,password:String!,resume:String,picture:String):Teacher!
    updateTeacherActive(id:ID!,active:Boolean):Teacher!
    updateTeacher(id:ID!,name:String,mobile:String,email:String,password:String,resume:String,picture:String):Teacher!


# ================================================================================================
#Group
    addGroup(name:String!):Group!
    updateActiveGroup(id:ID!,active:Boolean):Group!
    updateGroup(id:ID!,name:String):Group!

#==================================================================================================
 #course

    addCourse( id:ID, title:String!,
    shortDescription:String,
    description:String,
    details:[String],
    teachers:[String],
    group:String,
    picture:String,
    video:String,
    videoPoster:String,
    showHome:Boolean,
    active:Boolean,
    typeOfCourse:String,
    ghest:Boolean

    ):Course!

    addTeacherCourse(id:ID!,teacherID:ID!):Course!

#==================================================================================================
#details
        addDetails( classcode:String!,
    duration:String,
    startDate:String,
    days:String,
    capacity:String,
    price:String,
    description:String,
    active:Boolean,
    reserve:Boolean,
    register:Boolean,courseId:ID!):Detail!

    updateActiveDetail(id:ID!,active:Boolean):Detail!

    updateDetail(id:ID!,classcode:String!,duration:String,
    startDate:String,
    days:String,
    capacity:String,
    price:String,
    description:String,
    active:Boolean,
    reserve:Boolean,
    register:Boolean):Detail!
    updateCapacity(detailID:ID!):Detail!


    #=============================================================================
 #Path

 addPath(name:String!,icon:String,groupId:String!):Path!
 updateActivePath(id:ID!,active:Boolean):Path!
 updatePath(id:ID!,name:String!,icon:String,groupId:String):Path!

#==================================================================================
# Course path

addCoursePath(numberStep:String!,courseId:String!,pathId:String!):PathCourse!
#==============================================================================
# Register Stdent

registerStudent(name:String!,lastName:String!,mobile:String!):Student!

loginStudent(mobile:String!):Student!        

# =========================================================================
#Prefactor
addPrefactor(courseID:ID!,detailsID:ID!,studentID:ID!):Prefactor!
removePrefactor(id:ID!):String!

# ============================================================================
#Registerd Course


redirectToPayment(amount:Int!,description:String!,email:String,mobile:String,redirect:String!):String!
verifyToPayment(amount:Int!,authority:String!,courseID:String!,detailID:String!,studentID:String!,prefactorID:ID!):String!


#========================================================================================
#moments
addNewMoments(picture:String,description:String):Moments!
changeActiveMoments(id:ID!,active:Boolean):Moments!
changeShowInHomeMoment(id:ID!,showInHome:Boolean):Moments!
updateMoment(id:ID!,picture:String,description:String):Moments!

addProfile(id:ID!,nationCode:String!,email:String!,educationMajor:String!,tel:String!,address:String!,instaID:String):Student!
addTeacherGallery(picture:String!,teacherID:ID!):TeacherGallery!

addCourseGallery(src:String!,width:String,height:String,courseID:ID!):CourseGallery!

addReserve(studentID:ID!,courseID:ID!,detailsID:ID!):Reserve!

# //===============================================================================
# check Student
checkStudent(mobile:String!):Student!

}




`;




module.exports = typeDefs;