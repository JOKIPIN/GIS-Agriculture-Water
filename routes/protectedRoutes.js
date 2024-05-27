const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');

router.get('/map.html', isAuthenticated, (req, res) => {
    res.sendFile(__dirname + '/../views/map.html');
});

module.exports = router;
