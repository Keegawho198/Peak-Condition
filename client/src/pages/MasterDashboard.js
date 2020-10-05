import React, { useState, useEffect, useContext } from "react";
import "./style.css";
import { Navbar } from '../components/Cards/Cards/Navbar/Navbar';
import { Link } from "react-router-dom";

import { TodaysIntake } from '../components/Cards/Cards/Navbar/TodaysIntake'
import AuthContext from '../utils/auth.contect'
import { Modal, Button } from 'react-bootstrap'

import API from '../utils/api'

import { MDBRow, MDBCol, MDBCard, MDBAvatar, MDBCardBody, MDBIcon } from "mdbreact";
import Cookies from 'js-cookie'




function MasterDashboard(props) {
  const [master, Setmaster] = useState({
    id: "",
    tag: "",
    email: "",
    password: "",
    name: "",
    qualifications: "",
    bio: "",
    image: "",
    users: [

    ],
  });

  const [show, setShow] = useState(false);

  const { userId } = useContext(AuthContext);


  useEffect(() => {
    loadMaster()

  }, [])


  

 function handleClose(){
   setShow(false);
   window.location.reload();
 }
  const handleShow = () => setShow(true);


  function loadMaster() {
  
    API.getMaster(userId)
      .then(res =>
        Setmaster(res.data)

      )

      .catch(err => console.log(err));
  };

  console.log(master);

  return (

    <div >
      <Navbar />

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

  </Modal.Body>
  <Modal.Footer>
    <Button variant="primary" onClick={handleClose} style={{ marginRight: "28%" }}>
      Save Changes
  </Button>
  </Modal.Footer>
</Modal>
</>

      <br></br>
      <br></br>

      <div className="row">

        <TodaysIntake><h1 className="hellotext">Hello {master.name}! </h1>
          <h4 className="hellotext">Please add the excercises for all your clients</h4>
          <img src={master.image} style={{
            borderRadius: "50%", height: "200%",
            marginTop: "-14%", marginLeft: "70%", position: "absolute"
          }}>
          </img>



        </TodaysIntake>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>


      <div className="container">

        <h2 id="clientHeader">  Clients</h2>

      </div>


      <br></br>
      <br></br>
      

      <button type="button" className="btn btn-lg btn-primary text-center" style={{ marginLeft: "40%" }}><Link to={"/program/" + master.id} style={{ color: 'white' }}>Set Workout for Today</Link></button>

      <div className="row">
        {master.users.map((userList) => {
          return (



            <MDBCard className="dashCard my-5 px-5 pb-1 text-center" key={userList._id}>
              <MDBCardBody>
                <MDBRow className="text-md-center">
                  <MDBCol lg="12" md="12" sm="12" className="mb-5 float-left">
                    <MDBCol md="4" lg="6" sm="12" className="float-left">
                      <img
                        src={userList.image}
                        className=""
                        id="tileImgID"
                        tag="img"
                        alt="Sample avatar"
                      />
                    </MDBCol>
                    <MDBCol md="8" lg="6" className="float-right">
                      <h4 className="font-weight-bold mb-3">{userList.name}</h4>
                      <h6 className="font-weight-bold grey-text mb-3">
                        {userList.email}
                      </h6>
                      <p className="grey-text">
                        {userList.height}cm
                      </p>
                      <p className="grey-text">
                        Weight {userList.currentWeight} Kg
                      </p>

                      <button type="button" className="viewMorebtn btn btn-primary">
                        <Link to={"/viewClient/" + userList._id} style={{ color: "white" }}>View More</Link></button>

                    </MDBCol>
                  </MDBCol>






                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          )




        })}





      </div>




    </div >





  );
}

export default MasterDashboard