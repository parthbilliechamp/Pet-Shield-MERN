/**
 * @author Abhinav Singh
 */

const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

//defining schema for the vets collection
const insuranceSchema = new mongoose.Schema({
  _id: { type: ObjectId, required: true },
  name: { type: String, required: true },
  amount: { type: String, required: true },
  coverage_limit: { type: Number, required: true },
  coverage_period: { type: String, required: true },
  insurance_provider: { type: String, required: true }
});

const insurance = mongoose.model("insurances", insuranceSchema);

//get the list of all the vets from the database
exports.getInsurances = async () => {
  const insuranceList = await insurance.find({});
  return insuranceList;
};
