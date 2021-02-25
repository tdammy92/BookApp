require('dotenv').config();
const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportLocalMongoose = require('passport-local-mongoose');
const book = require('./models/books.js');
const author = require('./models/author.js');
const bookRoute = require('./routes/bookRoute.js');
const authorRoute = require('./routes/authorRoute.js');
const User = require('./models/user.js');
const port = 3000;


const server = express();



server.use(express.static(__dirname + '/public'));
server.use(express.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.set('view engine', 'ejs');




server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

}));

server.use(passport.initialize());
server.use(passport.session());



server.use('/books', bookRoute);
server.use('/authors', authorRoute);




mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true);



// Main logic starts here........ 



// ............galary route code......................
server.get('/galary', async(req, res) => {

    if (req.isAuthenticated()) {


        try {
            const books = await book.find({});
            res.render('galary', { book: books });
        } catch (error) {

        }

    } else {

        res.redirect('/')
    }
});

server.get('/error', (req, res) => {


    res.render('error', {})

});


// ...............login route code...................
server.get('/', (req, res) => {

    res.render('login');


});


// ................register route code..................

server.get('/register', (req, res) => {

    res.render('register');

});


//...............logout route code......................
server.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');

});



// ..............user registration code.......................

server.post('/register', (req, res) => {

    const newUser = new User({

        name: req.body.name,
        username: req.body.username,
    })

    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            res.redirect('/register')
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/galary')
            })
        }
    })
})




// ...................................user login code.......................................


server.post('/login', passport.authenticate('local', {
    successRedirect: '/galary',
    failureRedirect: '/'
}));






server.get('/:bookId', async(req, res) => {

    if (req.isAuthenticated()) {
        try {
            const { bookId } = await req.params;
            const Onebook = await book.findById(bookId).exec();
            const autho = await author.find();

            res.render('singleBook', { book: Onebook, author: autho })

        } catch (error) {
            console.log(error)
            res.redirect('/error');
        }


    } else {

        res.redirect('/')
    }

});

//main logic ends here....



server.listen(process.env.PORT || port, () => {
    console.log(`server has started on  ${port}`)
})