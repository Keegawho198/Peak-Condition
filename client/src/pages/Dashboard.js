import React, { useState, useEffect,useContext } from "react";
import "./style.css";
import { Navbar } from '../components/Cards/Cards/Navbar/Navbar';
import ProjectedWeight from '../components/Cards/Cards/Navbar/ProjectedWeight';
import { TodaysIntake } from '../components/Cards/Cards/Navbar/TodaysIntake'
import { TodaysWorkout } from '../components/Cards/Cards/Navbar/TodaysWorkout'
import { FoodToday } from '../components/Cards/Cards/Navbar/FoodToday'
import API from '../utils/api'
import { Link } from "react-router-dom";
import { Modal, Button } from 'react-bootstrap'
import AuthContext from '../utils/auth.contect'
import Cookies from 'js-cookie'


function Dashboard(props) {

  const {userId} = useContext(AuthContext);
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
    age: "",
    gender: "",
    height: "",
    energyExpenditure: "",
    currentWeight: "",
    image: "",
    week: [],
    weights: [],
    programs: [],
    calories: ""

  });

  const [show, setShow] = useState(false);
  const [tempweight, SetTempWeight] = useState("");


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
  
    loadUsers();
    handleShow();
  }, [])




  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(event.target);
    console.log(name, value);


    SetTempWeight(parseInt(value));
  }



  function loadUsers() {
    
    API.getUser(userId)
      .then(res =>
        setUser(res.data)

      )

      .catch(err => console.log(err));
  };

  function updatingUser(newUser) {
    console.log(newUser);
    API.updateUser(newUser)
      .then(res => {
        console.log(res);
      })
  }


  async function saveWeight() {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    //var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date;
    console.log(tempweight);
    console.log(dateTime);
    const newUser = {
      ...user,
      currentWeight: tempweight,
      weights: [...user.weights, tempweight],
      week: [...user.week, dateTime]
    };
    setUser(newUser);

    await updatingUser(newUser);

    handleClose();

    console.log(user);

    loadUsers();




  }

  //udpate function in save button to call handleSave
  // push the new weight in to weights
  //update user
  //close

  // await setUser({ ...user, weights: user.weights.push(tempweight) });

  console.log(user);

  return (

    <div >
      <Navbar />
      <br></br>
      <>

        <Modal show={show} onHide={handleClose} size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Update Your Weight
        </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              Enter Your Weight in (Kg)
            <input className="form-control" id="exampleInput" type="number" name="currentWeight" onChange={handleInputChange}></input>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={saveWeight} style={{ marginRight: "28%" }}>
              Save Changes
          </Button>
          </Modal.Footer>
        </Modal>
      </>


      <div className="row">


        <TodaysIntake>
          <div className="row">
            <div className="col-lg-7">
              <h1 className="hellotext">Hello {user.name} ! </h1>
              <h4 className="hellotext">You're currently on track with progress. Keep going</h4>
            </div>
          
            <div className="col-lg-5">
              <img id="dashboardImg" src={user.image}></img>
            </div>
          </div>
          

        </TodaysIntake>




      </div>
      <br></br>
      <br></br>
      <br></br>

      
      <div className="row">


        <div class="col-lg-6">
          <ProjectedWeight user={user}/>

        </div>
        <div className="col-lg-6">
          <div className="row">
            <FoodToday>
              <p style={{ fontSize: "20px", textAlign: "center" }}>Todays Nutrition</p>
              <p style={{ fontSize: "40px", color: "#c5d3c1", textAlign: "center" }}>{user.calories}</p>
              <p style={{ fontSize: "20px", color: "#c2c2c2", textAlign: "center" }}><Link to={"/nutrition-search"} style={{ fontSize: "20px", color: "#c2c2c2", textAlign: "center" }}>Search Food</Link></p>
            </FoodToday>

            <TodaysWorkout>
              <p style={{ fontSize: "20px", textAlign: "center" }}>Todays Workout</p>


              <p style={{ fontSize: "40px", color: "#c5d3c1", textAlign: "center" }}><Link to={"/user/viewprogram/" + user.id} style={{ fontSize: "40px", color: "#c5d3c1", textAlign: "center" }}>Start</Link></p>




              <p style={{ fontSize: "20px", color: "#c2c2c2", textAlign: "center" }}><Link to={"/viewExercise"} style={{ fontSize: "20px", color: "#c2c2c2", textAlign: "center" }}>View Excercise Database</Link></p>
            </TodaysWorkout>
            


          </div>
          <br></br>
            <br></br>
        </div>

      </div>



    </div>





  );
}

export default Dashboard