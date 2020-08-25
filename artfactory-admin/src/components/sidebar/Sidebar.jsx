import React from "react";
import routes from "../../routes";
import { Link } from "react-router-dom";
import avatar from '../../assets/img/avatar.webp'

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <img src={avatar} alt="" width="100" />
        <h5>امیر محمد آذرباشی</h5>
      </div>
      <div className="sidebar__menu" >
        {routes.map((prop, key) => {
          if (prop.show) {
            return (
              <div key={key} className={`item-menu`}>
                <Link to={prop.layout + prop.path}>
                  {<prop.icon />} <span className='pr-3'> {prop.name}</span>
                </Link>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Sidebar;
