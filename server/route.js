const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    message: "App running successfully",
    success: true,
  });
});

//vets API

router.get("/vets", (req, res) => {
  res.status(200).json({
    message: "App running successfully",
    success: true,
  });
});

router.get("/vets/:id/slots", (req, res) => {
  res.status(200).json({
    message: "App running successfully",
    success: true,
  });
});

router.post("/appointments/book", (req, res) => {
  const input = req.body;
  if (input?.email && input?.firstName) {
    input.id = generate_user_id();
    users.push(input);
    res.status(201).json({
        message : "User added",
        success : true
    });
  } else {
    res.status(400).json({
      message: "Bad request. Provide email and firstName in the json body",
    });
  }
});

router.put("/appointments/:id/update", (req, res) => {
  const input = req.body;
  if (input?.email && input?.firstName) {
    input.id = generate_user_id();
    users.push(input);
    res.status(201).json({
        message : "User added",
        success : true
    });
  } else {
    res.status(400).json({
      message: "Bad request. Provide email and firstName in the json body",
    });
  }
});

router.delete("/appointments/:id/cancel", (req, res) => {
  const input = req.body;
  if (input?.email && input?.firstName) {
    input.id = generate_user_id();
    users.push(input);
    res.status(201).json({
        message : "User added",
        success : true
    });
  } else {
    res.status(400).json({
      message: "Bad request. Provide email and firstName in the json body",
    });
  }
});

router.get("/appointments/:pet-owner-id", (req, res) => {
  res.status(200).json({
    message: "App running successfully",
    success: true,
  });
});


module.exports = router;
