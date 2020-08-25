import React, { useContext,useState } from 'react';
import {FaCalendarCheck , FaCalendarAlt ,FaHashtag,FaMapMarkerAlt} from 'react-icons/fa';
import { digitsArToFa, digitsArToEn, digitsEnToFa, digitsFaToEn , addCommas } from "persian-tools2"
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {withRouter} from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AlertMessage from "../../components/alertmessage/AlertMessage";
import {GET_ALL_PREFACTOR_STUDENT} from '../../graphql';

const DetailsCourseItem = (props) => {

    const {detail} = props;
    const [AlertState,setAlertState] = useState({
        open:false,
        message:'',
        color:''
    })
    const authContext = useContext(AuthContext);
    const {user} = authContext;
    const [addPrefactor,{loading}] = useMutation(ADD_PREFACTOR_HANDLER,{
        update(_,result){
              console.log(result);  
        },
        onError(err){
            setAlertState({open:true,message:err.graphQLErrors[0].message,color:'red'});
            setTimeout(() => {
              setAlertState({open:false,message:err.graphQLErrors[0].message,color:'red'});
           }, 3000);
        },
        variables:{courseID:props.match.params.id,detailsID:detail.id,studentID:user && user.id},
        refetchQueries:[{query:GET_ALL_PREFACTOR_STUDENT,variables:{ studentID: user && user.id}}]
    })
    const addPrefactorHanlder = () => {
        if(user){
            addPrefactor();
            setAlertState({open:true,message:"پیش فاکتور با موفقیت انجام شد",color:'green'});
        setTimeout(() => {
           setAlertState({open:false,message:"پیش فاکتور با موفقیت انجام شد",color:'green'});
          
           props.history.push('/student/prefactor');

        }, 3000);

        }else{
            props.history.push('/login');
        }
    }
    return (
        <div className="details-course-item-content">
            <div className="header-details">
                <p>مشخصات کلاس</p>
            </div>
            <div className="card mb-5">
                <div className="card-body">
                    <h6>  <FaHashtag style={{color:'yellow'}}  />  <span> کد کلاس :  { digitsEnToFa(detail.classcode) }</span></h6>
                    <h6 className="mt-4">  <FaCalendarCheck style={{color:'yellow'}}  />  <span>   { digitsEnToFa(detail.startDate) }</span></h6>
                    <h6 className="mt-4">  <FaCalendarAlt style={{color:'yellow'}}  />  <span>   { digitsEnToFa(detail.days) }</span></h6>
                    <h6 className="mt-4">  <FaMapMarkerAlt style={{color:'yellow'}}  />  <span>  آرت فکتوری </span></h6>
                    
                    <h6 className="mt-4">    <span>  {detail.description} </span></h6>
                </div>
                <h3 className="price-details mt-4">   {digitsEnToFa(addCommas(detail.price))} تومان </h3>
                <div>
                    {detail.register &&   <button className="btn btn-block btn-success p-3" onClick={addPrefactorHanlder}>ثبت نام</button> }
                  
                </div>
                <div>
                    {detail.reserve && <button className="btn btn-block btn-secondary mt-2 p-3"> رزرو</button> }
                    
                </div>
            </div>
            {AlertState.open ? (<AlertMessage color={AlertState.color} message={AlertState.message} open={AlertState.open} />) : null}
        </div>
    )
}
const  ADD_PREFACTOR_HANDLER = gql`
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
export default withRouter(DetailsCourseItem); 
