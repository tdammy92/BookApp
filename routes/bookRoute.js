const express = require('express');
const author = require('../models/author');
const books = require('../models/books')
const router = express.Router();


const imageMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

router.get('/', async(req, res) => {

    if (req.isAuthenticated()) {

        let query = books.find();
        if (req.query.book != null && req.query.book != '') {
            query = query.regex('title', new RegExp(req.query.book, 'i'));
        };
        if (req.query.publishedBefore != null && req.query.publishedBefore != '') {
            query = query.lte('datePublished', req.query.publishedBefore);
        };
        if (req.query.publishedAfter != null && req.query.publishedAfter != '') {
            query = query.lte('datePublished', req.query.publishedAfter);
        }

        try {
            // const book = await books.find(searchedBook);
            const book = await query.exec();
            const autho = await author.find();

            res.render('books', { book: book, author: autho })
        } catch (error) {
            console.log(error);
            res.redirect('/error')
        }

    } else {
        res.redirect('/')
    }
});


router.get('/newBook', async(req, res) => {

    if (req.isAuthenticated()) {

        const autho = await author.find({});
        res.render('newBook', {
            author: autho,
        });

    } else {

        res.redirect('/')
    }



});



router.post('/newBook', (req, res) => {
    if (req.isAuthenticated()) {

        if (req.body === '' || req.body == null) {
            res.redirect('/error')
        } else {

            const newBook = new books({
                title: req.body.title,
                author: req.body.author,
                pageCount: req.body.pageCount,
                datePublished: req.body.date,
                description: req.body.description,

            });

            bookImage(newBook, req.body.img);

            newBook.save((err) => {
                if (err) {
                    console.log(err)
                    res.redirect('/error')
                } else {
                    res.redirect('/books')
                }
            })
        };
    } else {

        res.redirect('/')
    }

});



router.post('/delete', async(req, res) => {

    const deleteId = await req.body.bookId;

    console.log(deleteId);

    // books.findOneAndRemove({ _id: deleteId }, (err) => {
    //     if (!err) {
    //         console.log('item has been removed');
    //         // res.redirect('/galary')
    //     } else {
    //         console.log('an error occured', err);
    //     }
    // });

    // books.findByIdAndRemove(deleteId, (error, success) => {
    //     if (!error) {
    //         // res.redirect('/galary');
    //         console.log('Deleted successfully')

    //     } else {
    //         // res.redirect('/error');
    //         console.log(error);
    //     }

    // })
})




function bookImage(image, imgEncoded) {
    if (imgEncoded === null) { return; }


    const img = JSON.parse(imgEncoded);

    if (img != null && imageMimeTypes.includes(img.type)) {
        image.img = new Buffer.from(img.data, 'base64')
        image.imgType = img.type;
    }
};










module.exports = router;