const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Event input validation
const validateEventInput = require('../../validation/event');

// Load Event Model
const Event = require('../../models/Event');

// @route   GET api/events/test
// @desc    Tests events route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Events Works"}));

// @route   POST api/events
// @desc    Create event
// @access  Private
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEventInput(req.body);

  // Check validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  const newEvent = new Event({
    user: req.user.id,
    name: req.body.name,
    start: req.body.start,
    end: req.body.end,
    subject: req.body.subject,
    title: req.body.title
  });

  newEvent.save().then(event => res.json(event));
})


module.exports = router;