const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: [true, 'Pls provide a title']
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'Pls Select an author'],
        ref: 'Author'
    },
    pageCount: {
        type: Number,
        required: [true, 'Pls input number of pages']
    },

    datePublished: {
        type: Date,
        required: [true, 'Pls select a published date']
    },
    dateCreated: {
        type: Date,
        rquired: true,
        default: Date.now(),

    },
    description: {
        type: String
    },

    // img and img type is for the image upload. 

    img: {
        type: Buffer,
        required: [true, 'Pls pick an image']
    },

    imgType: {
        type: String,
        required: true,
    }

});

bookSchema.virtual('imgSrc').get(function() {
    if (this.img != null && this.imgType != null) {
        return `data:${this.imgType};charset=utf-8;base64,${this.img.toString('base64')}`;
    }
})

const book = new mongoose.model('book', bookSchema);


module.exports = book;