const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const {savedRedirectUrl } = require("../middleware.js");
const userController = require ("../controllers/user.js");

router
    .route("/signup")
      .get( userController.rendersignup)
      .post(  userController.signup);


 router
    .route("/login")     
       .get( userController.renderLoginForm)
       .post(
               savedRedirectUrl , 
               passport.authenticate("local", { 
               failureRedirect: '/login' ,
               failureFlash :true,
               }),
              userController.login
              );

router.get("/logout" , userController.logout);

module.exports = router;


// router.get("/signup", userController.rendersignup);

// router.post("/signup" , userController.signup);

// router.get("/login" ,  userController.renderLoginForm);

// router.post('/login',
//   savedRedirectUrl , 
//   passport.authenticate("local", { 
//     failureRedirect: '/login' ,
//     failureFlash :true,
//   }),
//  userController.login
// );





    //res.render("users/login.ejs");

   
