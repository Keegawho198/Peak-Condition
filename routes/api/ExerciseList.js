const router = require("express").Router();
const exerciseListController = require("../../controller/exerciseListController");

// Matches with "/api/books"
router.route("/")
  .get(exerciseListController.findAll)
  .post(exerciseListController.create);
  //console.log("posting");

// Matches with "/api/books/:id"
router.route("/:id")
  .get(exerciseListController.findById)
  .put(exerciseListController.update)
  .delete(exerciseListController.remove);

module.exports = router;