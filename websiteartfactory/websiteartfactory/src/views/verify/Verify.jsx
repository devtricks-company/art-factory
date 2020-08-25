import React, { useState } from "react";
import { useEffect } from "react";
import queryString from "query-string";
import { useContext } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from 'graphql-tag';

const Verify = (props) => {
  const [studentName, setStudentName] = useState("");
  const [classCode, setClassCode] = useState("");
  const [courseTitle, setCourseTitle] = useState("");
  const [price, setPrice] = useState("");
  const [authority,setAuthority] = useState('');
  const [studentID,setStudentID]  = useState('');
  const [courseID,setCourseID] = useState('');
  const [detailID,setDetialID] = useState('');
  const [refID,setRefID] = useState('');
  const queryDetails = queryString.parse(props.location.search);

  const [verifyToPayment,{loading:verifyLoading}] = useMutation(VERIFY_PAYMENT,{
    update(_,result){

    },
    onError(err){
      console.log(err.graphQLErrors[0].message);
    },
    variables:{amount:parseInt(queryDetails.amount),authority:queryDetails.Authority,courseID:queryDetails.courseID,detailID:queryDetails.detailID,studentID:queryDetails.studentID,prefactorID:queryDetails.prefactorID},
    onCompleted(data){

        setRefID(data.verifyToPayment)
    }
  })

 

  useEffect(() => {
    const queryDetails = queryString.parse(props.location.search);
    setStudentName(
      queryDetails.studentName + " " + queryDetails.studentLastName
    );
    setClassCode(queryDetails.classcode);
    setCourseTitle(queryDetails.courseName);
    setPrice(queryDetails.amount);
    setAuthority(queryDetails.Authority);
    setStudentID(queryDetails.studentID);
    setCourseID(queryDetails.courseID);
    setDetialID(queryDetails.detailID);
    verifyToPayment()
    //addRegisterdCourse();


  }, []);

  const referToPersonal = e => {
    props.history.push('/student/userprofile');
  }
  return (
    <div className="verify">
      <div className="verify__container">
        <div class="svg-box">
          <svg class="circular green-stroke">
            <circle
              class="path"
              cx="75"
              cy="75"
              r="50"
              fill="none"
              stroke-width="5"
              stroke-miterlimit="10"
            />
          </svg>
          <svg class="checkmark green-stroke">
            <g transform="matrix(0.79961,8.65821e-32,8.39584e-32,0.79961,-489.57,-205.679)">
              <path
                class="checkmark__check"
                fill="none"
                d="M616.306,283.025L634.087,300.805L673.361,261.53"
              />
            </g>
          </svg>
        </div>
        <h3>ثبت نام شما در این دوره با موفقیت انجام شد</h3>
        <div className="container">
            <div className="table-information">
          <table class="table table-striped mt-5">
            
            <tbody>
              <tr>
               
                <td>نام و نام خانوادگی :</td>
                <td>{studentName}</td>
               
              </tr>
              <tr>
                
                <td>نام دوره </td>
                <td>{courseTitle}</td>
              
              </tr>
              <tr>
               
                <td>کد کلاس</td>
                <td>{classCode}</td>
            
              </tr>
              <tr>
               
                <td> قیمت پرداختی</td>
                <td>{price} تومان</td>
            
              </tr>
              <tr>
              
                <td>شماره ارجاع</td>
                <td>{refID}</td>
            
              </tr>
            </tbody>
          </table>
          </div>
          <div className="w-100">
            <button className="btn btn-success " onClick={referToPersonal}>تکمیل فرایند ثبت نام</button>
          </div>
        </div>
      </div>
    </div>
  );
};
const ADD_REGISTERD_COURSE = gql`
mutation  addRegisterdCourse($studentID:ID!,$detailsID:ID!,$courseID:ID!,$price:String!,$Authority:String!) {
  addRegisterdCourse(studentID:$studentID,courseID:$courseID,detailsID:$detailsID,price:$price,Authority:$Authority){
    id
    studentID
    courseID
    detailID
    price
    Authority
    
  }
}


`;

const VERIFY_PAYMENT = gql`
mutation verifyToPayment($amount:Int!,$authority:String!,$courseID:String!,$detailID:String!,$studentID:String!,$prefactorID:ID!){
  verifyToPayment(amount:$amount,authority:$authority,courseID:$courseID,detailID:$detailID,studentID:$studentID,prefactorID:$prefactorID)
}
`;


export default Verify;
