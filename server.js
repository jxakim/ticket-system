const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bopa = require('body-parser');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bopa.json());
app.use(cookieParser());
app.use(express.json());


// Config

require('dotenv').config();


// Importing modules

const users_route = require('./backend/users');
const tickets_route = require('./backend/tickets_server');
const connectDB = require('./backend/database');


// Middleware

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// ---------------------------------------------- Database connection ---------------------------------------------- //

const port = process.env.PORT || 2000;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}).catch((err) => {
  console.error('Database connection failed:', err);
  process.exit(1);
});

// ---------------------------------------------- Functions & Configuration ---------------------------------------------- //



// ---------------------------------------------- App content ---------------------------------------------- //


// ------------------------------ //

/*             Routing            */

// ------------------------------ //

// Using own file for routing
app.use('/tickets', tickets_route);
app.use('/users', users_route);

app.route('/').get(async (req, res) => {
  let isLoggedIn = req.cookies.user ? true : false;

  res.render('dashboard', { isLoggedIn });
})

app.route('/login').get(async (req, res) => {
  let isLoggedIn = req.cookies.user ? true : false;

  if (isLoggedIn) {

    res.render('dashboard', { isLoggedIn });

  } else {

    res.render('login', {isLoggedIn});

  }
});
