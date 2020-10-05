const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExerciseSchema = new Schema({
  exerciseName:{
    type: String
  },
  instructions:{
    type: String
  },
  img:{
    type: String,
    data: Buffer, 
  }
    
});

const ExerciseList = mongoose.model("ExerciseList", ExerciseSchema);

module.exports = ExerciseList;