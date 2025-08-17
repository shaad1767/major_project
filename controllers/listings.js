const Listing = require("../models/listing");


module.exports.index = async(req,res) =>{
    const allListings = await Listing.find({});
    res.render("listings/index.ejs",{ allListings });
};




module.exports.renderNewForm = (req,res) =>{
    res.render("listings/new.ejs");
};




module.exports.showListing = async (req,res)  => {
    let {id} = req.params;
   const listing=  await Listing.findById(id)

   .populate({
    path : "reviews",
    populate : {
    path : "author",
    },
})
   .populate("owner");

     if (!listing) {
        req.flash("error", "Listing your requested for does not exist!");
         return res.redirect("/listings");
     }

   console.log(listing);
   res.render("./listings/show" ,{listing});
};


module.exports.createListing = async(req ,res, next) => {
        let listing = req.body.listing;
        const newlisting = new Listing(listing)  
        newlisting.owner = req.user._id;
        
        await  newlisting.save();
        req.flash("success", "new Listing Created!");
        res.redirect("/listings");
};


module.exports.renderEditForm =async(req,res) =>{
    const {id} = req.params;
    const listing=  await Listing.findById(id);
    res.render("listings/edit.ejs",{listing});
};

module.exports.updateListing = async(req,res) =>{
    const {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash ("success" , "listings Updated!");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async(req,res )  => {
    let {id} = req.params;
    let deletedlisting = await Listing.findByIdAndDelete(id);
        req.flash("success", " Listing deleted");
    //console.log(deletedlisting);
    res.redirect("/listings");
};