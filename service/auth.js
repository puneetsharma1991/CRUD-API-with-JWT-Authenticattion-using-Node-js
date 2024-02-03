const jwt = require("jsonwebtoken");
const secret = "puneet#123@";


function setUser(user) {
    return jwt.sign({
        email: user.email,
        id: user._id,
    }, secret);
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch {
        return null
    }
}


module.exports = {
    setUser,
    getUser,
}