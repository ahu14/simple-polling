const polls = require("../middleware/model");

let home = async (req, res) => {
    await polls.find({})
    .then(dt => res.render("index.ejs", {dt: dt}))
    .catch(err => console.log(err));
} 

module.exports = home;