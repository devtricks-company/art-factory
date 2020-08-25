import React from 'react'
import Layout from '../components/layout/Layout';
import routes from '../routes';
import {Switch,Route,Redirect} from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../context/auth/authContext';

const swithRoutes = () => (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout == "/admin") {
          console.log("test");
          return (
            <Route
              path={prop.layout + prop.path}
              component={prop.component}
              key={key}
            />
          );
        }
        return null;
      })}
      <Redirect from="/admin" to="/admin/dashboard" />
    </Switch>
  );
  

const Admin = (props) => {
  const authContext = useContext(AuthContext);
  const {user} = authContext;
    return (
        <div id="admin">
          <>
         {user ? <Layout>
             {swithRoutes()}
           </Layout> : props.history.push('/login')}

          </>
           
        </div>
    )
}

export default Admin
