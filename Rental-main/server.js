const express = require('express');
const mongoose = require('mongoose');
const connectDB = require('./connection.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require("passport");
const users = require("./routes/api/users.js");
const rentals = require("./routes/api/rentals.js");
const cors = require('cors');
const app = express();

 connectDB();

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(cookieParser());
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

app.use(cors());
app.use('/api/users', users);
app.use('/api/rentals',rentals);

const port = process.env.Port || 5000;
app.listen(port, () => {
    console.log('Listening on port ' + port + '....')
});