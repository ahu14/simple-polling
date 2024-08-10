let polls = require("../middleware/model");

let getPoll = async (req, res) => {
    await polls.findById(req.params.link)
    .then(dt => res.render("data.ejs", {dt: dt}))
    .catch(err => console.log(err));
}

module.exports = getPoll;