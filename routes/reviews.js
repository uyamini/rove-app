// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const Activity = require('../models/activity');

// DELETE route for removing a review by its ID
const reviewController = require('../controllers/reviewController');

router.delete('/reviews/:reviewId', reviewController.deleteReview);

// Route to handle review submission
router.post('/activities/:activityId/reviews', async (req, res) => {
    const { content, rating } = req.body;
    const { activityId } = req.params;
  
    try {
      const review = await Review.create({
        content,
        rating,
        author: req.user._id,
      });
  
      await Activity.findByIdAndUpdate(activityId, { $push: { reviews: review._id } });
  
      res.redirect(`/activities/${activityId}`);
    } catch (error) {
      console.error('Error posting review:', error);
      res.status(500).send('An error occurred while posting the review.');
    }
  });

module.exports = router;
