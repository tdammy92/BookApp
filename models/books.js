const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    DatePublished: {
        type: Date,
        required: true
    },
    DateCreated: {
        type: Date,
        rquired: true,
        default: Date.now(),

    },

    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Author'
    }

});

const book = new mongoose.model('book', bookSchema);


module.exports = book;