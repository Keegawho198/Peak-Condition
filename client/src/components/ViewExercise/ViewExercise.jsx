import React, { useEffect, useState } from 'react';
// import Form from '../Form/Form';
import DeleteBtn from "../DeleteBtn";
import API from '../../utils/api'
import _ from 'lodash';
import './style.css';

// import { MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import { MDBDataTable } from 'mdbreact';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead  } from 'mdbreact';
// import { Dropdown, DropdownMenu } from 'react-bootstrap';
// import DropdownButton from 'react-bootstrap/DropdownButton'


const ViewExercise = (props) => {
  const [tableData, setTableData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  //const [dayNum, setDayNum] = useState(0);

  const data = {
    columns: [{
      label: 'Exercise Name',
      field: 'exerciseName',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Instructions',
      field: 'instructions',
      sort: 'asc',
      width: 250
    },
    {
      label: 'Img',
      field: 'imgField',
      sort: 'asc',
      width: 100,
    },
    {
      label: 'Delete',
      field: 'Handle',
      sort: 'asc',
      width: 100
    },
    ],
    
      rows: tableData.map(tableData => {
        return {
          exerciseName: tableData.exerciseName,
          instructions: tableData.instructions,
          'imgField': <img src={tableData.img} className="exerciseImg" style={{height:"200px", width:"200px"}}></img>,
          'Handle': <MDBBtn className="btn-red" style={{backgroundColor:"red", color:"white"}}
          color="red" size="sm" onClick={() => deleteExercise(tableData._id)} >Delete</MDBBtn>

          // clickEvent: () => this.handleClick(params)
        }  
        // <MDBBtn color="purple" size="sm">Button</MDBBtn>//
      })
      
    

  }

  useEffect(() => {
    console.log("useEffect hit")
    loadExercises();
    // setDayNum(props.dayNum);
    // setTableData([...tableData, props.data])
    //console.log(props.data)
  }, []);

  function loadExercises() {
    let task = []
    API.getExercise()
      .then(res => {
        res.data.map((value, index) => {
          console.log(res);
          const exercise = {};
          exercise._id = value._id;
          exercise.exerciseName = value.exerciseName;
          exercise.instructions = value.instructions;
          exercise.img = value.img;

          task.push(exercise);

        
        }
        )
        setTableData(task);
        setFilterData(task);
        //here setfilterData(task)
      }
        //loop through res.data
        //loop through row.exercise
        //add daynum to all exercise
        //set exerciese to tableData

      )
      .catch(err => console.log(err));
  };


  function deleteExercise(id) {
    API.deleteExercise(id)
      .then(res => loadExercises())
      .catch(err => console.log(err));
  }



  return (
    <div>
    
      <br></br>
      <br></br>

      <MDBDataTable className="tableDisplay" 
        responsive="sm"
        noBottomColumns
        striped
        bordered
        hover
        data={data}
        sorting={false}
      />

    
    </div>
  );
}

export default ViewExercise;