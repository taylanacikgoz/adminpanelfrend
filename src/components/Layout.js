import React from 'react';
import NavMenu from './NavMenu';
import Panteon from '../images/panteon.png';
import { Link } from 'react-router-dom';


const Layout =(props)=> {
   
    return (
        <div>
            <div className="header-top">
                <Link to='/'>
                    <img src={Panteon} alt="panteon"></img>
                </Link>
               
                <NavMenu />
            </div>
            
            {props.children}
            
      </div>
    );
  
}
export default Layout;