module.exports = (req, res, next) => {
    const pathName = req.baseUrl + req.path;
    console.log(pathName);
    if(req.user || pathName === "/auth/login/google") {
        return next();
    }

    return res.redirect("/auth/login");
}