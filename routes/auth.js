const { Router } = require('express');
const auth = Router();
const controller = require('../controllers/auth.controllers');
auth.post('/signup', controller.signup_post);
auth.post('/login', controller.login_post);
auth.post('/forgot_password', controller.forgot_password_post);
module.exports = auth;
