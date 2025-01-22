const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

const User = require('../models/User');
require('dotenv').config();

let users = [];

// ------------------------------ //

/*        Users handlers          */

// ------------------------------ //

async function LoginUser(res, username) {
    const cookie_time_minutes = process.env.COOKIE_TIMER;
    res.cookie('loggedin', true, { maxAge: cookie_time_minutes * 60 * 1000, httpOnly: true });
    res.cookie('user', username, { maxAge: cookie_time_minutes * 60 * 1000, httpOnly: true });

    console.log("Cookie created for:", username);

    res.redirect(`/`);
}

async function LogoutUser(req, res) {
    const username = req.cookies.user;

    res.cookie('loggedin', true, { maxAge: 0, httpOnly: true });
    res.cookie('user', username, { maxAge: 0, httpOnly: true });

    res.redirect('/');
}

router.get('/get-users', async (req, res) => {
    try {
  
      const allUsers = await User.find();
  
      res.json({ results: allUsers });
  
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Could not fetch users' });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ error: 'Invalid username' });
      }
      
      const PSWisMatch = await bcrypt.compare(password, user.hashed_password); // This checks if the password matches the hashed password (if password is set up)
      const TempPSWisMatch = (password == user.temp_password) ? true : false; // This checks if the password matches the temp password


      if (!PSWisMatch && !TempPSWisMatch) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      LoginUser(res, username);

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'An error occurred during login' });
    }

});

router.post('/logout', async (req, res) => {
  let isLoggedIn = req.cookies.user;
  if (isLoggedIn) {
    LogoutUser(req, res);
  }
});

router.post('/create-user', async (req, res) => {
    const { username, hashed_password, temp_password, group } = req.body;
  
    try {
      const newUser = new User({
        username,
        hashed_password,
        temp_password,
        group
      });
  
      await newUser.save();
  
      users.push(newTicket); 
  
      // res.redirect('/');
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Could not add the ticket' });
    }
});

router.post('/setpsw', async (req, res) => {
  
})
  
module.exports = router;