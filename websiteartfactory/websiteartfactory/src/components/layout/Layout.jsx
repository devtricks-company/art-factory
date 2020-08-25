import React from 'react'
import Navbar from '../navbar/Navbar'
import Footer from '../footer/Footer'
import FinalAddressBar from '../finalAddressbar/FinalAddressBar'


const Layout = ({children}) => {
    return (
        <div className="layout">
           <FinalAddressBar />
           {children}
           <Footer />
        </div>
    )
}

export default Layout
