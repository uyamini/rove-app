const Activity = require('../models/activity');

exports.newActivity = (req, res) => {
    res.render('activities/new', { title: 'Create New Activity' });
};

exports.createActivity = async (req, res) => {
    try {
        //req.body.createdBy = req.user._id; // Assuming user ID is stored in req.user
        const userId = 'someHardcodedUserId';
        const newActivity = await Activity.create(req.body);
        res.redirect(`/activities/${newActivity._id}`);
    } catch (error) {
        console.log(error);
        res.send("Failed to create activity.");
    }
};

exports.listActivities = async (req, res) => {
    try {
        const activities = await Activity.find().sort({ likes: -1 }); // Sort by likes
        res.render('activities/list', { title: 'Activities', activities });
    } catch (error) {
        console.log(error);
        res.send("Failed to list activities.");
    }
};
