import React, { useState, useEffect,useContext } from "react";
import API from "../utils/api";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBInput } from 'mdbreact';
import { Link } from "react-router-dom";
import AuthContext from '../utils/auth.contect'
import Cookies from 'js-cookie'

const UserLogin = (props) => {

  const [formObject, setFormObject] = useState({})


  const {login} = useContext(AuthContext);

  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(name,value);
   
    setFormObject({ ...formObject, [name]: value })
  
  }


  
  function handleFormSubmit(event) {
    event.preventDefault();
  
    API.loginUser(
      {
        email: formObject.Email,
        password: formObject.password,
       
      }
     

      )
      .then(res=>{
        
        if(!res.data.token){
          
          throw new Error('Failed!');

          
          
      }
      else{
        if(res.data.token){
           login(res.data.token, res.data.userId, res.data.tokenExpiration);
            console.log({login});
         
          Cookies.set("token",res.data.token);
          Cookies.set("id",res.data.userId);
          
            
          
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
                'url(https://image.winudf.com/v2/image1/Y29tLnNnbS5oZHNwb3J0d2FsbHBhcGVyX3NjcmVlbl8xNl8xNTY3MDc4NTIxXzA4OQ/screen-16.jpg?fakeurl=1&type=.jpg)',
              width: '28rem',
              marginLeft:"64%",
              marginTop:"10%"
            }}
          >
            <div className='text-black rgba-stylish-strong py-5 px-5 z-depth-4'>
              <div className='text-center'>
                <h3 className='black-text mb-5 mt-4 font-weight-bold'>
                  <strong>User Sign In</strong>
                  <a href='#!' className='green-text font-weight-bold'>
                    <strong> </strong>
                  </a>
                </h3>
              </div>
              <MDBInput
                label='Enter Your Email'
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
                  sign in  
                    {/* <Link to={"/dashboard/" + userID} style={{color :"white"}}> Sign In</Link> */}
                  </MDBBtn>
                </div>
              </MDBRow>
              <MDBCol md='12'>
                <p className='font-small white-text d-flex justify-content-end'>
               Are You a Coach?
                  <a href='#!' className='green-text ml-1 font-weight-bold'>
                  <Link to={"/master-login"} style={{color :"#007bff"}}>Sign In</Link>
                  </a>
                </p>
              </MDBCol>
              <MDBCol md='12'>
                <p className='font-small white-text d-flex justify-content-end'>
                 Don't Have an account?
                  <a href='#!' className='green-text ml-1 font-weight-bold'>
                  <Link to={"/signup"} style={{color :"#007bff"}}>Sign Up</Link>
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

export default UserLogin;