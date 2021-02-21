const express = require('express');
const books = require('../models/books')
const router = express.Router();



router.route('/')
    .get((req, res) => {

        if (req.isAuthenticated()) {
            res.render('books', {});



        } else {

            res.redirect('/')
        }

    }).post((req, res) => {

    });










module.exports = router;