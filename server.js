
const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
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







//Port 3000
const PORT = process.env.PORT || 3000;

app.listen(PORT);