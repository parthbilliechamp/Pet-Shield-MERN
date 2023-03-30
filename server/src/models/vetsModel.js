/**
 * @author Parth Champaneria
 * @author Jaivik Tailor
 */

const mongoose = require("mongoose");

//defining schema for the vets collection
const vetSchema = new mongoose.Schema({
  // vet_name: { type: String, required: true },
  //_id: { type: ObjectId, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo:{type : Buffer},
  otp:{type : Number},
  phone: { type: String, required: true },
  // photo_url: { type: String },
  license_number: { type: String, required: true },
  qualification: { type: String, required: true },
  experience: { type: Number, required: true },
  clinic_license_number: { type: String, required: true },
  clinic_address: { type: String, required: true },
  clinic_photo_url: { type: String },
  rating: { type: Number, required: true },
  fees: { type: Number, required: true },
  clinic_name: { type: String, required: true },

});

module.exports = mongoose.model("Vets", vetSchema);

const vet = mongoose.model("vets", vetSchema);

//get the list of all the vets from the database
exports.getVets = async () => {
  const vetList = await vet.find({});
  return vetList;
};

//get the vet by id from the database.
exports.getVetById = async (id) => {
  const vetList = await vet.findById(id);
  return vetList;
};
