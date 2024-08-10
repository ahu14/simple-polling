const getPoll = require("../controllers/getPoll");
const express = require("express");
const router = express.Router();

router.get("/getPoll/:link", getPoll);

module.exports = router;