//controllers/activityController.js
const Activity = require('../models/activity');

exports.newActivity = (req, res) => {
    res.render('activities/new', { title: 'Create New Activity' });
};

exports.createActivity = async (req, res) => {
    try {
        req.body.createdBy = req.user._id; 
        const newActivity = await Activity.create(req.body);
        res.redirect(`/activities/${newActivity._id}`);
    } catch (error) {
        console.log(error);
        res.send("Failed to create activity.");
    }
};

exports.listActivities = async (req, res) => {
    const categoryFilter = req.query.category; // This captures the category filter from the query string
    
    let filter = {};
    if (categoryFilter) {
        filter.category = categoryFilter;
    }

    try {
        const activities = await Activity.find(filter).sort({ date: -1 });
        res.render('activities/list', {
            title: 'Activities List',
            activities: activities,
            user: req.user, 
            selectedCategory: categoryFilter || '', // Pass the selected category or an empty string if none is selected
        });
    } catch (error) {
        console.error('Failed to fetch activities:', error);
        res.status(500).send('Failed to load activities.');
    }
};

exports.likeActivity = async (req, res) => {
    try {
      // Find the activity by ID and increment the likes
      const activity = await Activity.findById(req.params.id);
      activity.likes += 1; // Increment the like count
      await activity.save();
  
      res.redirect('/activities'); // Redirect back to the activities page
    } catch (error) {
      console.error('Error liking activity:', error);
      res.status(500).send('Error processing like action.');
    }
  };
  
