const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');


//Loading user model
const User = require('../models/User');
const {forwardAuthenticated} = require('../config/auth');


//Login Page
//UPDATE 11/8/21 router.get -> app.get. checkNotAuthenticated -> forwardAuthenticated
router.get('/login', forwardAuthenticated, (req, res) => res.render('login.ejs'));


//Register Page
router.get('/register', forwardAuthenticated, (req, res) => {
  return res.render('register.ejs');
});

//Register
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];

  if (!name || !email || !password) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/users/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});







//App.gets moved from server.js -> users.js
//Changing app.get -> router.get
// app.get login page
router.get('/login', forwardAuthenticated, (req, res) => {
    res.render('login.ejs')
  })

// app.get register page
router.get('/register', forwardAuthenticated, (req, res) => {
    res.render('register.ejs')
  })

/*
// app.get Home_Page
router.get('/Home_Page', (req, res) => {
    res.render('Home_Page.ejs')
  })

// app.get services  
router.get('/services', (req, res) => {
    res.render('services.ejs')
  })

// app.get appointments
router.get('/appointments', (req, res) => {
    res.render('appointments.ejs')
  })

// app.get staff
router.get('/staff', (req, res) => {
    res.render('staff.ejs')
  })
*/


  module.exports = router;