import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './Navbar.css';
import Landing from "../components/layout/Landing";
import Dashboard from "../components/dashboard/Dashboard";
//import Rc from "../components/Calulators/RentalCalculator";
import Axios from "axios";
// import Rc from "../../../Backend/rentalcalculator";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { rentalCalculator } from "../../actions/authActions";

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);
  const [temp, setTemp] = useState();

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

//   componentDidMount() {
//     // If logged in and user navigates to Login page, should redirect them to dashboard
//     if (this.props.auth.isAuthenticated) {
//       this.props.history.push("/rentalCalculator");
//     }
//   }

// componentWillReceiveProps(nextProps) {
//     if (nextProps.auth.isAuthenticated) {
//       this.props.history.push("/rentalCalculator"); // push user to dashboard when they login
//     }
// if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors
//       });
//     }
//   }

// onChange = e => {
//     this.setState({[e.target.id]: e.target.value});
// };
// onSubmit = e => {
//     e.preventDefault();

     
    
//     this.props.loginUser(userData);
// };

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
    // const res = await axios.get('http://localhost:5000/api/users/rentalCalulator');
    // console.log(Rc);
  }

  return (
    <>
      <nav className='navbar'> 
        <div className='navbar-container'>
          {/* <li className='nav-item'> */}
              {/* <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Adeborna Rentals
              </Link> 
            {/* </li>  */}
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


// Navbar.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };
// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });
// export default connect(
//   mapStateToProps,
//   { rentalCalculator }
// )(Navbar);