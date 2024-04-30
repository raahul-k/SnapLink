const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

router.post("/result", userController.getResult);

router.post("/deleteurl", userController.deleteUrl);

router.get("/:id", userController.getOriginalUrl);

module.exports = router;
