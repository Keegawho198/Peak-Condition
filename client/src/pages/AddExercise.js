import React from 'react';
import Exercise from "../components/CreateExercise/index";
import { Navbar } from '../components/Cards/Cards/Navbar/Navbar';



const AddExercise = () => {
  return(
    <>
    <Navbar />
      <h1 className="text-center">Add Exercise Page</h1> 
      <Exercise /> </>
  );
}

export default AddExercise;