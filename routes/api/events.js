const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const momemnt = require('moment');

// Event input validation
const validateEventInput = require('../../validation/event');

// Load Event Model
const Event = require('../../models/Event');

// @route   GET api/events/test
// @desc    Tests events route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Events Works"}));

// @route   GET api/events
// @desc    Get events
// @access  Public
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateEventInput(req.body);

  const startDT = momemnt(req.body.start).startOf('day').toDate();
  const endDT = momemnt(req.body.start).endOf('day').toDate();
  console.log(startDT);
  console.log(endDT);

  Event.find({
    start: {
      $gte: startDT,
      $lte: endDT
    }
  })
    .then(event => {
      if (!event) {
        errors.event = "There are no events for this start date";
        return res.status(404).json(errors);
      }

      res.json(event);
    })
    .catch(err => res.status(404).json(err));
})

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