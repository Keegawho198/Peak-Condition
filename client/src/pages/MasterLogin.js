import React, { useState, useEffect,useContext } from "react";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBInput } from 'mdbreact';
import { Link, useHistory } from "react-router-dom";
import API from "../utils/api";
import AuthContext from '../utils/auth.contect'
import Cookies from 'js-cookie'

const MasterLogin = () => {

  const [formObject, setFormObject] = useState({})
  const {login} = useContext(AuthContext);
  const history = useHistory();


  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(name,value);
   
    setFormObject({ ...formObject, [name]: value })
  
  }

  
  function handleFormSubmit(event) {
    event.preventDefault();
    API.loginMaster(
      {
        email: formObject.Email,
        password: formObject.password,
       
      },
      
    )
    .then(res=>{
        
      if(!res.data.token){
        
        throw new Error('Failed!');

        
        
    }
    else{
      if(res.data.token){
        

        console.log("hello");
          login(res.data.token, res.data.userId, res.data.tokenExpiration,true);
           history.push("/master-dashboard");
           Cookies.set("token",res.data.token);
           Cookies.set("id",res.data.userId);
           Cookies.set("master",true);
          
      }

  }
      

    })

  };



  return (
    <MDBContainer>
      <MDBRow>
        <MDBCol md='6'>
          <MDBCard
            className='card-image'
            style={{
              backgroundImage:
                'url(https://www.10wallpaper.com/wallpaper/2560x1600/1606/Mens_evening_sea_running-2016_Sport_HD_Wallpaper_2560x1600.jpg)',
              width: '28rem',
              marginLeft:"64%",
              marginTop:"32%"
            }}
          >
            <div className='text-white rgba-stylish-strong py-5 px-5 z-depth-4'>
              <div className='text-center'>
                <h3 className='white-text mb-5 mt-4 font-weight-bold'>
                  <strong>Coach Sign In</strong>
                  <a href='#!' className='green-text font-weight-bold'>
                    <strong></strong>
                  </a>
                </h3>
              </div>
              <MDBInput
                label='Your email'
                group
                type='text'
                validate
                labelClass='white-text'
                name="Email"
                onChange={handleInputChange}
              />
              <MDBInput
                label='Your password'
                group
                type='password'
                validate
                labelClass='white-text'
                name="password"
                onChange={handleInputChange}
              />
             
              <MDBRow className='d-flex align-items-center mb-4'>
                <div className='text-center mb-3 col-md-12'>
                  <MDBBtn
                    color='success'
                    rounded
                    type='button'
                    className='btn-block z-depth-1'
                    onClick={handleFormSubmit}
                  >
                    Sign in
                   {/* <Link to={"/master-dashboard"} style={{color :"white"}}>Sign in</Link> */}
                  </MDBBtn>
                </div>
              </MDBRow>
              <MDBCol md='12'>
                <p className='font-small white-text d-flex justify-content-end'>
               Are You a User?
                  <a href='#!' className='green-text ml-1 font-weight-bold'>
                  <Link to={"/"} style={{color :"#007bff"}}>Sign in</Link>
                  </a>
                </p>
              </MDBCol>
              <MDBCol md='12'>
                <p className='font-small white-text d-flex justify-content-end'>
                 Don't Have an account?
                  <a href='#!' className='green-text ml-1 font-weight-bold'>
                  <Link to={"/master"} style={{color :"#007bff"}}>Sign up</Link>
                  </a>
                </p>
              </MDBCol>
            </div>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default MasterLogin;