const express = require('express');
const cookieParser = require('cookie-parser');
const router = express.Router();

require('dotenv').config();

const getPermissions = require('./functions/getPermissions');
const hasPermission = require('./functions/hasPermission');
const isAuthenticated = require('./functions/isAuthenticated');

const UserModule = require('../models/User');

// -------------------------------------------------- //

//        Functions and default configuration         //

// -------------------------------------------------- //



// Main route for tickets
router.get('/', async (req, res) => {
    let isLoggedIn = req.cookies.user;
    let username = toString(req.cookies.user);

    console.log(username);

    const user = UserModule.findOne({ username });
  
    let permissions = await getPermissions(isLoggedIn ? req.cookies.user : "");
  
    if (!isLoggedIn) {
      return res.redirect(`/login`);
    }
  
    if(!await hasPermission(req.cookies.user, "view")) {
      console.log("No permission!");
      return res.redirect('/');
    }
  
    res.render('account', { user: user, isLoggedIn: true, permissions: permissions });
  });
  
  

module.exports = router;