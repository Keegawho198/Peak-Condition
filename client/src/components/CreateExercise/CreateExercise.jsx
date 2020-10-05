import React, { useState } from 'react';

import _ from 'lodash';


import FormInput from '../FormInput';
import ExerciseTable from '../ExerciseTable'


const Form = () => {
  // console.log(TableDisplay);
  //const [name, setName] = useState("");
  // const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    exerciseName: "",
    instructions: "",
    img: "",
  });

  const [tableData, setTableData] = useState({
    exerciseName: "",
    instructions: "",
    img: "",
  });


  const handleSave = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log('saved')
    //var exerciseDat = _.omit(formData, 'dayNum')
    setTableData({ ...formData });
  }


  function handleChange(event) {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(name, value);


    if (event.target.name === "image") {
      let files = event.target.files;
      console.log(files);
      let reader = new FileReader();
      reader.readAsDataURL(files[0]);
      reader.onload = r => {
        console.log(r.target.result);

        console.log(files[0]);
        var image = r.target.result;

        setFormData({ ...formData, image })

      };



    } else {

      setFormData({ ...formData, [name]: value })
    }




  }







  return (
    <>
      <br></br>

      <div className="row">
        <div className="col-sm-4 formInput">
          <FormInput label="Exercise Name" type="Text" name="exerciseName" value={formData.exerciseName} onChange={handleChange} />
          <FormInput label="Instructions" type="text" name="instructions" value={formData.instructions} onChange={handleChange} />
          <FormInput label="Image" type="file" name="image" value={formData.img} onChange={handleChange} />

          <button type="button" className="btn btn-lg btn-primary " onClick={handleSave}> Add</button>
        </div>

        <div class="col-sm">
          <ExerciseTable dayNum={formData.dayNum} data={tableData}>
          </ExerciseTable>
        </div>
      </div>
      {/* <p>Submited programs might go down here?</p> */}



    </>

  )
}

export default Form;