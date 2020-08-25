import React, { useContext } from "react";
import logo from "../../assets/img/logo.png";
import NavbarItem from "./NavbarItem";
import AuthContext from "../../context/auth/authContext";
import menuLogo from "../../assets/img/logo.png";

const Navbar = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext;
  return (
    // <div className="new-navbar">
    //   <div className="container">
    //     <div className="text-center middle-logo">
    //       <a href="#">
    //         <img src={menuLogo} alt="logo" />
    //       </a>
    //     </div>
    //     <div>
    //       <div>
    //         <ul>
    //           <li>
    //             <a href="/#/allcourse">دوره های آموزشی</a>
    //           </li>
    //           <li>
    //             <a href="#"> آموزش آنلاین </a>
    //           </li>
    //           <li className="dropdown">
    //             <a href="#"> کارخانه ما
    //             <div className="factory-dropdown">
    //               <div className=" text-right">
    //                 <a href="#">درباره آرت فکتوری</a>
    //               </div>
    //               <div className=" text-right">
    //                 <a href="#"> لحظات آرت فکتوری</a>
    //               </div>
    //             </div></a>

    //           </li>
    //           <li>
    //               <a href="#">کلاب آرت فکتوری</a>
    //           </li>
    //           <li>
    //             {!user ? (
    //               <a href="/#/login"> ورود / ثبت نام </a>
    //             ) : (
    //               <a href="/#/student">
    //                 {user.name} {user.lastName}
    //               </a>
    //             )}
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <nav className="navbar navbar-expand-lg navbar-dark new-navbar">
      <div className="container">
        <a href="/" className="navbar-brand">
          <img src={menuLogo} alt="logo" />
          
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav">
            <li className="nav-item">
              <a href="/#/allcourse" className="nav-link">دوره های آموزشی</a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link"> آموزش آنلاین </a>
            </li>
            <li className="nav-item dropdown ">
              <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                               کارخانه ما
                             </a>
                             <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">درباره آرت فکتوری</a>
          <a class="dropdown-item" href="#"> لحظات آرت فکتوری</a>
           </div>
            </li>
            <li className="nav-item">
              <a href="https://artfactoryedu.com/under" className="nav-link">کلاب آرت فکتوری</a>
            </li>
            <li className="nav-item">
              {!user ? (
                <a className="nav-link" href="/#/login"> ورود / ثبت نام </a>
              ) : (
                <a className="nav-link" href="/#/student">
                  {user.name} {user.lastName}
                </a>
              )}
            </li>
          </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
