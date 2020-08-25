import React from 'react';
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import { useState } from 'react';

const MenualRegister = (props) => {

    const [mobile,setMobile] = useState('');
    const [checkStudent,{loading}] = useMutation(CHECK_STUDENT,{
        update(_,result){
            props.history.push(`/admin/updateStudentInfo/${result.data.checkStudent.id}`)
        },
        onError(err){
           console.log(err.graphQLErrors[0].message);
        },
        variables:{mobile}
    })
    const clickcheckHanlder = () => {
        checkStudent();
    }

    const changeMobileHandler = e => {
        setMobile(e.target.value);
    }

    return (
        <div class="manual-register" >
           <div className="container">
           <div className="card">
                <div className="card-body">
                    <input type="text" name="mobile" id="mobile" class="form-control" placeholder="لطفا شماره موبایل را وارد کنید"
                    value={mobile}
                    onChange={changeMobileHandler}
                    />
                    <div className="form-group mt-3">
                        <button className="btn btn-info" onClick={clickcheckHanlder}>بررسی شماره</button>
                    </div>
                </div>
            </div>
           </div>
        </div>
    )
}

const  CHECK_STUDENT = gql`
mutation checkStudent($mobile:String!) {
  checkStudent(mobile:$mobile){
    id
    mobile
   
  }
}


`;
export default MenualRegister
