const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authMiddleware');

// filter url mu
router.get('/map.html', isAuthenticated, (req, res) => {
    res.render('map');
});

module.exports = router;
