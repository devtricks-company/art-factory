import {MdDashboard,MdClass,MdEventAvailable,MdSignalCellularConnectedNoInternet4Bar} from 'react-icons/md';
import {FaNetworkWired,FaFileInvoiceDollar,FaUserAlt} from 'react-icons/fa';
import {AiFillDollarCircle,AiOutlineMessage} from 'react-icons/ai';
import {GiExitDoor} from 'react-icons/gi';
import {GoBookmark} from 'react-icons/go'
import Dashboard from './views/dashboard/Dashboard';
import Prefactor from './views/prefactor/Prefactor';
import ShowCourses from './views/courses/ShowCourses';
import Profile from './views/profile/Profile';
import Logout from './views/logout/Logout';

const routes = [{
    path:'/dashboard',
    name:"پیشخوان",
    icon: MdDashboard,
    component:Dashboard,
    layout:'/student',
    show:true
},
{
    path:'/userprofile',
    name:"پروفایل",
    icon:FaUserAlt,
    component:Profile,
    layout:'/student',
    show:true

}
,{
    path:'/courses',
    name:"دوره های ثبت نامی",
    icon: MdClass,
    component:ShowCourses,
    layout:'/student',
    show:true
},{
    path:'/dashboard',
    name:"دوره های  آنلاین",
    icon: MdSignalCellularConnectedNoInternet4Bar,
    component:Dashboard,
    layout:'/student',
    show:true
},
{
    path:'/dashboard',
    name:"رزرو ها",
    icon: GoBookmark,
    component:Dashboard,
    layout:'/student',
    show:true
}
,{
    path:'/prefactor',
    name:"پیش فاکتور ها",
    icon: FaFileInvoiceDollar,
    component:Prefactor,
    layout:'/student',
    show:true
},{
    path:'/dashboard',
    name:"مالی",
    icon: AiFillDollarCircle,
    component:Dashboard,
    layout:'/student',
    show:true
},{
    path:'/dashboard',
    name:"پیام ها",
    icon: AiOutlineMessage,
    component:Dashboard,
    layout:'/student',
    show:true
},{
    path:'/logout',
    name:"خروج",
    icon: GiExitDoor,
    component:Logout,
    layout:'/student',
    show:true
}];

export default routes;