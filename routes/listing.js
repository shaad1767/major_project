const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn , isOwner ,validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })


router
    .route("/")
//index route
    .get(wrapAsync(listingController.index))
// //create route
//    .post(
//         isLoggedIn,
//         validateListing,
//         wrapAsync(listingController.createListing)
// );
.post (upload.single("listing[image]") , (req, res ) => {
    res.send(req.file);
});

// //new route
router.get("/new", isLoggedIn ,listingController.renderNewForm);
//new route uperr side kyu h -->3part lecture 4 (4.46 sec) dekhlo
//database me newId ko search karne lagega 

router
    .route("/:id")

    //show route
    .get( wrapAsync(listingController.showListing))

    //update route
    .put (
    isLoggedIn,
    isOwner,
    validateListing,
    wrapAsync(listingController.updateLISting))

    //delete route
    .delete(
    isLoggedIn,
    isOwner,
     wrapAsync(listingController.destroyListing)
    );

// //edit route
router.get ("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));
 
module.exports = router;
   



//index route
//router.get("/",wrapAsync(listingController.index));


// //show route
// router.get("/:id", wrapAsync(listingController.showListing)
// );

// // Create route 
// router.post(
//     "/",
//     isLoggedIn,
//     validateListing,
//     wrapAsync(listingController.createListing));


// // update 
// router.put (
//     "/:id",
//     isLoggedIn,
//     isOwner,
//     validateListing,
//     wrapAsync(listingController.updateLISting));
     
// // //delete 
// router.delete(
//     "/:id" ,
//     isLoggedIn,
//     isOwner,
//      wrapAsync(listingController.destroyListing));

