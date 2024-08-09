const mongoose = require("mongoose");

const polls_schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    polling: [{
        choice: String,
        quantity: {
            type: Number,
            default: 0
        }
    }]
})

const polls = mongoose.model("polls", polls_schema);
module.exports = polls;