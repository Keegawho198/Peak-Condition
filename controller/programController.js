const db = require("../models");

// var program_id = req.params.programid,
//     exercise_id = req.params.exerciseid;

// Defining methods for the ProgramsController
module.exports = {
  create: function (req, res) {
    console.log(req.body);
    // var data = {
    //   dayNum: parseInt(req.body.dayNum),
    //   exercise: [{
    //     exerciseName: req.body.exerciseName,
    //     sets: parseInt(req.body.sets),
    //     reps: parseInt(req.body.reps),
    //     tempo: req.body.tempo,
    //     rest: parseInt(req.body.rest)
    //   }]
    // }
    db.Program
      .create({
        userId: req.body.select,
        dayNum: req.body.dayNum,
        focus: req.body.focus,
        exercise: req.body.exercise,
        
      })
      .then(({_id}) => db.User.findOneAndUpdate({_id: req.body.userId}, { $push: { programs: _id } }, { new: true }))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
    // res.send('item saved');

  },
  findAll: function (req, res) {
    db.Program
      .find(req.query)
      // .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db.Program
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db.Program
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  // remove: function (req, res) {
  //   db.Program
  //     .findById({ _id: req.params.id })
  //     .then(dbModel => dbModel.remove())
  //     .then(dbModel => res.json(dbModel))
  //     .catch(err => res.status(422).json(err));
  // }

  // //   // model.registerCompany.findOneAndUpdate({companyKey:"a key"},
  // //   //     {$pull:{onlineEmployees:"John"}},


  //var program_id = req.params.program_id
  //var exercise_id = req.params.exercise_id

  //db.mycollection.update({'_id': ObjectId("5150a1199fac0e6910000002")}, {$pull: {id: 23}});

///api/comments/:articleid/:commentid
  remove: function (req, res) {
    console.log({pid: req.params.program_id, eid:req.params.exercise_id})
    db.Program.findByIdAndUpdate(
      req.params.program_id,
      { $pull: { 'exercise': { _id: req.params.exercise_id } } },{ multi: true, new: true }, function (err, model) {
        //console.log(req.params.exercise_id);
        
        console.log(model);
        if (err) {
          console.log(err);
          return res.send(err);
        }
        return res.json(model);
      });
  }

};
