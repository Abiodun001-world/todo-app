const express = require('express');
const authController = require('../controllers/auth.controller');
const router = express.Router();

router.get('/signup', authController.renderSignup);
router.post('/signup', authController.signup);
router.get('/login', authController.renderLogin);
router.get('/logout', authController.logout);
router.post('/login', authController.login);

module.exports = router;
