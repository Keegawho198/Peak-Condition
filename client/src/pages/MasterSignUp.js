import React, { useState, useEffect } from "react";
import "./style.css";
import API from "../utils/api";
import {  useHistory  } from "react-router-dom";
import { UserForm, FormSubmit } from '../components/Forms/Forms';



function MasterCreate() {
  
  const [formObject, setFormObject] = useState({})
  const history = useHistory();
  




  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(event.target);
   

  if(event.target.name==="image"){
    let files = event.target.files;
    console.log(files);
    let reader = new FileReader();
    reader.readAsDataURL(files[0]); 
    reader.onload = r => {
         console.log(r.target.result);
             
    console.log(files[0]);
    var image=r.target.result;

    setFormObject({ ...formObject, image })
         
     };

    

  } else{
    setFormObject({ ...formObject, [name]: value })
  }




  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log('HELLO');
    console.log(formObject);
    
    API.saveMaster({
      email: formObject.email,
      password: formObject.password,
      name: formObject.name,
      qualifications: formObject.qualifications,
      bio:formObject.bio,
      image: formObject.image,
      
    
    })
    
    history.push("/master-login");

  };



  return (
    <div>


      <div className="container">
        <div className="row">
          <div className="col-sm-7">
            <br></br>
            <h1>Be part of our team !</h1>
            <br></br>
            <form>
                
              <div className="form-group">
                Email
  <UserForm
                  onChange={handleInputChange}
                  name="email"
                  type="text"
                  placeholder="Email (required)"
                />
              </div>
              <div className="form-group">
                Password
  <UserForm
                  onChange={handleInputChange}
                  name="password"
                  type="password"
                  placeholder="Password (required)"
                />
              </div>
              <div className="form-group">
                Name
  <UserForm
                  onChange={handleInputChange}
                  name="name"
                  placeholder="Name (required)"
                  type="text"
                />
              </div>
              <div className="form-group">
                Qualifications
  <UserForm
                  onChange={handleInputChange}
                  name="qualifications"
                  placeholder="qualifications (required)"
                  type="text"
                />
              </div>
              <div className="form-group">
                Bio
  <UserForm
                  onChange={handleInputChange}
                  name="bio"
                  placeholder="Bio (required)"
                  type="text"
                />
              </div>
              <div className="form-group">
                Image
  <UserForm
                  onChange={handleInputChange}
                  name="image"
                  placeholder="Input Your image File (required)"
                  type="file"
                />
              </div>
              

              <FormSubmit
                onClick={handleFormSubmit}
              />
      
            </form>

          </div>
          <div className="col-sm-5"><img src="https://dujye7n3e5wjl.cloudfront.net/photographs/1080-tall/time-100-influential-photos-neil-leifer-muhammad-ali-vs-sonny-liston-56.jpg" id="sport">
          </img></div>
        </div>
        <br></br>
        <br></br>


      </div>

    </div>







  );

}

export default MasterCreate;