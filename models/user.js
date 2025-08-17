const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
//passportLocalMongoose -- ye automatic usename,password generate kar dega 

const userSchema = new Schema({
    email : {
        type :String,
        required : true,        
    },
});

userSchema.plugin(passportLocalMongoose);
//use of plugin(passportLocalMongoose)---Username,hashing,salting,hashpassword automatic implement kar deta h 

module.exports = mongoose.model('User', userSchema);