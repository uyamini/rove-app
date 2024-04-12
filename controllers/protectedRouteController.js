// controllers/protectedRouteController.js

exports.getProtectedPage = (req, res) => {
    res.render('protected', { user: req.user });
};
