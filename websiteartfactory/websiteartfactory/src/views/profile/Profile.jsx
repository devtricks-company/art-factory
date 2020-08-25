import React from 'react'
import { useContext } from 'react'
import AuthContext from '../../context/auth/authContext';
import { digitsArToFa, digitsArToEn, digitsEnToFa, digitsFaToEn , addCommas } from "persian-tools2";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import { useState } from 'react';
import AlertMessage from "../../components/alertmessage/AlertMessage";
import { useEffect } from 'react';


const Profile = (props) => {
    const  [ profile,setProfile] = useState({
        nationCode:'',
        email:'',
        educationMajor:'',
        tel:'',
        address:'',
        instaID:''
    });
    const [AlertState,setAlertState] = useState({
        open:false,
        message:'',
        color:''
    })
    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const [addProfile,{loading}] = useMutation(ADD_PROFILE,{
        update(_,result){
                console.log(result.data.addProfile);
        },
        onError(err){
            setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
            setTimeout(() => {
              setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
           }, 3000);
        }
        ,
        variables:{id:user.id,...profile}
    });

    useEffect(() => {
        window.scrollTo(0,800);
    },[])

    const changeProfileHandler = e => {
        setProfile({...profile,[e.target.name]:e.target.value});
    }

    const clickProfileHanlderSave = e => {
        addProfile();
        setAlertState({open:true,message:"ثبت نام  با موفقیت انجام شد",color:'green'});
        setTimeout(() => {
           setAlertState({open:false,message:"ثبت نام با موفقیت انجام شد",color:'green'});
           props.history.push('/student/courses')

        }, 3000);
    }
    return (
        <div className="profile w-75 mx-auto">
           <div className="row">
               <div className="col-12 col-lg-6 text-right name">
                   <span>  نام و نام خانوادگی : </span>
                   <span>{user.name + " " + user.lastName}</span>
               </div>
               <div className="col-12 col-lg-6 text-right mobile">
                   <span>     شماره موبایل : </span>
                   <span>{digitsEnToFa( user.mobile) }</span>
               </div>
               <div className="col-12 col-lg-6 text-right nation mt-4">
                   <input type="text" name="nationCode" id="nationCode"  placeholder="کد ملی را وارد کنید"  className="form-control p-4"
                   value={profile.nationCode}
                   onChange={changeProfileHandler}
                   />
                   
               </div>
               <div className="col-12 col-lg-6 text-right nation mt-4">
                   <input type="email" name="email" id="email"  placeholder="ایمیل را  وارد کنید"  className="form-control p-4"
                   value={profile.email}
                   onChange={changeProfileHandler}
                   />
               </div>
               <div className="col-12 col-lg-6 text-right nation mt-4">
                   <input type="text" name="educationMajor" id="educationMajor"  placeholder="رشته تحصیلی را  وارد کنید"  className="form-control p-4"
                   value={profile.educationMajor}
                   onChange={changeProfileHandler}
                  />
               </div>
               <div className="col-12 col-lg-6 text-right nation mt-4">
                   <input type="email" name="tel" id="tel"  placeholder="شمار ثابت را  وارد کنید"  className="form-control p-4"
                   value={profile.tel}
                   
                   onChange={changeProfileHandler}/>
               </div>
               <div className="col-12 text-right nation mt-4">
                   <textarea name="address" id="address" className="form-control" rows="5" placeholder="آدرس را وارد کنید (برای دوره های آنلاین فقط  وارد کردن نام شهر کافی می باشد   )"
                   value={profile.address}
                   onChange={changeProfileHandler}
                   ></textarea>
               </div>
               <div className="col-12 text-right nation mt-4">
                   <label htmlFor="instaID">آی دی اینستاگرام خود را وارد کنید</label>
                   <input type="text" name="instaID" id="instaID" className="form-control" placeholder="برای دورهای که از طریق اینستاگرام برگزار می گردد وارد کردن آی دی اینستاگرام خود الزامی می باشد" value={profile.instaID} onChange={changeProfileHandler}/>
               </div>

           </div>
           <div className="text-center mt-5 ">
               <button className="btn btn-success px-5 py-2" onClick={clickProfileHanlderSave}>ذخیره مشخصات</button>
           </div>
           {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
        </div>
    )
}
const ADD_PROFILE = gql`
mutation addProfile($id:ID!,$nationCode:String!,$email:String!,$educationMajor:String!,$tel:String!,$address:String!,$instaID:String) {
  addProfile(id:$id,nationCode:$nationCode,email:$email,educationMajor:$educationMajor,tel:$tel,address:$address,instaID:$instaID){
    id
    studentNumber
    name
    password
    lastName
    nationCode
    mobile
    educationLevel
    email
    educationMajor
    tel
    addresss
    reserveID
    courses
    finance
    preFactor
    createAt
    active
    token
    Gender
    instaID
  }
}

`;
export default Profile
