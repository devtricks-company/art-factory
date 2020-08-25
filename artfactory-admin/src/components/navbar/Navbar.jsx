import React from "react";
import { IconButton } from "@material-ui/core";
import { GoThreeBars } from "react-icons/go";
import { IoIosNotifications } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";

const Navbar = ({changeSide}) => {
    

  return (
    <div id="navbar-wrapper">
      <div className="container-fluid">
        <ul id="navbar">
          <li>
            <IconButton onClick={() => changeSide()}>
              <GoThreeBars />
            </IconButton>
            <span className="navbar__dashboard">پیشخوان</span>
          </li>
          <li className="navbar__logo">
            <a href="#" className="">
              Artfactory
            </a>
          </li>
          <li className="navbar__setting">
            <IconButton>
              <IoIosNotifications />
            </IconButton>
            <IconButton>
              <FaUserCircle />
            </IconButton>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
