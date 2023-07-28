import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const NavMenu=()=> {
  
    return (
      <header>
            <nav>
                <Link to='/'>Home</Link>
                <NavLink to='/register'>Registration</NavLink>
                <NavLink to='/login'>Login</NavLink>
                <NavLink to='/configuration'>Configuration</NavLink>
            </nav>
      </header>
    );
  
}
export default NavMenu;
