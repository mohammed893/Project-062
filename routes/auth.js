const { Router } = require('express');
const auth = Router();
const controller = require('../controllers/auth.controllers');
const { requireAuth, checkUser } = require('../middleware/authMiddleware');
auth.post('/login', controller.login_post);
auth.post('/signup', controller.signup);
auth.post('/forgot_password', controller.forgot_password_post);
auth.get('/whoheis', controller.whoheis);
module.exports = auth;
