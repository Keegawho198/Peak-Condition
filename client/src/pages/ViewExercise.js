import React from 'react';
//import Form from "../components/Form/index";
import Exercise from "../components/ViewExercise/index"
import { Navbar } from '../components/Cards/Cards/Navbar/Navbar';


const ViewExercise = () => {
  return (
    <>
      <Navbar />
      <br></br>
      <h1 className="text-center">View All Exercises Page</h1>
      <Exercise /> </>
  );
}

export default ViewExercise;


//input type files from bootstrap