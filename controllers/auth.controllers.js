const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const MAXAGE = 10 * 365 * 24 * 60 * 60;
const createToken = (userId) => {
    return jwt.sign({ userId }, 'cura_fci', {
        expiresIn: MAXAGE,
    });
};
const signup_post = async (req, res) => {
    const { userId, password, role } = req.body;
    try {
        const user = await User.create({ userId, password, role });
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: MAXAGE * 1000 });
        res.status(201).json({ user: user._id });
    } catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
};

const login_post = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = await User.login(userId, password);
        const token = createToken(user._id);
        console.log(`token: ${token}`);
        res.cookie('jwt', token, { httpOnly: true, maxAge: MAXAGE * 1000 });
        res.status(200).json({ user: user._id });
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};
const forgot_password_post = (req, res) => {};
module.exports = {
    signup_post,
    login_post,
    forgot_password_post,
};
