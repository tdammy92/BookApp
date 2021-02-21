const express = require('express');
const author = require('../models/author');
const book = require('./bookRoute');
const router = express.Router();

router.get('/', (req, res) => {

    if (req.isAuthenticated()) {
        let searchedAuthor = {};
        if (req.query.author != null && req.query.author != '') {
            searchedAuthor.name = new RegExp(req.query.author, 'i')
        }

        author.find(searchedAuthor, (err, autho) => {
            if (err) {
                res.redirect('/error')
            } else {
                res.render('author', {
                    author: autho,

                });

            }
        });
    } else {
        res.redirect('/')
    }
});


router.get('/newAuthor', (req, res) => {

    if (req.isAuthenticated()) {
        res.render('newAuthor', {});

    } else {

        res.redirect('/')
    }



});



router.post('/newAuthor', (req, res) => {


    if (req.isAuthenticated()) {

        if (req.body === '' || req.body == null) {
            res.redirect('/error')
        } else {
            const newAuthor = new author({
                name: req.body.author
            });

            newAuthor.save((err) => {
                if (err) {
                    res.redirect('/error')
                } else {
                    res.redirect('/authors')

                }
            })


        }

    } else {

        res.redirect('/')
    }




});











module.exports = router;