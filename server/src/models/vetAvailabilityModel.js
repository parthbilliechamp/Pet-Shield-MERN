/**
 * @author Parth Champaneria
 */

const mongoose = require("mongoose");

const availabilitySchema = new mongoose.Schema({
  date: { type: String, required: true },
  time_slots: { type: Object, required: true },
  vet: { type: Object, required: true },
});
const ObjectId = mongoose.Types.ObjectId;

const availability = mongoose.model("availabilities", availabilitySchema);

//get list of availabilitites of the vet for a given date
exports.getAvailabilityByVetId = async (vetId, date) => {
  const formattedDate = date.replace("%20", " ");
  console.log(formattedDate);
  const result = await availability.findOne({
    "vet._id": new ObjectId(vetId),
    date: formattedDate,
  });
  return result;
};

//add availabilitites of the vet for a given date
exports.addAvailabilityByVetId = async (date, slotData, vetobj) => {
  const data = new availability({
    date: date,
    time_slots: slotData.slot,
    vet: vetobj,
  });
  try {
    await data.save();
    console.log("availability saved to the database");
  } catch (err) {
    console.log(err);
  }
};
