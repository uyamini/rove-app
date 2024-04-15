const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback route
router.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

module.exports = router;
