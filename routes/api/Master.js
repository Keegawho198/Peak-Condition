const router = require("express").Router();
const Mastercontroller = require('../../controller/Mastercontroller');



router.route("/login")
.post(Mastercontroller.find)



// Matches with "/api/User"
router.route("/")
  .get(Mastercontroller.findAll)
  .post(Mastercontroller.create);

// Matches with "/api/User/:id"
router.route("/:id")
  .get(Mastercontroller.findById)
  .put(Mastercontroller.update)
  .delete(Mastercontroller.remove);

module.exports = router;
