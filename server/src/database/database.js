/**
 * @author Parth Champaneria
 */

const mongoose = require("mongoose");
const dotenv = require("dotenv");

//make database connection 
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const Connection = async () => {

    const URL = `mongodb+srv://${username}:${password}@cluster0.ugy1i52.mongodb.net/pet_shield?retryWrites=true&w=majority`;
    try {
       await mongoose.connect(URL, {useUnifiedTopology: true, useNewUrlParser: true})
       console.log("Database connected successfully")
    } catch (error) {
        console.log("Error connecting the database. Error : " + error)
    }
}

module.exports = Connection;