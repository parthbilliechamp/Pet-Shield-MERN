/**
 * @author Parth Champaneria
*/

vetsModel = require("../models/vetsModel");

//Controller which calls the vets model to get the list of vets to display it to the pet owner for booking appointment
exports.getVets = async (req, res) => {
  try {
    const vets = await vetsModel.getVets();
    res.json({ vets });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error while fetching vets." });
  }
};

//Controller which calls the vets model to get the vet by its id to display to the pet owner for booking appointment.
exports.getVetById = async (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }
  try {
    const vets = await vetsModel.getVetById(id);
    if (vets) {
      res.status(200).json({ vets });
    } else {
      res.status(404).json({ error: "Vet not found" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error while fetching vet." });
  }
};