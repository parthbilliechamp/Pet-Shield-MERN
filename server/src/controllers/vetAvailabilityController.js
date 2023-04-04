/**
 * @author Parth Champaneria
 */

vetAvailabilityModel = require("../models/vetAvailabilityModel");
//controller which calls the vetAvailabilityModel to get the availability for a vet
exports.getAvailabilityByVetId = async (req, res) => {
  const vetId = req.params.vetId;
  const date = req.params.date;
  if (!vetId || !date) {
    return res
      .status(400)
      .json({ error: "Missing vetId or date in the request." });
  }
  try {
    const availability = await vetAvailabilityModel.getAvailabilityByVetId(
      vetId,
      date
    );
    return res.json({ availability });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      error: "Error while retrieving availability for vet id : " + vetId,
    });
  }
};

//controller which calls the vetAvailabilityModel to add an availability of the vet.
exports.addAvailabilityByVetId = async (req, res) => {
  const vetId = req.params.vetId;
  const date = req.body.date;
  const vetObj = req.body.vets;
  const slotData = {
    slot: req.body.slot,
  };

  if (!vetId) {
    return res
      .status(400)
      .json({ error: "Missing vetId or date in the request." });
  }
  try {
    const availability = await vetAvailabilityModel.addAvailabilityByVetId(
      date,
      slotData,
      vetObj
    );
  } catch (err) {
    return res.status(500).json({
      error: "Error while adding availability for vet id : " + vetId,
    });
  }
};
