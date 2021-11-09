const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');


//index Page routing to home page

router.get('/', forwardAuthenticated, (req, res) => res.render('Home_Page.ejs'));

//Home Page
// router.get('/', forwardAuthenticated, (req, res) => {
//     res.render('Home_Page.ejs');
   
//  })


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

// app.get about_us
router.get('/about_us', (req, res) => {
    res.render('about_us.ejs')
})

//After Authentication, send to Dashboard AKA login/successful page
//update 11/8/21 changing <checkAuthenticated> to <ensureAuthenticated>. Unsure of the changes but if need be change back to checkAuthenticated
//Changing from user: req.user.name to user: req.user

router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { 
        user: req.user 
    })
 });


 module.exports = router;