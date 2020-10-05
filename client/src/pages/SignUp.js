import React, { useState, useEffect } from "react";
import "./style.css";
import API from "../utils/api";
import { Link, useHistory  } from "react-router-dom";
import { UserForm, FormSubmit,EnergyInput} from '../components/Forms/Forms';
import SelectedInput from '../components/Forms/SelectedInput'


function UserCreate() {
  
  const [formObject, setFormObject] = useState({})
  const history = useHistory();



  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(name,value);
   

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
    API.saveUser(
      {
        email: formObject.email,
        password: formObject.password,
        name: formObject.name,
        age: formObject.age,
        gender: formObject.gender,
        height: formObject.height,
        energyExpenditure: formObject.Energy,
        currentWeight:formObject.currentWeight,
        image:formObject.image,
        goalWeight: formObject.goalWeight,  
        masterId: formObject.select,
      },
      // formObject.select,
    )

    history.push("/login");
      

  };



  return (
    <div>


      <div className="container">
        <div className="row">
          <div className="col-sm-7">
            <br></br>
            <h1>Start Your Journey!</h1>
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
                Age
  <UserForm
                  onChange={handleInputChange}
                  name="age"
                  placeholder="Age (required)"
                  type="number"
                />
              </div>
              <div className="form-group">
                Gender
  <UserForm
                  onChange={handleInputChange}
                  name="gender"
                  placeholder="Gender (required)"
                  type="text"
                />
              </div>
              <div className="form-group">
                Height (Cm)
  <UserForm
                  onChange={handleInputChange}
                  name="height"
                  placeholder="Height (required)"
                  type="number"
                />
              </div>
              <div className="form-group">
                Energy Expenditure
 <EnergyInput
 onChange={handleInputChange}
 
 />
 </div>
              <div className="form-group">
                Current Weight (Kg)
  <UserForm
                  onChange={handleInputChange}
                  name="currentWeight"
                  placeholder="Current Weight (required)"
                  type="number"
                />
              </div>
              <div className="form-group">
                Weight Goal (Kg)
  <UserForm
                  onChange={handleInputChange}
                  name="goalWeight"
                  placeholder="Weight Goal (required)"
                  type="number"
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
             
              <SelectedInput
              onChange={handleInputChange}
              />
   
    
          
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

export default UserCreate;