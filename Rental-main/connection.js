const mongoose = require('mongoose');

const uri = "mongodb+srv://rentalAdmin:tcyddXB5p6wYMkaR@cluster0.atyzw.mongodb.net/userDb?retryWrites=true&w=majority";
const connectDB = async () => {
    await mongoose.connect(uri, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    console.log("Connected to Mongo DB Cluster.....")
}
module.exports = connectDB;
