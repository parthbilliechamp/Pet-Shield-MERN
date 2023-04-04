/**
 * @author Jaivik Tailor
 */

const mongoose = require('mongoose')
const petSchema = new mongoose.Schema({ 
  // _id: { type: ObjectId, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    phone: { type: Number, required: true },
    otp: {type: Number},
    //userType: {type:String,required:true}
});

module.exports = mongoose.model("pet_owner", petSchema);

