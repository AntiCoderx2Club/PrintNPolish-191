//if (process.env.NODE_ENV !== 'production') {
  //require('dotenv').config()
//}

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
//const methodOverride = require('method-override')
const mongoose = require ('mongoose');

//Bootswatch
const expressLayouts = require('express-ejs-layouts');

//Passport Config
require('./config/passport')(passport);





//EJS
//app.use(expressLayouts)
app.set('view-engine', 'ejs');
app.use(express.static('public'));



//DB config
const db = require('./config/keys').MongoURI;


//MongoDB Connection
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true})
 .then(() => console.log('MongoDB Connected'))
 .catch(err => console.log(err));






//Unused as of 11/8/21
//const users = []

//Body parser
app.use(express.urlencoded({ extended: false }))

//Express session
//Changing SECRET variable
app.use(session({
  secret: 'desmond',
  resave: true,
  saveUninitialized: true
}))


//Connect to flash
app.use(flash())



//middleware for passport
app.use(passport.initialize())
app.use(passport.session())







//Global variables for flash
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();





});



//Routes

app.use('/', require('./routes/index.js'));
app.use('/users', require('./routes/users.js'));








//Unused from 11/8/21 version
//app.use(methodOverride('_method'))

//app.use(express.static('public'));


//App.get Copies (will be posted in user.js routes directory)
/*
app.get('/', checkAuthenticated, (req, res) => {
   res.redirect('Home_Page');
  
})

app.get('/login', checkNotAuthenticated, (req, res) => {
  res.render('login.ejs')
})


app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
  res.render('register.ejs')
})

app.get('/Home_Page', (req, res) => {
  res.render('Home_Page.ejs')
})

app.get('/services', (req, res) => {
  res.render('services.ejs')
})

app.get('/appointments', (req, res) => {
  res.render('appointments.ejs')
})

app.get('/staff', (req, res) => {
  res.render('staff.ejs')
})

app.get('/about_us', (req, res) => {
  res.render('about_us.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    })
    res.redirect('/login')
  } catch {
    res.redirect('/register')
  }
})

app.delete('/logout', (req, res) => {
  req.logOut()
  res.redirect('/login')
})
*/


//Port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT);