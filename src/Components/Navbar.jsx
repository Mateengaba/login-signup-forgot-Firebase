


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../assets/Logo-bawany.png';

function Navbar() {
  const [click, setClick] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  // console.log(logo);


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const logout = () => {
    localStorage.clear('uid');
    localStorage.clear('email');
  
    window.location.href = "/";
  }


  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          {viewportWidth > 600 ? (
            <img src={logo} alt="logo" />
          ) : (
            <img src={logo} alt="logo" />
          )}
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          {/* <li onClick={scrollToTop} className='nav-item'>
            <Link to='/'  className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li> */}
          
          {/* <li onClick={scrollToTop} className='nav-item'>
            <Link
              to='/Cards'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Products
            </Link>
          </li> */}
        <li className='nav-item'>
            <Link
              to='/Logout'
              className='nav-links'
              onClick={logout}              
            >
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
