import React, { useEffect, useState } from 'react';

import API from '../../utils/api'
import _ from 'lodash';

import { Form, Col } from 'react-bootstrap';
import { MDBDataTable } from 'mdbreact';
import { MDBBtn, MDBTable, MDBTableBody, MDBTableHead } from 'mdbreact';


//OLD FILE!!!!!!
sdcds
const Viewprogram = (props) => {
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

  function loadPrograms() {
    //console.log(tableData)
    let task = []
    API.getPrograms()
      .then(res => {
        console.log(res);
        res.data.map((value, index) => {
          value.exercise.map((exercise) => {
            console.log(exercise, value._id);
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


  function loaduserPrograms() {
    let task = []
    API.getUser("5e7d85ea5c04ae499851c956")
      .then(res => {
        res.data.programs.map((value, index) => {
          value.exercise.map((exercise) => {
            console.log(exercise);
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
        Handle: (<MDBBtn className="btn-red" style={{ backgroundColor: "green", color: "white" }}
          color="red" size="sm" onClick={() => deleteProgram(tableData._id)} >Done</MDBBtn>)
      }
      // <MDBBtn color="purple" size="sm">Button</MDBBtn>
    })
  }

  //console.log(tableData._id);

  function deleteProgram(id) {
    console.log("delete hitting");
    console.log(id);
    API.deleteProgram(id)
      .then(res => loadPrograms())
      .catch(err => console.log(err));
  }

  //console.log(tableData);
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
      {/* {tableData
            .map(row => (
              <tr key={row._id}>
                <td>{row.dayNum}</td>
                <td>{row.focus}</td>
                <td>{row.exerciseName}</td>
                <td>{row.sets}</td>
                <td>{row.reps}</td>
                <td>{row.tempo}</td>
                <td>{row.rest}</td>
                <td><DeleteBtn onClick={() => deleteProgram(row._id)} /></td>
              </tr>)
            )} */}

    </div>
  );
}

export default Viewprogram;

//deletebtn not working