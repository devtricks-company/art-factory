import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import ExpandSideBar from '../sidebar/ExpandSideBar';
import {CSSTransition} from 'react-transition-group'

const Layout = ({children}) => {

    const [sidebar,setSidebar]= useState(true);
    const [expandSide,setExpandSide] = useState(false);

    const changeSideHandler = () => {
        setSidebar(!sidebar);
       
    }

    const showExpandSide= () =>{
        setExpandSide(true);
    }

    const showSidebar = () =>{
        setSidebar(true);
      
    }

    return (
        <div id="layout">
            <Navbar changeSide={changeSideHandler} />
            <div className="wrapper">

            <CSSTransition
                in={sidebar}
                timeout={500}
                classNames='sidebar-'
                unmountOnExit={true}
                appear={true}
                onExited={() => showExpandSide()}
                onEnter={() => setExpandSide(false)}

            >
                    <Sidebar />
            </CSSTransition>
            <CSSTransition
            in={expandSide}
            timeout={500}
            classNames="expand-side-"
            mountOnEnter={true}
            unmountOnExit={true}
            onExited={() => showSidebar()}
            >
               <ExpandSideBar />
            </CSSTransition>
            <div className="layout__content">
            {children}
            </div>
            </div>
            
            
        </div>
    )
}

export default Layout
