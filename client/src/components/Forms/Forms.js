import React from "react";



export function SelectedForm(props) {
  return (
    
<select>
    <option selected>Choose your Coach</option>
    <option value="1"></option>
    <option value="2"></option>
    <option value="3"></option> 
    </select>
  )
}


export function UserForm(props) {
  let type = props.type;
  
  
  return (
    <div>
      <input className="form-control" id="exampleInput" type={type} {...props}></input>
    </div>


  );
}

export function EnergyInput(props) {
 
  
  
  return (
   
    <select className="form-control" id="exampleFormControlSelect1" onChange={props.onChange} name="Energy">
      <option>Click to Choose</option>
      <option value={1.2}>Sedentery:limited Excercise</option>
      <option value={1.375}>Lightly Active: less then 3x a week</option>
      <option value={1.55}>Moderately Active: most days of the week</option>
      <option value={1.725}>Very Active: hard excercises every day</option>
      <option value={1.9}>Extra Active: strenuos excercise two or more times a day</option>
    </select>



  );
}

export function FormSubmit(props) {
  return (
    <div>
      <button type="submit" className="btn btn-primary" {...props}>Join</button>
    </div>
  );
}