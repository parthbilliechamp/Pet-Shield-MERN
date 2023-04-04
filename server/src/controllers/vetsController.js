/**
 * @author Parth Champaneria
 * @author Shivangkumar Gandhi
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

//Controller which calls the vets model to get the list of vets to display it to the pet owner for booking appointment
exports.getVetsByPendingStatus = async (req, res) => {
  try {
    const pendingVets = await vetsModel.getVetsByPendingStatus();
    res.json({ pendingVets });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error while fetching pending vets." });
  }
};

//Controller to add or update the pets medical data and insurance data 
exports.updateVetStatus = async (req, res) => {
  const id = req.params.id;
  const updatedVetStatus = req.body.profile.status
  try {
    const result = await vetsModel.updateVetStatus(id, updatedVetStatus);
    return res.json({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error while updating vet status." });
  }
};

//controller which calls the appointments model to cancel the booking, if pet owner wants to cancel the booking.
exports.deleteVetProfile = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await vetsModel.deleteVetProfile(id);
    return res.json({ result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Error while deleting vet profile." });
  }
};

