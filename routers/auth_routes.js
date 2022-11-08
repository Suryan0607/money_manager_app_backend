const { expressjwt:jwt }=require("express-jwt")

exports.requireSignIn = jwt({
    secret:process.env.SECRET_KEY.at,
    algorithms:["HS256"],
    userProperty:"auth"
})

exports.isAuth = (req, res, next) => {
    console.log("Auth: ", req.auth)
    // let user = req. && req. && req.profile._id == req.auth._id;
    if (!user) {
        return res.status(403).json({
            err: "Access denied"
        });
    }
    next();
};

