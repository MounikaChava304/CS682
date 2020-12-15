import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Landing from "../components/layout/Landing";
import Axios from "axios";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);


  const openTemp = async() => {
    console.log("open temp")
    Axios({
      method: "GET",
      url: "http://localhost:5000/api/rentals/dashboard",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      console.log(res.data);
    });
  }

  return (
    <>
      <nav className='navbar'> 
        <div className='navbar-container'>
           <Link to='/' className='navbar-logo' onClick={handleClick}>
            Adeborna Rentals
            <i class='fab fa-typo3' />
          </Link> 
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            
            <li className='nav-item'  onClick={handleClick}> 
              <Link
                to='/Dashboard'
                className='nav-links'
                onClick={openTemp}
              >
                RentalCalculator
              </Link>
            </li>  
             <li className='nav-item'>
              <Link
                to='/cal2'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                cal2
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cal3'
                className='nav-links'
                onClick={closeMobileMenu}
              >
               cal3
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/cal4'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                cal4
              </Link>
            </li>

            <li>
              <Link
                to='/sign-up'
                className='nav-links-mobile'
                onClick={Landing}
              >
                Sign Up
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle='btn--outline'>SIGN UP</Button>}
        </div> 
       </nav>
    </>
  );
}

export default Navbar;
