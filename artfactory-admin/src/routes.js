import {AiOutlineHome} from 'react-icons/ai';
import Dashboard from './views/dashboard/Dashboard';
import {FaChalkboardTeacher,FaLayerGroup,FaRegImages} from 'react-icons/fa';
import Teacher from './views/teacher/Teacher';
import Group from './views/groups/Group';
import {IoIosBook} from 'react-icons/io';
import Course from './views/course/Course';
import AddCourse from './views/course/AddCourse';
import {GiPathDistance} from 'react-icons/gi';
import PathCourse from './views/path/PathCourse';
import CoursePath from './views/path/CoursePath';
import {MdDetails} from 'react-icons/md';
import CourseDetails from './views/courseDetails/CourseDetails';
import Moments from './views/moments/Moments';
import {BsImages} from 'react-icons/bs';
import Gallery from './views/gallery/Gallery';
import TeacherGallery from './views/teacherGallery/TeacherGallery';
import CourseGallery from './views/courseGallery/CourseGallery';
import {FiUsers} from 'react-icons/fi';
import StudentPanel from './views/Student/StudentPanel';
import {AiOutlineLogin} from 'react-icons/ai';
import MenualRegister from './views/menualRegister/MenualRegister';
import StudentInfo from './views/studentinfo/StudentInfo';


const routes = [
    {
        path:'/dashboard',
        name:"پیشخوان",
        icon: AiOutlineHome ,
        component: Dashboard,
        layout:'/admin',
        show:true
    },{
        path:'/teacher',
        name:'مدیریت مدرسان',
        icon:FaChalkboardTeacher,
        component:Teacher,
        layout:'/admin',
        show:true
    },{
        path:'/groups',
        name:"مدیریت گروها",
        icon:FaLayerGroup,
        component:Group,
        layout:'/admin',
        show:true

    },{
        path:'/course',
        name:"مدیریت دوره ها",
        icon:IoIosBook,
        component:Course,
        layout:'/admin',
        show:true
    },
    {
        path:'/addcourse/:id',
        name:"اضافه کردن دوره",
        icon:null,
        component:AddCourse,
        layout:'/admin',
        show:false
    },
    {
        path:'/addcourse',
        name:"اضافه کردن دوره",
        icon:null,
        component:AddCourse,
        layout:'/admin',
        show:false
    },{
        path:'/path',
        name:"مدیریت مسیر ها",
        icon: GiPathDistance,
        component:PathCourse,
        layout:'/admin',
        show:true
    },
    {
        path:'/pathcourse/:id',
        name:"path course",
        icon:null,
        component:CoursePath,
        layout:'/admin',
        show:false
    },{
        path:"/coursedetails",
        name:"جزییات دوره",
        icon:MdDetails,
        component:CourseDetails,
        layout:'/admin',
        show:true

    },{
        path:"/factory",
        name:"لحظات",
        icon:FaRegImages,
        component:Moments,
        layout:'/admin',
        show:true

    },
    {
        path:"/gallery",
        name:"گالری تصاویر",
        icon:BsImages,
        component:Gallery,
        layout:'/admin',
        show:true

    },
    {
        path:"/teachergallery",
        name:"گالری تصاویر",
        icon:null,
        component:TeacherGallery,
        layout:'/admin',
        show:false

    },{
        path:"/coursegallery",
        name:"گالری دوره",
        icon:null,
        component:CourseGallery,
        layout:'/admin',
        show:false
    },{
        path:"/studentpanel",
        name:"ثبت نامی",
        icon:FiUsers,
        component:StudentPanel,
        layout:'/admin',
        show:true

    },{
        path:'/menualregister',
        name:"ثبت نام دستی",
        icon:AiOutlineLogin,
        component:MenualRegister,
        layout:'/admin',
        show:true
    },{
        path:'/updateStudentInfo/:id',
        name:"update student",
        icon:null,
        component:StudentInfo,
        layout:'/admin',
        show:false
    }

   
]


export default routes;