const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const passport = require('passport');

exports.register = [
    // Validasi input
    check('username').isLength({ min: 4 }).withMessage('Username harus terdiri dari minimal 4 karakter'),
    check('password').isLength({ min: 6 }).withMessage('Kata sandi minimal harus terdiri dari 6 karakter'),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('register', {
                errors: errors.array(),
                inputData: req.body
            });
        }

        const { username, password } = req.body;
        try {
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.render('register', {
                    errors: [{ msg: 'Username sudah ada' }],
                    inputData: req.body
                });
            }

            const user = await User.createUser(username, password);
            res.redirect('/login.html');
        } catch (err) {
            res.render('register', {
                errors: [{ msg: 'Kesalahan mendaftarkan username' }],
                inputData: req.body
            });
        }
    }
];

exports.login = [
    // Validasi input
    check('username').notEmpty().withMessage('Username diperlukan'),
    check('password').notEmpty().withMessage('Password diperlukan'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('login', {
                errors: errors.array(),
                inputData: req.body
            });
        }

        // auth ...
        passport.authenticate('local', (err, user, info) => {
            if (err) return next(err);
            if (!user) {
                return res.render('login', {
                    errors: [{ msg: info.message }],
                    inputData: req.body
                });
            }
            req.logIn(user, (err) => {
                if (err) return next(err);
                return res.redirect('/map.html');
            });
        })(req, res, next);
    }
];

exports.logout = (req, res) => {
    // if logout 500 error direct ke login
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Logout error', error: err });
        }
        res.redirect('/login.html');
    });
};
