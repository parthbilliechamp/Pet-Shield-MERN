vetsController = require("../controllers/vetsController")
petsController = require("../controllers/petsController")
appointmentsController = require("../controllers/appointmentsController")
vetAvailabilityController = require("../controllers/vetAvailabilityController")
insurancesController = require("../controllers/insuranceController")

const userController = require('../controllers/user_registrationController')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

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

//GET request to get the insurances
router.get("/insurances", (req, res) => {
  insurancesController.getInsurances(req, res);
});

router.post("/petsByOwnerEmail", (req, res) => {
  petsController.getPetByOwnerEmail(req, res);
});

//PUT request to add medical record for a pet
router.put("/:id/addPetMedicalDetails", (req, res) => {
  petsController.updatePet(req, res);
});

//PUT request to add insurance record for a pet
router.put("/:id/addPetInsuranceDetails", (req, res) => {
  petsController.updatePetInsurance(req, res);
})
//GET request to get the list of upcoming appointments (user : vet)(utsav)
router.post("/vetappointments/:vetId", (req, res) => {
  appointmentsController.getAppointmentsByVetId(req, res);
});

//POST request to cancel upcoming appointment(user - vet)(utsav)
router.post("/cancelvetappointment/:id", (req, res) => {
  appointmentsController.cancelVetAppointmentsById(req, res);
});


router.post('/registration',upload.single('photo'), userController.register)
router.post('/login', userController.login)
//app.post('/add-animals',sessionChecker, userController.addAnimalData)
router.post('/submit-otp', userController.submitotp)
router.post('/send-otp', userController.sendotp)
// router.post("/registration", upload.single('photo'), userController.register);

// router.post("/login", (req, res) => {
//   userController.login
// });

// router.post("/submit-otp", (req, res) => {
//   userController.submitotp
// });

// router.post("/send-otp", (req, res) => {
//   userController.sendotp
// });

//POST request to add the availability time slots from the vet for a particular date(utsav)
router.post("/addavailability/:vetId", (req, res) => {
  vetAvailabilityController.addAvailabilityByVetId(req, res);
});

module.exports = router;
