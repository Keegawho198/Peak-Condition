const router = require("express").Router();
const programController = require("../../controller/programController");

// Matches with "/api/books"
router.route("/")
  .get(programController.findAll)
  .post(programController.create);
  //console.log("posting");

// Matches with "/api/books/:id"
// /api/program/id
router.route("/:program_id/:exercise_id")
  .get(programController.findById)
  .put(programController.update)
  .delete(programController.remove);


  // router.route("/:exercise_id")
  // .get(programController.findById)
  // .put(programController.update)
  // .delete(programController.remove);

module.exports = router;