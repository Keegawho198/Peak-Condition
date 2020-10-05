const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProgramSchema = new Schema({
    dayNum: String,
    focus: String,
    exercise: [{
     // exerciseId: Number,
      exerciseName: String,
      sets: String,
      reps: String,
      tempo: String,
      rest: String
    }]
});

const Program = mongoose.model("Program", ProgramSchema, "Program");

module.exports = Program;