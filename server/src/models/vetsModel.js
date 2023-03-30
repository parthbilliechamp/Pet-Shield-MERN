/**
 * @author Parth Champaneria
 */

const mongoose = require("mongoose");

//defining schema for the vets collection
const vetSchema = new mongoose.Schema({
  vet_name: { type: String, required: true },
});

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
