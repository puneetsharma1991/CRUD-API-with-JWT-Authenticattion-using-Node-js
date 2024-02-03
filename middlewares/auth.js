const { getUser } = require("../service/auth");


// middleware to validate authtoken comming from user ..... 
async function allowUserToUserAppUrl(req, res, next) {
    const userAuth = req.headers['Authorization'];
    console.log("bearer toke : " + userAuth);
    if (!userAuth) {
        return res.json({ status: "Wrong auth token" })
    }
    const token = userAuth.split("Bearer ")[1]; // Bearer [234nj34kjh34kh]
    const user = getUser(token);
    if (!user) return res.json({ status: "Wrong auth token" })

    req.user = user;
    next();
}

module.exports = {
    allowUserToUserAppUrl,
}