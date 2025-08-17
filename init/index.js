const mongoose = require("mongoose");

const Listing = require('../models/listing.js');
const initdata = require('./data');

const mongo_url = "mongodb://127.0.0.1:27017/wanderlust"


main().then(() => {
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});


async function  main () {
     await mongoose.connect (mongo_url);
}
const initDB = async () => {
    
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj) => ({
        ...obj,
        owner : "6851643e74175ee7c1869e8f",
    }));

    await Listing.insertMany(initData.data);
    console.log("data was initialized");
// } catch (err) {
//     console.error("Error initializing data:", err);
//   }
};

//main();
initDB();
