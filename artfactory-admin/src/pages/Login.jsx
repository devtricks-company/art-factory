import React from 'react'
import { useState } from 'react'
import { useContext } from 'react';
import AuthContext from '../context/auth/authContext';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

const Login = (props) => {

    const authContext = useContext(AuthContext);
    const {loginStudentContext} = authContext;
    const [admin, setAdmin] = useState({
        mobile: '',
        password: ''
    });

    const [loginAdmin,{loading}] = useMutation(LOGIN_ADMING,{
        update(_,result){
            loginStudentContext(result.data.loginAdmin);
        },
        onError(err){
            console.log(err.graphQLErrors[0].message);
        },
        variables:{mobile:admin.mobile,password:admin.password}
    })
    const changeLoginHanldler = e => {
        setAdmin({ ...admin, [e.target.name]: e.target.value });
    }

    const clickHanlderLogin = e => {
       loginAdmin();
       props.history.push('/admin');
       
    }
    return (
        <div className="login">
            <div className="container">

                <div className="card">
                    <div className="card-body">
                        <input type="text" name="mobile" id="mobile"
                            value={admin.mobile}
                            onChange={changeLoginHanldler}
                            className="form-control"
                            placeholder="شماره موبایل را وارد کنید"
                        />

                        <input type="password"  name="password" id="password"
                            value={admin.password}
                            onChange={changeLoginHanldler}
                            className="form-control mt-4"
                            placeholder="کلمه عبور را وارد کنید "
                        />

                        <button className="btn btn-success btn-block mt-3" onClick={clickHanlderLogin}> ورود</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

const LOGIN_ADMING = gql`
mutation  loginAdmin($mobile:String!,$password:String!) {
  loginAdmin(mobile:$mobile,password:$password){
    id
    name
    mobile
    password
    active
    token
    
  }
}

`;
export default Login
