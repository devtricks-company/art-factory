import React from 'react'

const NavbarItem = ({text, link ='#' , children}) => {
    return (
      
            <li className="nav-item">
                <a href={link} className="nav-link">
                    {text}
                </a>
            </li>
       
    )
}

export default NavbarItem
