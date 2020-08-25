import React,{useContext} from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import routes from '../../routes';
import AuthContext from '../../context/auth/authContext';
import PanelLayout from '../../components/panelLayout/PanelLayout';

const swithRoutes = () => (
    <Switch>
      {routes.map((prop, key) => {
        if (prop.layout == "/student") {
         
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
      <Redirect from="/student" to="/student/dashboard" />
    </Switch>
  );
  
const Student = (props) => {
    const authContext = useContext(AuthContext);
    const {user} = authContext;

    return (
      <>
      {user ? 
        <PanelLayout>
           {swithRoutes()}
        </PanelLayout>
      :  props.history.push('/login')}
        

     </>   
    )
}

export default Student
