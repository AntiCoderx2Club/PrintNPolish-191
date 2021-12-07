

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


//connect to the mongoDB
var db2 = require('mongoskin').db("mongodb+srv://dbUser:dbpassword@cluster0.xlz4j.mongodb.net/Appointments?retryWrites=true&w=majority", { w: 0});
    //db2.bind('event');

//create express app, use public folder for static files

app.get('/init', function(req, res){
    db2.event.insert({
        text:"My test event A",
        start_date: new Date(2021,12,1),
        end_date:   new Date(2021,12,5)
    });
    db2.event.insert({
        text:"One more test event",
        start_date: new Date(2021,8,3),
        end_date:   new Date(2021,8,8),
        color: "#DD8616"
    });

    /*... skipping similar code for other test events...*/

    res.send("Test events were added to the database")
});

/*
app.get('/data', function(req, res){
    db.event.find().toArray(function(err, data){
        //set id property for all records
        for (var i = 0; i < data.length; i++){
            data[i].id = data[i]._id;
            delete data[i]["!nativeeditor_status"];
        }
        //output response
        res.send(data);
    });
});
app.post('/data', function(req, res){
    var data = req.body;

    //get operation type
    var mode = data["!nativeeditor_status"];
    //get id of record
    var sid = data.id;
    var tid = sid;

    //remove properties which we do not want to save in DB
    delete data.id;
    delete data["!nativeeditor_status"];


    //output confirmation response
    function update_response(err, result){
        if (err)
            mode = "error";
        else if (mode == "inserted")
            tid = data._id;

        res.setHeader("Content-Type","application/json");
        res.send({action: mode, sid: sid, tid: tid});

    }

    //run db operation
    if (mode == "updated")
        db2.event.updateById( sid, data, update_response);
    else if (mode == "inserted")
        db2.event.insert(data, update_response);
    else if (mode == "deleted")
        db2.event.removeById( sid, update_response);
    else
        res.send("Not supported operation");
});


*/





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