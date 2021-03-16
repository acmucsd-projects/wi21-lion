const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticateUser(req, res, next) {
    const token = req.headers['auth_token'];
    if(!token) {
        return res.status('401').json("JWT was not provided");
    }
    else {
        jwt.verify(token, config.authentication.JWT_SECRET, function(err, decoded) {
            if(err){
                return res.status('401').json("Invalid JWT provided");
            }
            else {
                req.user_email = decoded.email;
                next();
            }
        })
    }
};

module.exports = {
    authenticateUser
};