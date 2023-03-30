/**
 * @author Abhinav Singh
*/

insurancesModel = require("../models/insurancesModel");

//Controller which fetch all the insurances from database 
exports.getInsurances = async (req, res) => {
  try {
    const insurances = await insurancesModel.getInsurances();
    res.json({ insurances });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error while fetching insurances." });
  }
};