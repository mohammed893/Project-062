const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

const MAXAGE = 10 * 365 * 24 * 60 * 60;
const createToken = (userId) => {
    return jwt.sign({ userId }, 'cura_fci', {
        expiresIn: MAXAGE,
    });
};
const signup = async (req, res) => {
    const { userId, password } = req.body;
    try {
        console.log(userId, password);
        await User.create({ userId, password });
        // const token = createToken(user.userId);
        // res.cookie('jwt', token, { httpOnly: true, maxAge: MAXAGE * 1000 });
        res.send({
            id: userId
        });
    } catch (e) {
        console.log(e);
        res.send({
            id: null
        })
    }
};

const login_post = async (req, res) => {
    const { userId, password } = req.body;
    try {
        const user = await User.login(userId, password);
        const token = createToken(user.userId);
        console.log(`token: ${token}`);
        res.cookie('jwt', token, { httpOnly: true, maxAge: MAXAGE * 1000 });
        res.status(200).json({ user: user.userId });
    } catch (e) {
        console.log(e);
        res.status(400).json(e);
    }
};
const whoheis = async (req, res) => {
    const token = req.body.token;
    console.log(req.body);
    if (token) {
        try {
            const decodedToken = jwt.verify(token, 'cura_fci');
            const user = await User.findOne({ userId: decodedToken.userId });

            if (user) {
                res.status(200).json({
                    userId: user.userId
                });
            } else {
                res.status(404).json({
                    userId: null
                });
            }
        } catch (err) {
            console.error(err.message);
            res.status(400).json({
                userId: null
            });
        }
    } else {
        res.status(401).json({
            userId: null
        });
    }
};
const delete_employee = async (id) => {
    const documentExist = await User.findOne({ userId: id });
    if (!documentExist) {
        throw Error('this user does not exist to delete it');
    }
    await User.deleteOne({ userId: id });
}
const forgot_password_post = (req, res) => { };
module.exports = {
    signup,
    delete_employee,
    login_post,
    forgot_password_post,
    whoheis
};
