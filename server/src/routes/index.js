vetsController = require("../controllers/vetsController")
petsController = require("../controllers/petsController")
appointmentsController = require("../controllers/appointmentsController")
vetAvailabilityController = require("../controllers/vetAvailabilityController")


const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "App running successfully",
    success: true,
  });
});

// GET API to get the list of all the available vets 
router.get("/vets", (req, res) => {
  vetsController.getVets(req, res);
});

// GET API to get the vet by the id.
router.get("/vets/:id", (req, res) => {
  vetsController.getVetById(req, res);
});

//POST request to add the appointment
router.post("/appointments/book", (req, res) => {
  appointmentsController.bookAppointment(req, res);
});

//PUT request to modify an existing appointment.
router.put("/appointments/:id/update", (req, res) => {
  appointmentsController.updateAppointment(req, res);
});

//DELETE request to cancel an existing appointment.
router.delete("/appointments/:id/cancel", (req, res) => {
  appointmentsController.cancelAppointment(req, res);
});

//GET request to get the list of upcoming appointments by petowner id.
router.get("/appointments/:petOwnerId", (req, res) => {
  appointmentsController.getAppointmentsByPetOwnerId(req, res);
});

//GET request to get the availability time slots from the vet for a particular day
router.get("/availability/:vetId/:date", (req, res) => {
  vetAvailabilityController.getAvailabilityByVetId(req, res);
});

//GET request to get the pets
router.get("/pets", (req, res) => {
  petsController.getPets(req, res);
});

router.post("/petsByOwnerEmail", (req, res) => {
  petsController.getPetByOwnerEmail(req, res)
});

//POST request to add medical record for a pet
router.put("/:id/addPetMedicalDetails", (req, res) => {
  petsController.updatePet(req, res);
})


module.exports = router;