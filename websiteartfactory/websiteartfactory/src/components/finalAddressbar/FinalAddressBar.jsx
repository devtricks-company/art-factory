import React from 'react'
import { useContext } from 'react'
import AuthContext from '../../context/auth/authContext'

const FinalAddressBar = () => {
    const authContext = useContext(AuthContext);
    const {user} = authContext;
    return (
        <div className="final-addressbar" >
            <div className="container">
                <a href="#" className="nav-barnd">آرت فکتوری</a>
                <ul>
                    <li className="d-none d-lg-block"><p>فارس، شیراز</p></li>
                    <li className="d-none d-lg-block"><a href="#">36231541 (711) </a></li>
                    <li><a href={user ? "/#/student" : "/#/login"}  className="final-addressbar-login">{user ? 'پنل کاربری' : 'ورود / ثبت نام'}</a></li>
                    <li className="d-none"><a href="#">بلاگ</a></li>
                    <li className="d-none d-lg-block"><a href="/#/contact">تماس با ما</a></li>
                </ul>
            </div>
        </div>
    )
}

export default FinalAddressBar
