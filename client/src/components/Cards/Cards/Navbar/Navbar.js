import React, {useContext} from 'react';
import "./style.css";
import { Link } from 'react-router-dom';
import NavbarI from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Authcontext from '../../../../utils/auth.contect';





export function Navbar() {
  const {logout} = useContext(Authcontext);

  return (

    <div>
     
      <NavbarI bg="" expand="lg">
        <NavbarI.Brand href="#home"><a class="navbar-brand" ><img id="navImg" src={require('../../../../img/logo.jpg')} alt="" style={{ height: "5rem" }} id="logo"></img></a>
        </NavbarI.Brand>

        <NavbarI.Toggle aria-controls="basic-navbar-nav" />
        <NavbarI.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Link exact to="/" ><a className="nav-link" style={{color:"#384349"}} id="navA">Home</a></Link>
            <Link exact to="/addExercise" ><a className="nav-link" style={{color:"#384349"}} id="navA">Excercise</a></Link>
            <Link exact to="/nutrition-search"><a className="nav-link" style={{color:"#384349"}} id="navA">Nutrition</a></Link>
            <Link exact to ="/login" onClick={logout}><a className="nav-link " style={{color:"#384349"}} id="navA">Logout</a></Link>
          </Nav>
        </NavbarI.Collapse>
      </NavbarI>
    </div>





  );
}

