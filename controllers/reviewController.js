const Review = require('../models/review');

exports.deleteReview = async (req, res) => {
    try {
        await Review.findByIdAndDelete(req.params.reviewId);
        res.redirect('back'); // Redirects the user to the previous page
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).send('Error deleting review.');
    }
};

