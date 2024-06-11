const router = require("express").Router();
const IndentifyController = require("../controllers/IdentifyController");

router.route("/").post(IndentifyController.identify);

router.route("/clear").post(IndentifyController.clear);
module.exports = router;