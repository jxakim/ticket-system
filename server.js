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

const User = require('./models/User');
const Group = require('./models/Group');
const getPermissions = require('./backend/functions/getPermissions');

const users_route = require('./backend/users');
const tickets_route = require('./backend/tickets_server');
const account_route = require('./backend/account_server');

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
app.use('/account', account_route);

app.route('/').get(async (req, res) => {
  let isLoggedIn = req.cookies.user ? true : false;

  let permissions = await getPermissions(isLoggedIn ? req.cookies.user : "");

  res.render('dashboard', { isLoggedIn, permissions });
})

app.route('/manage').get(async (req, res) => {
  let isLoggedIn = req.cookies.user ? true : false;

  let permissions = await getPermissions(isLoggedIn ? req.cookies.user : "");

  if (isLoggedIn) {
    if(permissions.includes("manage")) {
      res.render('manage', { isLoggedIn, permissions });
    } else {
      res.render('dashboard', { isLoggedIn, permissions });
    }
  } else {

    res.render('login', { isLoggedIn, permissions });

  }
});

app.route('/login').get(async (req, res) => {
  let isLoggedIn = req.cookies.user ? true : false;

  let permissions = await getPermissions(isLoggedIn ? req.cookies.user : "");

  if (isLoggedIn) {

    res.render('dashboard', { isLoggedIn, permissions });

  } else {

    res.render('login', { isLoggedIn, permissions });

  }
});
