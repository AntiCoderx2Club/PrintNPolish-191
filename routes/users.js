const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');


//Loading user model
const User = require('../models/User');
const {forwardAuthenticated} = require('../config/auth');


/*------ 11/15/21 DC: testing register GET + POST methods-----*/
// Register GET
router.get('/register', forwardAuthenticated, (req, res) => res.render('register.ejs'));

// Register POST
router.post('/register', (req, res) => {
  console.log("Data from form: ", req.body);
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register.ejs', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
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




//Login Page
//UPDATE 11/8/21 router.get -> app.get. checkNotAuthenticated -> forwardAuthenticated
router.get('/login', forwardAuthenticated, (req, res) => res.render('login.ejs'));

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});



/*---------11/9/21 DC: Testing register GET method---------*/
//  - so far, by registring, the data from the form page is being sent to mongodb cluster database
//  - next steps: salt and hash the passwords, implement passportJS for authentication, route to /users/login after successful account registration 
// router.get("/register", async (req,res) =>{
//   const data = await User.find(); 
//   res.render("register.ejs", {data});
// })

/*---------11/9/21 DC: Testing register POST method---------*/
// router.post("/register", async (req,res) =>{
//   const { name, email, password } = req.body;
//   await User.create({name, email, password});
//   const data = await User.find(); 
//   console.log("Data from form: ", req.body);
//   res.render("register.ejs", {data});
//})

/* ------ note: App.gets moved from server.js -> users.js --------*/

// login GET
// router.get('/login', forwardAuthenticated, (req, res) => {
//     res.render('login.ejs')
//   })

// app.get register page
// router.get('/register', forwardAuthenticated, (req, res) => {
//     res.render('register.ejs')
//   })

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