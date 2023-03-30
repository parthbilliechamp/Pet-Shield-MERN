/**
 * @author Parth Champaneria
 */

vetAvailabilityModel = require("../models/vetAvailabilityModel");

exports.getAvailabilityByVetId = async (req, res) => {
  const vetId = req.params.vetId;
  const date = req.params.date;
  if (!vetId || !date) {
    return res.status(400).json({ error: "Missing vetId or date in the request." });
  }
  try {
    const availability = await vetAvailabilityModel.getAvailabilityByVetId(
      vetId, date
    );
    return res.json({ availability });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({
        error: "Error while retrieving availability for vet id : " + vetId,
      });
  }
};
