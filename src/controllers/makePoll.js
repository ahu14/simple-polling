let polls = require("../middleware/model");


let makePoll = (req, res) => {
    res.render("makePoll.ejs");
}

let submitPoll = async (req, res, next) => {
    let template = new polls({
        title: '',
        polling: []
    });

    let body = req.body;
    let array = [];

    for (let i in body){
        if (i != 'title'){
            array.push({choice : body[i]});
        }
    }

    template.title = body.title;
    template.polling = array;

    await template.save()
    .then(() => res.redirect("/"))
    .catch((err) => res.status(500).json("error"));
}

module.exports = {
    makePoll,
    submitPoll
};