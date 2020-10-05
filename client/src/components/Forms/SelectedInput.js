import React,  { useState, useEffect } from 'react';
import API from "../../utils/api";




function SelectedInput(props){

    const [inputCoach,setinputCoach] = useState([])

    useEffect(() => {
        loadMasters()
       
      }, [])
    

      function loadMasters() {
        API.getMasters()
          .then(res => 
            setinputCoach(res.data)
            
          )
          
          .catch(err => console.log(err));
      };

     
return(
    <div class="form-group">
    <label for="exampleFormControlSelect1">Select Coach</label>
    <select className="form-control" id="exampleFormControlSelect1" onChange={props.onChange} name="select">
    <option>Click to Select</option>

        {inputCoach.map((coach)=>{
            return(
            <option key={coach._id} value={coach._id}>{coach.name}</option>
            )
        })}
   
    </select>
  </div>
)
}


export default SelectedInput;

