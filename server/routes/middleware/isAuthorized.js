function validator(req, res, next) {
    if (req.user) {
        console.log("User is logged in!")
        // console.log(req.user)
        next();
    } else {
        res.redirect("/")
    }
};

module.exports = validator