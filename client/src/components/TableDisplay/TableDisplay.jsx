import React, { useEffect, useState } from 'react';
import API from '../../utils/api'
import _ from 'lodash';
import './style.css';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css'
//Link to the above
//https://www.npmjs.com/package/react-super-responsive-table

import {Link, useHistory} from "react-router-dom"
  

import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const TableDisplay = (props) => {
  const [tableData, setTableData] = useState([]);
  const [dayNum, setDayNum] = useState(0);
  const [focus, setFocus] = useState([]);
  const [select, setSelect] = useState([]);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    //refresh taken out

    history.push("/master-dashboard");

  }
  const handleShow = () => setShow(true);
  
  useEffect(() => {
    console.log("useEffect hit")
    setSelect(props.select);
    setDayNum(props.dayNum);
    setFocus(props.focus);
    setTableData([...tableData, props.data])

    console.log(tableData);
    //console.log(props.data)
  }, [props.data]);

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit btn work");

    let valuesAdded = tableData.map((data) => {
      return _.omit(data, "dayNum", "focus", "select")
    });
    console.log(valuesAdded[1])
    var apiData = {
      userId: tableData[1].select,
      dayNum: tableData[1].dayNum,
      focus: tableData[1].focus,
      //animals.slice(2)

      exercise: valuesAdded.slice(1)
      //will ignore empty array value
    }
    console.log(tableData);

    console.log(apiData);

    API.saveProgram(apiData)
      .catch(err => console.log(err));

      handleShow();
      //shows model appear after submit is clicked
      
  };




  return (
    <div>
      <br></br>
      <Table className="table-form" >
        <Thead>
          <Tr>
            <Th scope="col">Day Number</Th>
            <Th scope="col">Focus</Th>
            <Th scope="col">Exercise Name</Th>
            <Th scope="col">Sets</Th>
            <Th scope="col">Reps</Th>
            <Th scope="col">Tempo</Th>
            <Th scope="col">Rest</Th>
          </Tr>
        </Thead>

        <Tbody>
          
          {tableData
            .map(row => (
              <Tr>
                <Td>{row.dayNum}</Td>
                <Td>{row.focus}</Td>
                <Td>{row.exerciseName}</Td>
                <Td>{row.sets}</Td>
                <Td>{row.reps}</Td>
                <Td>{row.tempo}</Td>
                <Td>{row.rest}</Td>
                {/* <DeleteBtn onClick={() => deleteProgram(program._id)} /> */}
              </Tr>)
            )}

        </Tbody>
      </Table>

      <br></br>

      <div className="text-align text-center">
        <button type="button" className="btn btn-lg btn-primary text-center" onClick={handleSubmit}>Save</button>
      </div>
      <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Program Submitted for {tableData.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>Program Submitted Success</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleClose}>
                Close
          </Button>
              
            </Modal.Footer>
          </Modal>
    </div>
  );
}

export default TableDisplay;

//get data by property mongo