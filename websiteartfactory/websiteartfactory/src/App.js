import React from "react";
import Layout from "./components/layout/Layout";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import SingleCoures from "./pages/singleCourse/SingleCoures";
import Register from "./pages/registerPage/Register";
import AuthState from "./context/auth/AuthState";
import Student from "./pages/student/Student";
import Login from "./pages/Logins/Login";
import Verify from "./views/verify/Verify";
import AllCourse from "./pages/allcourses/AllCourse";
import Club from "./pages/club/Club";
import AboutUs from "./pages/aboutus/AboutUs";
import CourseDetailsPage from "./pages/coursedetails/CourseDetailsPage";
import FinalHome from "./pages/finalhome/FinalHome";
import Teacher from "./pages/Teacher/Teacher";
import Contact from "./pages/Contact/Contact";
import MomentWeb from "./pages/momentWeb/MomentWeb";

function App() {
  return (
    <AuthState>
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={FinalHome}  />
          <Route exact path='/course/:id' component={CourseDetailsPage} />
          <Route exact path="/register" component={Register} />
          <Route  path='/student' component={Student} />
          <Route  path='/login' component={Login} />
          <Route path="/verify" component={Verify} />
          <Route path="/allcourse" component={AllCourse} />
          <Route path='/club' component={Club} />
          <Route path='/about' component={AboutUs} />
          <Route path='/teacher/:id' component={Teacher} />
          <Route path="/contact" component={Contact} />
          <Route path="/moment" component={MomentWeb} /> 

    
        </Switch>
      </Layout>
    </Router>
    </AuthState>
  );
}

export default App;
