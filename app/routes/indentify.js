const router = require("express").Router();
const indentifyController = require("../controllers/identify");

router.route("/").post(indentifyController.identify);

module.exports = router;
