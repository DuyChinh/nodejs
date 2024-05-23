module.exports = {
    login: (req, res) => {
        const error = req.flash("error");
        res.render("auth/index", { error });
    }
}