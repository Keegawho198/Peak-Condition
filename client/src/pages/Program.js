


import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './style.css';
import FormInput from '../components/FormInput/FormInput';
import TableDisplay from '../components/TableDisplay/TableDisplay'
// import ProgramSelected from "../components/Forms/ProgramSelectedInput";
import { Navbar } from '../components/Cards/Cards/Navbar/Navbar';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

import API from "../utils/api"

import Select from 'react-select'


//Options for Dropdown list in form
const options = [
  { label: 'One', value: 'One' },
  { label: 'Two', value: 'Two' },
  { label: 'Three', value: 'Three' },
  { label: 'Four', value: 'Four' },
  { label: 'Five', value: 'Five' },
  { label: 'Six', value: 'Six' },
  { label: 'Seven', value: 'Seven' },

];

const Program = (props) => {
  const [formData, setFormData] = useState({
    dayNum: "",
    focus: "",
    exerciseName: "",
    sets: "",
    reps: "",
    tempo: "",
    rest: "",
    select: "",
    userName: ""
  });
  const [tableData, setTableData] = useState({
    exerciseName: "",
    focus: "",
    sets: "",
    reps: "",
    tempo: "",
    rest: "",
    select: "",
    userName: ""
  });

  const [userList, setUserList] = useState({
    id: "",
    tag: "",
    email: "",
    password: "",
    name: "",
    qualifications: "",
    bio: "",
    image: "",
    users: [],

  })

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    //refresh taken out
  }
  const handleShow = () => setShow(true);


  useEffect(() => {
    loaduserList()
    handleShow();
  }, [])


  function loaduserList() {
    API.getMaster(props.match.params.id)
      .then(res =>
        setUserList({
          users: res.data.users


          // console.log(key);
          // console.log(value);
          // setFormData({ ...formData,  })

        })

      )

      .catch(err => console.log(err));
  };
  //This function Handles changes for the dropdown only!!!!
  const handleChange = (e) => {
    console.log(e);
    console.log(e.value);


    //daynumber not showing on input when selected

    setFormData({ ...formData, dayNum: e.value })
  }

  //this handles changes for the other form inputs!
  const handleChangeSecond = (event) => {
    let key = event.target.name;
    let value = event.target.value;
    // console.log(key);
    // console.log(value);
    setFormData({ ...formData, [key]: value })
  }

  const handleSave = (e) => {
    e.preventDefault();
    console.log(formData);
    console.log('saved')

    setTableData({ ...formData });
  }
  console.log(tableData);
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Peak Condition</Modal.Title>
        </Modal.Header>
        <Modal.Body>Please add all workouts for a client before saving.</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
      <Navbar />
      <br></br>

      <h1 className="text-center">Program Page</h1>
      <div className="row">
        <div className="Form col-sm-4 col-lg-4">
          <p>Day Number</p>
          <Select label="DayNum" name="dayNum" value={options.selected} options={options}
            onChange={handleChange} />
          <FormInput label="Focus" type="text" name="focus" value={formData.focus} onChange={handleChangeSecond} />
          <FormInput label="Exercise Name" type="text" name="exerciseName" value={formData.exerciseName} onChange={handleChangeSecond} />
          <FormInput label="Sets" type="text" name="sets" value={formData.sets} onChange={handleChangeSecond} />
          <FormInput label="Reps" type="text" name="reps" value={formData.reps} onChange={handleChangeSecond} />
          <FormInput label="Tempo" type="text" name="tempo" value={formData.tempo} onChange={handleChangeSecond} />
          <FormInput label="Rest" type="text" name="rest" value={formData.rest} onChange={handleChangeSecond} />


          <div class="form-group">
            <label for="exampleFormControlSelect1">Select a client</label>
            <select className="form-control" id="exampleFormControlSelect1" onChange={handleChangeSecond} name="select">
              <option>Click to Choose</option>
              {userList.users.map((user) => {
                return (
                  <option key={user._id} value={user._id}>{user.name}</option>
                )
              })}

            </select>
          </div>
          <button type="button" className="btn btn-lg btn-primary " onClick={handleSave}>Add</button>
        </div>
        <div class="col-sm-8 col-md col-lg-8">
          <TableDisplay dayNum={formData.dayNum} data={tableData}>
          </TableDisplay>
        </div>
      </div>



    </>
  )
}
export default Program;