import React, { useState, useContext,useEffect } from "react";
import artfactoryLogo from "../../assets/img/logo.png";
import logoArt from "../../assets/img/poster.jpg";
import ReactCodeInput from 'react-verification-code-input';
import axios from 'axios';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import AuthContext from '../../context/auth/authContext';
import AlertMessage from "../../components/alertmessage/AlertMessage";

const Login = (props) => {
    const authContext = useContext(AuthContext);
    const {loginStudentContext} = authContext;
  const [mobile, setMobile] = useState("");
  const [showVerificatoin,setVerification] = useState(false); 
  const [codeState,setCodeState] = useState(0); 
  const [gettingCode,setGettingCode] = useState(0);
  const [AlertState,setAlertState] = useState({
    open:false,
    message:'',
    color:''
})
const [Error,setError] = useState(false)


  const changeMobileHandler = (e) => {
    setMobile(e.target.value);
  };

 useEffect(() => {
    window.scrollTo(0,0);
 },[]);



  const [loginStudent , {loading}] = useMutation(LOGIN_STUDENT,{
    async  update(_,result){
        loginStudentContext(result.data.loginStudent);
        
      },
      onError(err){
        setError(true);
        setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
        setTimeout(() => {
          setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
       }, 3000);
      
       props.history.push('/register');
       
       
       
      },
      variables:{mobile}
  })
  const clickLoginHandler = async e => {
    
   const check = await  loginStudent();
   console.log(check);
    if(check){
      const code = Math.floor(1000 + Math.random() * 9000);

      
        setCodeState(code);
        setVerification(true);
        const smsData =  await axios.get(`https://api.kavenegar.com/v1/764450764736442B744C466A705552766C64554E4C3578764F4676774D2F782F7A79584D733735522B68593D/verify/lookup.json?receptor=${mobile}&token=${code}&template=artfactory`)
    }
    
   
    




    
  }
  const changeComplete = value => {
      setGettingCode(value);
  }
  const checkVerificationHandler = e => {
      if( codeState == gettingCode  ){
        loginStudent();
        setAlertState({open:true,message:"کاربر گرامی ثبت نام شما با موفقیت انجام شد. حالا می توانید در دوره مورد نظر ثبت نام کنید ",color:'green'});
        setTimeout(() => {
          setAlertState({open:true,message:"کاربر گرامی ثبت نام شما با موفقیت انجام شد. حالا می توانید در دوره مورد نظر ثبت نام کنید ",color:'green'});
          props.history.push('/');
     

        }, 5000);

       

      }else{
        setAlertState({open:true,message:"شماره تایید معتبر نمی باشید",color:'red'});
        setTimeout(() => {
          setAlertState({open:false,message:"شماره تایید معتبر نمی باشید",color:'red'});
       }, 3000);
      }
  }
  return (
    <div className="login">
      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-12 col-lg-5 enter-container">
            
              {showVerificatoin ?  <div className="w-100 text-center code-wrapper" >
                  <h5>کد تایید را وارد کنید</h5>
                  <ReactCodeInput fields={4} className="code-input" onComplete={changeComplete} />
                  <button className="btn mt-4 " onClick={checkVerificationHandler}>تایید کد</button>
              </div> :   <div className="pr-4">
                <div>
                  <div className="text-right ">
                  
                  </div>
                  <p className="login-p"> ورود به آرت فکتوری</p>
                </div>
                <div className="row w-100">
                  <div className="col-12 mt-4 text-right w-100">
                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      className="form-control p-4"
                      placeholder=" شماره موبایل"
                      value={mobile}
                      onChange={changeMobileHandler}
                    />
                  </div>
                  <div className="text-left w-100 ml-3 mt-3">
                    <button className="btn input-button" onClick={clickLoginHandler}> ورود به سایت</button>
                  </div>
                </div>
              </div>}
            </div>

            <div className="col-12 col-lg-7 d-none d-lg-block  register-image">
              <img src={logoArt} alt="" width="500px" />
            </div>
          </div>
        </div>
      </div>
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
    </div>
  );
};
const LOGIN_STUDENT = gql`
mutation  loginStudent($mobile:String!) {
  loginStudent(mobile:$mobile){
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
    Gender
    addresss
    reserveID
    courses
    finance
    preFactor
    createAt
    active
    token
    
  }
}


`;
export default Login;
