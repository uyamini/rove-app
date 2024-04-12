const express = require('express');
const passport = require('passport');
const router = express.Router();

// Route to start OAuth flow
router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }), // Adjust '/login' as necessary
  function(req, res) {
    // Successful authentication, redirect home or to another page
    res.redirect('/'); // Adjust redirect upon success
  });

module.exports = router;
