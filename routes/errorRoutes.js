const express = require("express");

const errorController = require("../controllers/errorController");

const router = express.Router();

router.get("/500", errorController.serverError);

module.exports = router;
