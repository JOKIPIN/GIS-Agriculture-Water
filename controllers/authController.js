const User = require('../models/User');
const passport = require('passport');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.createUser(username, password);
        res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        res.status(500).json({ message: 'Error registering user', error: err });
    }
};

exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.status(400).json({ message: info.message });
        req.logIn(user, (err) => {
            if (err) return next(err);
            return res.json({ message: 'Login successful', user });
        });
    })(req, res, next);
};

exports.logout = (req, res) => {
    req.logout();
    res.json({ message: 'Logout successful' });
};
