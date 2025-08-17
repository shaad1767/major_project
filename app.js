const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const methodOverride = require("method-override");
const ejsMate =require("ejs-mate");
const ExpressError = require("./utils/expressError.js");
const session = require("express-session")
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");




const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js")

const mongo_url = ('mongodb://127.0.0.1:27017/wanderlust');

//const Listing = require('../model/listing.js'); 


main().then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

async function  main () {
     await mongoose.connect (mongo_url);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//6 class project(1a)
app.use(express.urlencoded({extended : true}))

//8 class
app.use(methodOverride("_method"));

app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


// app.get("/", (req, res) => {
//     res.send (" hi ,i am root");
//  });


//express session
const sessionpOtions = {
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true ,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge :  7*24*60*60*1000,
        httpOnly :true,
    },
};
app.use(session(sessionpOtions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));
// use static serialize and deserialize of model for passport session support

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




app.use ((req,res,next) =>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});
  

 app.use("/listings",listingRouter); //pura listing is ek line se use ho rha h
 app.use("/listings/:id/reviews",reviewRouter);
 app.use("/" ,userRouter)




// //those route  not in app.js ,itmean for random route to give page not found

// app.all("*",(req,res,next) =>{
//     next(new ExpressError (404,"page not found"));
// });


//partc 3 class middleware
// app.use((err,req,res,next) => {
//     let{statusCode ,message} = err;
//     res.status(statusCode).send(message);
// });


//expressError ka h 
app.use((err,req,res,next) => {
    let { statusCode = 500, message = "Something went wrong" } = err;
    res.render("error.ejs" , {message});
   // res.status(statusCode).send(message);
});

 app.listen (8080,() => {
    console.log("server is listening to port 8080");

 });