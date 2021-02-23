const express = require('express');
const author = require('../models/author');
const books = require('../models/books')
const router = express.Router();


const imageMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];

router.get('/', async(req, res) => {

    if (req.isAuthenticated()) {
        let searchedBook = {};
        if (req.query.book != null && req.query.book != '') {
            searchedBook.title = new RegExp(req.query.book, 'i')
        }
        try {
            const book = await books.find(searchedBook);
            const autho = await author.find();

            res.render('books', { book: book, author: autho })
        } catch (error) {
            console.log(error);
            res.redirect('/error')
        }


        // books.find(searchedBook, (err, book) => {
        //     if (err) {
        //         res.redirect('/error')
        //     } else {
        //         const autho = await author.findById(book.author);
        //         res.render('books', {
        //             book: book,
        //             author: autho
        //         });

        //     }
        // });
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


function bookImage(image, imgEncoded) {
    if (imgEncoded === null) { return; }


    const img = JSON.parse(imgEncoded);

    if (img != null && imageMimeTypes.includes(img.type)) {
        image.img = new Buffer.from(img.data, 'base64')
        image.imgType = img.type;
    }
};










module.exports = router;