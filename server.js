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

// Set up EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// Rute buat halaman utama
app.get('/', (req, res) => {
    res.render('index');
});

// Rute buat halaman login dan register
app.get('/login.html', (req, res) => {
    res.render('login', { errors: [], inputData: {} });
});

app.get('/register.html', (req, res) => {
    res.render('register', { errors: [], inputData: {} });
});

app.use('/auth', authRoutes);
app.use('/', protectedRoutes);

app.use(express.static(path.join(__dirname, 'public')));

// not found page
app.use((req, res, next) => {
    res.status(404).render('404');
});

// dev localhost port
app.listen(3000, () => {
    console.log('Server is running on port 3000: http://localhost:3000');
});
