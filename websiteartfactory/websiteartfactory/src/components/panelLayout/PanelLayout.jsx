import React, { useContext } from 'react'
import AuthContext from '../../context/auth/authContext';
import routes from '../../routes';
import {Link} from 'react-router-dom';

const PanelLayout = ({children}) => {

    const authContext = useContext(AuthContext);
    const {user} = authContext;
    return (
        <div className="panel-layout">
            <div className="row w-100 m-0 p-0">
                <div className="col-12 col-lg-2 sidebar">
                        <div className="sidebar__header">
                                <img src="http://artfactoryedu.com/artgraph/static/media/avatar.1dbedcae.webp"  width="100" alt=""/>
                                <h5 className="mt-4">{user.name + " " + user.lastName}</h5>

                        </div>
                        <div className="sidebar__menu">
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
                <div className="col-12 col-lg-10 ">
                        {children}
                </div>
            </div>
            
        </div>
    )
}

export default PanelLayout
