const db = require("../models");

// Defining methods for the ProgramsController
module.exports = {
  create: function (req, res) {
    console.log(req.body);

    db.ExerciseList
      .create({
        exerciseName: req.body.exerciseName,
        instructions: req.body.instructions,
        img: req.body.img
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    // res.send('item saved');

  },
  findAll: function (req, res) {
    db.ExerciseList
      .find(req.query)
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.ExerciseList
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.ExerciseList
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db.ExerciseList
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
};