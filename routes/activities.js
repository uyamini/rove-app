const express = require('express');
const router = express.Router();
const activitiesController = require('../controllers/activitiesController');
const ensureLoggedIn = require('../config/ensureLoggedIn');
const Activity = require('../models/activity');
const Review = require('../models/review');

// Route for displaying a single activity with its reviews
router.get('/activities/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id).populate('reviews');
        res.render('activities/activity', { activity, reviews: activity.reviews });
    } catch (error) {
        console.error('Error fetching activity details:', error);
        res.status(500).send('Error fetching activity details');
    }
});

// Route to display form to create a new activity
router.get('/activities/new', /*ensureLoggedIn,*/ activitiesController.newActivity);

// Route to post the new activity form
router.post('/activities', async (req, res) => {
    // Optionally, check if the user is authenticated
    // const userId = req.user ? req.user._id : null;
  
    // Create a new activity from the form data
    const newActivityData = {
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      date: req.body.date,
      location: req.body.location,
      cost: req.body.cost,
      // createdBy: userId, // Uncomment and use when authentication is enabled
      likes: 0, // Default to 0 likes
    };
  
    try {
      const newActivity = new Activity(newActivityData);
      await newActivity.save(); // Save the activity to the database
      res.redirect('/activities'); // Redirect to the list of activities or a success page
    } catch (error) {
      console.error('Error creating new activity:', error);
      res.status(500).send('Error creating the activity.'); // Handle errors appropriately
    }
  });
  

// Route to display activities
router.get('/activities', activitiesController.listActivities);

router.get('/activities', async (req, res) => {
    try {
      const activities = await Activity.find({}).sort({ date: -1 }); // Fetch all activities and sort them by date
      res.render('activities/list', { activities }); // Render a view called 'list' inside 'views/activities' directory
    } catch (error) {
      console.error('Failed to fetch activities:', error);
      res.status(500).send('Failed to load activities.');
    }
  });
  router.get('/activities/edit/:id', async (req, res) => {
    try {
        const activity = await Activity.findById(req.params.id);
        res.render('activities/edit', { activity });
    } catch (error) {
        console.error(error);
        res.status(404).send('Activity not found');
    }
});

// Handle edit form submission
router.put('/activities/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Activity.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        res.redirect('/activities');
    } catch (error) {
        console.error('Error updating activity:', error);
        res.status(500).send('Error updating the activity.');
    }
});

  
  router.get('/activities/delete/:id', async (req, res) => {
    try {
      await Activity.findByIdAndDelete(req.params.id);
      res.redirect('/activities');
    } catch (error) {
      console.error('Failed to delete activity:', error);
      res.redirect('/activities');
    }
  });
  
module.exports = router;
