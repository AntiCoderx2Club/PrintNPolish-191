

const express = require('express')
const app = express()
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
//const methodOverride = require('method-override')
const mongoose = require ('mongoose');


//11/29/21 Adding for Appointment System
var path = require('path');
var bodyParser = require("body-parser");




//Bootswatch
const expressLayouts = require('express-ejs-layouts');

//Passport Config
require('./config/passport')(passport);





//EJS
app.set('view-engine', 'ejs');
app.use(express.static('public'));



//DB config
const db = require('./config/keys').MongoURI;
const User = require('./models/User')



//MongoDB Connection
mongoose.connect(db, { useNewUrlParser: true , useUnifiedTopology: true})
 .then(() => console.log('MongoDB Connected'))
 .catch(err => console.log(err));




//11/29/21 Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


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

//UPDATE 11/15/21
//User find function, replace name with your name inside DB
User.find({ name: 'desmond desboine'}, function (err, docs) {
  if (err){
      console.log(err);
  }
  else{
      console.log("Query result are as follows : ", docs);
  }
});



//Port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT);