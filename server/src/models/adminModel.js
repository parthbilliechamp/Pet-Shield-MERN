/**
 * @author Jaivik Tailor
 */
const mongoose = require('mongoose')
const adminScehma = new mongoose.Schema({ 
    email: { type: String, required: true },
    password: { type: String, required: true },
});

module.exports = mongoose.model("admin", adminScehma);