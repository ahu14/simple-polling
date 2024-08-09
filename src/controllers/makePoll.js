let polls = require("../middleware/model");

let template = {
    title: '',
    choices: []
}

let makePoll = (req, res) => {
    res.render("makePoll.ejs");
}

let submitPoll = async (req, res, next) => {
    let body = req.body;
    let array = [
        { choice: body.choice1 }, 
        { choice: body.choice2 }
    ];
    
    polls.title = body.title;
    polls.polling = array;

    await polls.save()
    .then(() => res.status(200).json("saved !"))
    .catch((err) => res.status(500).json("error"));
}

module.exports = {
    makePoll,
    submitPoll
};