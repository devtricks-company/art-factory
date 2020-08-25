import React from 'react';
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import Admin from './pages/Admin';
import 'antd/dist/antd.css';
import Login from './pages/Login';
import AuthState from './context/auth/AuthState';
function App() {
  return (
    <AuthState>
    <Router basename="/artgraph">
      <Switch>
        <Route  path='/admin' component={Admin} />
        <Route path="/login" component={Login} />
        <Redirect  from="/" to="/admin" />
      </Switch>
    </Router>
    </AuthState>
  );
}

export default App;
