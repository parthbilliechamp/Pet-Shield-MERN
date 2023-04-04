/**
 * @author Parth Champaneria
 * @author Jaivik Tailor
 * @author Shivangkumar Gandhi
 **/

const mongoose = require("mongoose");

//defining schema for the vets collection
const vetSchema = new mongoose.Schema({
  // vet_name: { type: String, required: true },
  //_id: { type: ObjectId, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo: { type: String },
  otp: { type: Number },
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
  status: { type: String, required: true }
});

const vet = mongoose.model("Vets", vetSchema);

module.exports = {
  vet,
  getVets: async () => {
    const vetList = await vet.find({ "status": "approved" });
    return vetList;
  },
  getVetById: async (id) => {
    const vetList = await vet.findById(id);
    return vetList;
  },
  getVetsByPendingStatus: async () => {
    const vetList = await vet.find({ "status": "pending" });
    return vetList;
  },
  updateVetStatus: async (id, updatedVetStatus) => {
    const vetList = await vet.findByIdAndUpdate(id, { status: updatedVetStatus }, {
      new: true,
    });
    return vetList;
  },
  deleteVetProfile: async (id) => {
    const deletedVet = await vet.findByIdAndDelete(id);
    return deletedVet;
  }
};

