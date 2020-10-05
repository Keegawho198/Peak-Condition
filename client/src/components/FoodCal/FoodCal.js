import React, { useState } from 'react';

import _ from 'lodash'; 


import FormInput from '../FormInput';
import TableDisplay from '../TableDisplay'


const Form = () => {
  // console.log(TableDisplay);
  //const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    dayNum: "",
    focus: "",
    exerciseName: "",
    sets: "",
    reps: "",
    tempo: "",
    rest: ""
  });

  const [tableData, setTableData] = useState({
    exerciseName: "",
    focus: "",
    sets: "",
    reps: "",
    tempo: "",
    rest: ""
  });


  const handleSave = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log('saved')
    //var exerciseDat = _.omit(formData, 'dayNum')
    setTableData({ ...formData });
  }


  const handleChange = (e) => {
    let key = e.target.name;
    let value = e.target.value;

    setFormData({ ...formData, [key]: value })
  }

  // function handleFormSubmit(event) {
  //   event.preventDefault();
  //   console.log('HELLO');
  //   console.log(API);
  //   // console.log(formObject);

  //   // API.savePrograms({
  //   //   // email: formObject.email,
  //   //   // password: formObject.password,
  //   //   // name: formObject.name,
  //   //   // qualifications: formObject.qualifications,
  //   //   // image: formObject.image

  //   //   day[0].exercise[0].exerciseName : formData.name
  //   // })


  return (
    <>
  <div className="row">
    <div className="col-sm-5">
      <FormInput label="Day Number" type="number" name="dayNum" value={formData.dayNum} onChange={handleChange} />
      <FormInput label="Focus" type="text" name="focus" value={formData.focus} onChange={handleChange} />
        <FormInput label="Exercise Name" type="text" name="exerciseName" value={formData.exerciseName} onChange={handleChange} />
        
        <button type="button" className="btn btn-lg btn-primary " onClick={handleSave}>Save</button>
    </div>

    <div class="col-sm">
      <TableDisplay dayNum={formData.dayNum} data={tableData}>
      </TableDisplay>
    </div>
  </div>
      <p>Submited programs might go down here?</p>
      
      

    </>

  )
}

export default Form;