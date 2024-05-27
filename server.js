const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('./config/passportConfig');
const connectDB = require('./config/database');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const path = require('path');

const app = express();

// Koneksi ke database
connectDB();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/', protectedRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, 'views')));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
