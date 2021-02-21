const mongoose = require('mongoose');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String

});


UserSchema.plugin(passportLocalMongoose);


const User = new mongoose.model('user', UserSchema);

passport.use(User.createStrategy());



passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});





module.exports = User;