import React, { useEffect, useState } from 'react';

import API from '../utils/api'
import _ from 'lodash';
import { Navbar } from '../components/Cards/Cards/Navbar/Navbar';

import { Form, Col } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';
import Timer from '../components/Timer/Timer'
const ViewPrograms = (props) => {


  const [tableData, setTableData] = useState([]);
  const [userProgram, setUserprogram] = useState({
    id: "",
    tag: "",
    name: "",
    age: "",
    programs: [

    ],

  });



  //const [dayNum, setDayNum] = useState(0);
  useEffect(() => {
    console.log("useEffect hit")
    loaduserPrograms();
    // setDayNum(props.dayNum);
    //setTableData([...tableData, props.data])
    //console.log(props.data)
  }, []);



  function loaduserPrograms() {
    let task = []
    API.getUser(props.match.params.id)
      .then(res => {
        res.data.programs.map((value, index) => {
          value.exercise.map((exercise) => {
            console.log(exercise);
            exercise.p_id = value._id;
            exercise._id = exercise._id;
            exercise.dayNum = value.dayNum;
            exercise.focus = value.focus;
            task.push(exercise);
          })
        }
        )
        setTableData(task);
        console.log(task)
      }
      )
      .catch(err => console.log(err));
  };



  const data = {
    columns: [{
      label: 'Day Number',
      field: 'dayNum',
      sort: 'asc',
      width: 150
    },
    {
      label: 'Focus',
      field: 'focus',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Exercise Name',
      field: 'exerciseName',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Sets',
      field: 'sets',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Reps',
      field: 'reps',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Tempo',
      field: 'tempo',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Rest',
      field: 'rest',
      sort: 'asc',
      width: 100
    },
    {
      label: 'Complete',
      field: 'Handle',
      sort: 'asc',
      width: 100
    },
    ],

    rows: tableData.map(tableData => {
      return {
        dayNum: tableData.dayNum,
        focus: tableData.focus,
        exerciseName: tableData.exerciseName,
        sets: tableData.sets,
        reps: tableData.reps,
        tempo: tableData.tempo,
        rest: tableData.rest,
        'Handle': <MDBBtn className="btn-red" style={{ backgroundColor: "green", color: "white" }}
          color="red" size="sm" onClick={() => deleteProgram(tableData.p_id, tableData._id)}>Complete</MDBBtn>
      }

    })



  }


  function deleteProgram(p_id, e_id) {

    console.log("delete hitting");
    //console.log(id);
    API.deleteProgram(p_id, e_id)
      .then(res => loaduserPrograms())
      .catch(err => console.log(err));
  }





  // console.log(tableData);
  return (
    <div>

<Navbar/>
      <br></br>
      <br></br>

  <Timer/>
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

export default ViewPrograms;