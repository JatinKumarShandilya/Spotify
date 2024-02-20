const mongoose = require("mongoose");

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("connection successful");
    } catch (error) {
        console.log("database connection fail");
        process.exit(0);
    }
}
module.exports = connectDb;