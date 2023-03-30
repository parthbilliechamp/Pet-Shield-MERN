/**
 * @author Parth Champaneria
 */

appointmentsModel = require("../models/appointmentsModel");

//controller which calls the appointments model to create a booking, if the pet owner wants to make a booking.
exports.bookAppointment = async (req, res) => {
  const appointmentData = req.body;
  console.log(req.body);
  if (
    !appointmentData.start_time ||
    !appointmentData.end_time ||
    !appointmentData.date ||
    !appointmentData.pet_id ||
    !appointmentData.vet ||
    !appointmentData.pet_owner
  ) {
    return res
      .status(400)
      .json({ error: "Missing fields in the request body." });
  } else {
    try {
      const result = await appointmentsModel.bookAppointment(appointmentData);
      return res.status(201).json(result);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: "Error while creating appointment." });
    }
  }
};

//controller which calls the appointments model to get the upcoming bookings for the petowner.
exports.getAppointmentsByPetOwnerId = async (req, res) => {
  const petOwnerId = req.params.petOwnerId;
  if (!petOwnerId) {
    return res
      .status(400)
      .json({ error: "Missing petOwnerId in the request." });
  }
  try {
    const upcomingAppointments =
      await appointmentsModel.getAppointmentsByPetOwnerId(petOwnerId);
    return res.json({ upcomingAppointments });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Error while retrieving appointments." });
  }
};

//controller which calls the appointments model to cancel the booking, if pet owner wants to cancel the booking.
exports.cancelAppointment = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await appointmentsModel.cancelAppointment(id);
    return res.json({ result });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ error: "Error while cancelling appointment." });
  }
};

//controller which calls the appointments model to modify the booking, if pet owner wants to modify the existing booking.
exports.updateAppointment = async (req, res) => {
  const id = req.params.id;
  const appointmentData = req.body;
  if (
    !appointmentData.start_time ||
    !appointmentData.end_time ||
    !appointmentData.date ||
    !appointmentData.pet_id ||
    !appointmentData.vet ||
    !appointmentData.pet_owner
  ) {
    return res.status(400).json({ error: "Missing appointment id or data." });
  }
  try {
    const result = await appointmentsModel.updateAppointment(
      id,
      appointmentData
    );
    return res.json({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error while updating appointment." });
  }
};