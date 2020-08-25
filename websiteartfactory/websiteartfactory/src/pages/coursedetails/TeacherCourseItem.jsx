import React, { useState, useContext } from 'react'
import { TableRow, TableCell, Collapse } from '@material-ui/core'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag';
import TeachersDetails from './TeachersDetails';
import { digitsArToFa, digitsArToEn, digitsEnToFa, digitsFaToEn, addCommas } from "persian-tools2"

import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertMessage from "../../components/alertmessage/AlertMessage";
import { GET_ALL_PREFACTOR_STUDENT } from '../../graphql';

const TeacherCourseItem = (props) => {
  const { teachers, details } = props;

  const [AlertState, setAlertState] = useState({
    open: false,
    message: '',
    color: ''
  })
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  const [addPrefactor, { loading }] = useMutation(ADD_PREFACTOR_HANDLER, {
    update(_, result) {
      console.log(result);
    },
    onError(err) {
      setAlertState({ open: true, message: err.graphQLErrors[0].message, color: 'red' });
      setTimeout(() => {
        setAlertState({ open: false, message: err.graphQLErrors[0].message, color: 'red' });
      }, 3000);
    },
    variables: { courseID: props.match.params.id, detailsID: details.id, studentID: user && user.id },
    refetchQueries: [{ query: GET_ALL_PREFACTOR_STUDENT, variables: { studentID: user && user.id } }]
  })
  const addPrefactorHanlder = () => {
    if (user) {
      addPrefactor();
      setAlertState({ open: true, message: "پیش فاکتور با موفقیت انجام شد", color: 'green' });
      setTimeout(() => {
        setAlertState({ open: false, message: "پیش فاکتور با موفقیت انجام شد", color: 'green' });
        props.history.push('/student/prefactor');

      }, 3000);

    } else {
      props.history.push('/login');
    }
  }

  const [addReserve,{loading:reserveLoading}] = useMutation(ADD_RESERVE,{
    update(_,result){

    },
    onError(err){
       setAlertState({ open: true, message: err.graphQLErrors[0].message, color: 'red' });
      setTimeout(() => {
        setAlertState({ open: false, message: err.graphQLErrors[0].message, color: 'red' });
      }, 3000);
    },
    variables:{studentID:user && user.id,courseID:props.match.params.id,detailsID: details.id}
  })
  const clickReservHanlder = e =>{
    if(user){
      addReserve();
      setAlertState({ open: true, message: "نام شما با موفقیت در لیست رزرو این درس ثبت شد", color: 'green' });
      setTimeout(() => {
        setAlertState({ open: false, message: "نام شما با موفقیت در لیست رزرو این درس ثبت شد", color: 'green' });
        

      }, 3000);
    }else{
      props.history.push('/login');
    }
    
  }
  return (
    <>
      <TableRow >
        <TableCell>
          {teachers && teachers.map(teacher =>
            <TeachersDetails key={teacher} teacherID={teacher} />
          )}
        </TableCell>
        <TableCell>
          <p>{details && details.classcode}</p>
          <p>{digitsEnToFa(details && details.startDate)}</p>
          <p>{digitsEnToFa(details && details.days)}</p>
          <p>{digitsEnToFa(details && details.duration)}</p>
          <p> قیمت: {digitsEnToFa(addCommas(details && details.price))} تومان</p>
          <p>{details && details.description}</p>


        </TableCell>
        <TableCell>
          <div className="course-register-area">
            <button className="btn btn-success r-s" onClick={addPrefactorHanlder}>ثبت نام</button>
          </div>
          <div className="course-register-area">
            <button className="btn btn-warning" onClick={clickReservHanlder}>رزرو دوره </button>
          </div>
        </TableCell>


      </TableRow>

      {/* <TableRow className="mobile-table w-100 d-block d-lg-none text-center">

        <div className="row w-100 text-center" style={{
    transform: "translateX(-70px)"
    }} >

          <div className="col-12 text-center mx-auto text-light">
            {teachers && teachers.map(teacher =>
              <TeachersDetails key={teacher} teacherID={teacher} />
            )}
            <p className="mt-3 text-light">{details && details.startDate}</p>
            <p className="mt-3 text-light">{details && details.days}</p>
            <p className="mt-3 text-light">{details && details.duration}</p>
            <p className="mt-3 text-light">{details && details.description}</p>
          </div>
        </div>




      </TableRow> */}
      {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
    </>
  )
}

const ADD_PREFACTOR_HANDLER = gql`
mutation  addPrefactorHanlder($courseID:ID!,$detailsID:ID!,$studentID:ID!) {
addPrefactor(courseID:$courseID,detailsID:$detailsID,
  studentID:$studentID){
    id
    courseID
    detailsID
    studentID
    createAt
    payment
    course{
      id
      title
      picture
    }
    detail{
      id
      classcode
      startDate
      days
    
    }
  

}
}

`;

const ADD_RESERVE = gql`
mutation addReserve($studentID:ID!,$courseID:ID!,$detailsID:ID!) {
  addReserve(studentID:$studentID,courseID:$courseID,detailsID:$detailsID){
    id
    studentID
    courseID
    detailsID
    createAt
  }
}



`;

export default withRouter(TeacherCourseItem)
