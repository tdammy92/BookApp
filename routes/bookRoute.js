const express = require('express');
const author = require('../models/author');
const books = require('../models/books')
const router = express.Router();

router.get('/', (req, res) => {

    if (req.isAuthenticated()) {
        let searchedBook = {};
        if (req.query.book != null && req.query.book != '') {
            searchedBook.name = new RegExp(req.query.book, 'i')
        }

        books.find(searchedBook, (err, book) => {
            if (err) {
                res.redirect('/error')
            } else {

                res.render('books', {
                    book: book,
                });

            }
        });
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
                author: req.body.title,
                pageCount: req.body.pageCount,
                datePublished: req.body.date,
                description: req.body.description,
            });

            console.log(newBook)

            // newBook.save((err) => {
            //     if (err) {
            //         res.redirect('/error')
            //     } else {
            //         res.redirect('/authors')

            //     }
            // })


        }

    } else {

        res.redirect('/')
    }




});










module.exports = router;