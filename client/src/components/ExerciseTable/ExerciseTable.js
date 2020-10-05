import React, { useEffect, useState } from 'react';
import API from '../../utils/api'
import _ from 'lodash';
import './style.css';

import {Link, useHistory} from "react-router-dom"


import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const ExerciseTable = (props) => {
  const [tableData, setTableData] = useState([]);
  const [exerciseName, setExerciseName] = useState(0);
  const [instructions, setInstructions] = useState([]);

  const [show, setShow] = useState(false);

  const history = useHistory();

  const handleClose = () => {
    setShow(false);
    //window.location.reload()

    history.push("/viewExercise");
  }
  const handleShow = () => setShow(true);

  useEffect(() => {
    console.log("useEffect hit")
    setExerciseName(props.exerciseName);
    setInstructions(props.instructions);
    setTableData([...tableData, props.data])


    //console.log(props.data)
  }, [props.data]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit btn work");


    var apiData = {
      exerciseName: tableData[1].exerciseName,
      instructions: tableData[1].instructions,
      img: tableData[1].image
      //_.omit(tableData, "dayNum"),
    }

    console.log(apiData);

    API.saveExercise(apiData)
      .catch(err => console.log(err));

    handleShow();
  };

  return (
    <div>
      <table className="table-form">
        <thead>
          <tr>
            <th scope="col">Exercise Name</th>
            <th scope="col">Instructions</th>
            <th scope="col">Image</th>
          </tr>
        </thead>
        <tbody>

          {tableData
            .map(row => (
              <tr>
                <td>{row.exerciseName}</td>
                <td>{row.instructions}</td>
                <td><img src={row.image}></img></td>
                {/* <DeleteBtn onClick={() => deleteProgram(program._id)} /> */}
              </tr>)
            )}

        </tbody>
      </table>

      <br></br>

      <div className="text-align text-center">
        <button type="button" className="btn btn-lg btn-primary " onClick={handleSubmit}>Save</button>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Exercise Submitted</Modal.Title>
        </Modal.Header>
        <Modal.Body>Exercise Submitted Success</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>


    </div>
  );
}

export default ExerciseTable;