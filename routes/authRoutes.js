const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// routes nya otentikasi, kalo ada page baru tambahin ke sini
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

module.exports = router;
