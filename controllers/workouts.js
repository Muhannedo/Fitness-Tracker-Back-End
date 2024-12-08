const express = require("express");
const verifyToken = require("../middleware/verify-token");
const Workout = require("../models/workout");
const router = express.Router();

// Public Routes

// Protected Routes
router.use(verifyToken);
// CREATE WORKOUT
router.post("/", verifyToken, async (req, res) => {
  try {
    const workout = new Workout(req.body);
    workout.user = req.user._id;
    await workout.save();
    res.status(201).send(workout);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;
