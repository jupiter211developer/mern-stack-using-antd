const mongoose = require('mongoose');

const feedbackSchema = mongoose.Schema({
    name: String,
    title: String,
    content: String,
    star: Number
})

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = { Feedback }