const mongoose = require('mongoose');

const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Pls input Author Name']
    },

    // booksPublished: {

    // }


});

const author = new mongoose.model('Author', AuthorSchema);


module.exports = author;