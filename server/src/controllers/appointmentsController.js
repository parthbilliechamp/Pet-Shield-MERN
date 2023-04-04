/**
 * @author Parth Champaneria
 */

appointmentsModel = require("../models/appointmentsModel");
vetAvailabilityModel = require("../models/vetAvailabilityModel");

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
    !appointmentData.pet_owner ||
    !appointmentData.time_slot_id
  ) {
    return res
      .status(400)
      .json({ error: "Missing fields in the request body." });
  } else {
    try {
      const result = await appointmentsModel.bookAppointment(appointmentData);
      vetAvailabilityModel.change_time_slot_availability_status(
        appointmentData.vet._id,
        appointmentData.time_slot_id,
        appointmentData.date,
        0
      );
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
    console.log("cancel")
    console.log(result);
    vetAvailabilityModel.change_time_slot_availability_status(
      result.vet._id,
      result.time_slot_id,
      result.date,
      1
    );
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
    const existingAppointment = await appointmentsModel.getAppointmentById(id);
    vetAvailabilityModel.change_time_slot_availability_status(
      existingAppointment.vet._id,
      existingAppointment.time_slot_id,
      existingAppointment.date,
      1
    );
    const result = await appointmentsModel.updateAppointment(
      id,
      appointmentData
    );
    console.log("result");
    vetAvailabilityModel.change_time_slot_availability_status(
      result.vet._id,
      result.time_slot_id,
      result.date,
      0
    );
    return res.json({ result });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error while updating appointment." });
  }
};

//controller which calls the appointments model to get the upcoming bookings requested by vet(utsav)
exports.getAppointmentsByVetId = async (req, res) => {
  const date = req.body.date;
  const vetId = req.params.vetId;

  if (!vetId) {
    return res.status(400).json({ error: "Missing vetId in the request." });
  }
  try {
    const upcomingAppointments = await appointmentsModel.getAppointmentsByVetId(
      vetId,
      date
    );
    console.log("back to controller");
    return res.json({ upcomingAppointments });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error while retrieving appointments." });
  }
};

//controller which calls the appointments model to cancel the booking, if vet  wants to cancel the booking.(utsav)
exports.cancelVetAppointmentsById = async (req, res) => {
  const id = req.params.id;
  try {
    const result = await appointmentsModel.cancelVetAppointment(id);
    return res.json({ result });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Error while cancelling appointment." });
  }
};
