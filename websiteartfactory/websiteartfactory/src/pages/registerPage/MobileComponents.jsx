import React, { useState, useContext } from 'react';
import logoArt from '../../assets/img/poster.jpg';
import artfactoryLogo from '../../assets/img/logo.png'
import gql from 'graphql-tag';
import {useQuery, useMutation} from '@apollo/react-hooks';
import ReactCodeInput from 'react-verification-code-input';
import axios from 'axios';
import AuthContext from '../../context/auth/authContext';
import AlertMessage from "../../components/alertmessage/AlertMessage";
import {withRouter} from 'react-router-dom'

const MobileComponents = (props) => {
    const authContext = useContext(AuthContext);
    const {loginStudentContext} = authContext;
    const [AlertState,setAlertState] = useState({
        open:false,
        message:'',
        color:''
    })
    const [student,setStudent] = useState({
        name:'',
        lastName:'',
        mobile:''
    });

    const [verificationCode,setVerificationCode] = useState('');
    const [getVerification,setGetVerification] = useState('');

    const [showVerification,setShowverification]  = useState(false);
    const [showRegister,setShowRegister] = useState(true);

    const [registerStudent,{loading}]  = useMutation(REGISTER_STUDENT,{
        update(_,result){
               loginStudentContext(result.data.registerStudent)
        },
        onError(err){
            console.log(err.graphQLErrors[0].message);setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
            setTimeout(() => {
              setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
           }, 3000);
        },
        variables:student
    });
    const onChangeStudent = (e) => {
        setStudent({...student,[e.target.name] : e.target.value})
    }
    const clickRegisterHanlder = async e => {
        const code = Math.floor(1000 + Math.random() * 9000);
        setVerificationCode(code);

          const smsData =  await axios.get(`https://api.kavenegar.com/v1/764450764736442B744C466A705552766C64554E4C3578764F4676774D2F782F7A79584D733735522B68593D/verify/lookup.json?receptor=${student.mobile}&token=${code}&template=artfactory`)  
        setShowRegister(false);
        setShowverification(true);
    }

    const clickVerificationHanlder = e =>{
       
        if(verificationCode == getVerification){
            registerStudent();
            setAlertState({open:true,message:"کاربر گرامی ثبت نام شما با موفقیت انجام شد. حالا می توانید در دوره مورد نظر ثبت نام کنید ",color:'green'});
            setTimeout(() => {
                setAlertState({open:true,message:"کاربر گرامی ثبت نام شما با موفقیت انجام شد. حالا می توانید در دوره مورد نظر ثبت نام کنید ",color:'green'});
               props.history.push('/');
    
            }, 3000);
        }else{
            setAlertState({open:true,message:"شماره تایید معتبر نمی باشید",color:'red'});
            setTimeout(() => {
              setAlertState({open:false,message:"شماره تایید معتبر نمی باشید",color:'red'});
           }, 3000);
          }
    }

    const completeChange = value => {
        setGetVerification(value);
    }

    return (
        <div className="register-container-components">
            <div className="card">
                <div className="card-body">
                    <div className="row">
                        <div className="col-12 col-lg-5 enter-container ">
                            {showRegister && (<div className="enter-wrapper p-4">
                                <div>
                                    <div className="text-right d-none mb-5"><img src={artfactoryLogo} alt="" width="80"/> <span className="logo-span">آرت فکتوری</span></div>
                                    <h2 className="register-title">ثبت نام در آرت فکتوری</h2>
                                    <p className="register-des">برای استفاده از خدمات ثبت ‌نام کنید.</p>
                                </div>
                                <div className="row ">
                                    <div className="col-12  col-lg-6">
                                        <input type="text" name="name" id="name" className="form-control p-4" placeholder="نام" 
                                        value={student.name}
                                        onChange={onChangeStudent}
                                        />
                                    </div>
                                    <div className="col-12 mt-3 mt-lg-0 col-lg-6">
                                    <input type="text" name="lastName" id="lastName" className="form-control p-4"  placeholder="نام خانوادگی"
                                    value={student.lastName}
                                    onChange={onChangeStudent}
                                    />
                                    </div>
                                    <div className="col-12 mt-4">
                                    <input type="text" name="mobile" id="mobile" className="form-control p-4"  placeholder=" شماره موبایل"
                                    value={student.mobile}
                                    onChange={onChangeStudent}
                                    
                                    />
                                    </div>
                                    <div className="text-left w-100 ml-3 mt-3">
                                        <button className="btn input-button" onClick={clickRegisterHanlder}>ثبت نام</button>
                                    </div>
                                </div>
                            </div>)}
                            
                            {showVerification &&  <div className="verification-code">
                                <h4>کد تایید را وارد کنید</h4>
                                <ReactCodeInput fields={4}  onComplete={completeChange} />
                                <button className="btn mt-3 btn-block" onClick={clickVerificationHanlder}>تایید</button>
                            </div>}

                        </div>
                        <div className="col-7 d-none d-lg-block register-image">
                            <img src={logoArt} alt="" width="500px"/>
                        </div>
                    </div>
                </div>
            </div>
            {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
        </div>
    )
}


const REGISTER_STUDENT = gql`
mutation  registerStudent($name:String!,$lastName:String!,$mobile:String!) {
  registerStudent(name:$name , lastName:$lastName , mobile:$mobile){
    id
    studentNumber
    lastName
    name
    token
    
  }
}
`;


export default withRouter(MobileComponents); 
