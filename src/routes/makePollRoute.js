const poll = require("../controllers/makePoll");
const express = require("express");
const router = express.Router();

router.get("/makePoll", poll.makePoll);
router.post("/makePoll", poll.submitPoll);

module.exports = router;