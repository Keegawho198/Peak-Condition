const router = require("express").Router();
const Usercontroller = require("../../controller/Usercontroller");
const axios = require("axios");

router.route("/login")
.post(Usercontroller.find)

router.route("/")
  .get(Usercontroller.findAll)
  .post(Usercontroller.create);
  

// Matches with "/api/User/:id"
router.route("/:id")
  .get(Usercontroller.findById)
  .put(Usercontroller.update)
  .delete(Usercontroller.remove);

module.exports = router;
