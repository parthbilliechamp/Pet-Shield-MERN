/**
 * @author Parth Champaneria
 */

const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  date: { type: String, required: true },
  availability: { type: Object, required: true },
});
const ObjectId = mongoose.Types.ObjectId;

const availability = mongoose.model("availabilities", availabilitySchema);

//get list of availabilitites of the vet for a given date
exports.getAvailabilityByVetId = async (vetId, date) => {
  const formattedDate = date.replace('%20', ' ')
  console.log(formattedDate);
  const result = await availability.findOne({
    "vet._id": new ObjectId(vetId),
    "date": formattedDate
  });
  return result;
};
