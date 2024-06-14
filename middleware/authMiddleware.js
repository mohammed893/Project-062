const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(`token: ${token}`);
    // check jwt exits & verified
    if (token) {
        jwt.verify(token, 'cura_fci', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else {
        res.redirect('/login');
    }
};
// check currect user
const checkUser = async (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, 'cura_fci', async (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                console.log(`id: ${decodedToken.userId}`);
                let user = await User.findById(decodedToken.userId);
                console.log(`user: ${user}`);
                res.locals.user = user;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};
module.exports = { requireAuth, checkUser };
