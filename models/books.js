const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    },
    pageCount: {
        type: Number,
        required: true
    },

    datePublished: {
        type: Date,
        required: true
    },
    dateCreated: {
        type: Date,
        rquired: true,
        default: Date.now(),

    },
    description: {
        type: String
    },





});

const book = new mongoose.model('book', bookSchema);


module.exports = book;