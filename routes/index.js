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

//app.get extended services pages
router.get('/services-mani-pedi', (req, res) => {
  res.render('services-mani-pedi.ejs')
})

router.get('/services-waxing', (req, res) => {
  res.render('services-waxing.ejs')
})


router.get('/services-face-body', (req, res) => {
  res.render('services-face-body.ejs')
})

router.get('/services-lashes', (req, res) => {
  res.render('services-lashes.ejs')
})


// app.get appointments
//11/29/21 TEST
router.get('/appointments', (req, res) => {
  res.render('appointments.ejs')
  //res.render('../public/dhtml/appointmentcreate.ejs')
})

router.get('/appointmentcreate', (req, res)=> {
  res.render('../public/dhtml/appointmentcreate.ejs')
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
    res.render('dashboard.ejs', { 
        user: req.user 
    })
 });


 module.exports = router;