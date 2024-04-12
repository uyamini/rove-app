const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://project-rove-fe21d7a2a8c6.herokuapp.com/auth/google/callback"
},

  function(accessToken, refreshToken, profile, cb) {
    // Extract the email address from the profile
    const email = profile.emails && profile.emails[0] && profile.emails[0].value;

    // Verify the domain
    if (email && email.endsWith('.edu')) {
      // Proceed with finding or creating the user in the database
      User.findOne({ googleId: profile.id }, function(err, user) {
        if (!user) {
          var newUser = new User({
            name: profile.displayName,
            googleId: profile.id,
            email: email // Make sure to save the email if you're creating a new user
          });
          newUser.save(function(err) {
            return cb(err, newUser);
          });
        } else {
          return cb(err, user);
        }
      });
    } else {
      // If the email domain is not .edu, do not proceed with authentication
      return cb(new Error('Only .edu email addresses are allowed'), null);
    }
  }
));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
