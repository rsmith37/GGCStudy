const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const moment = require('moment');

// Event input validation
const validateEventInput = require('../../validation/event');

// Comment input validation
const validateCommentInput = require('../../validation/comment')

// Load Event Model
const Event = require('../../models/Event');

// Load Profile Model
const Profile = require('../../models/Profile');

// @route   GET api/events/test
// @desc    Tests events route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Events Works"}));

// @route   GET api/events/date
// @desc    Get events by date
// @access  Public
router.get('/date', passport.authenticate('jwt', { session: false }), (req, res) => {
  Event
    .find()
    .sort({start: 1 })
    .where('start').gte(moment(req.body.start).startOf('day').toDate())
    .where('start').lte(moment(req.body.start).endOf('day').toDate())
    .then(event => {
      if (!event || event.length == 0) {
        return res.status(404).json({events: "There are no events for this start date"});
      }
      res.json(event);
    })
    .catch(err => res.status(404).json(err));
})

// @route   GET api/events/date
// @desc    Get events by date
// @access  Public
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  Event
    .find()
    .sort({start: 1 })
    .then(event => {
      if (!event || event.length == 0) {
        return res.status(404).json({events: "There are no events"});
      }
      res.json(event);
    })
    .catch(err => res.status(404).json(err));
})

// @route   GET api/events/:id
// @desc    Get events by id
// @access  Public
router.get('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Event
    .findById(req.params.id)
    .then(event => {
      if (!event || event.length == 0) {
        return res.status(404).json({events: "There are no events for this id"});
      }
      res.json(event);
    })
    .catch(err => res.status(404).json({events: "There are no events for this id"}));
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

// @route   DELETE api/events/:id
// @desc    Delete event by id
// @access  Private
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          // Check for event owner
          if (event.user.toString() !== req.user.id) {
            return res.status(401).json({ notAuth: 'User not authorized for this action' })
          }

          // Delete
          event.remove().then(() => res.json({ success: true }))
        })
        .catch(err => res.status(404).json({ eventNotFound: 'No event found' }))
    })
})

// @route   POST api/events/attend/:id
// @desc    Attend event by id
// @access  Private
router.post('/attend/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          if (event.attendees.filter(attendee => attendee.user.toString() === req.user.id).length > 0) {
            return res.status(400).json({ alreadyAttending: 'User already attending this event' });
          }

          // Add user id to attendees array
          event.attendees.push({ user: req.user.id });

          event.save().then(event => res.json(event));
        })
        .catch(err => res.status(404).json({ eventNotFound: 'No event found' }))
    })
});

// @route   POST api/events/unattend/:id
// @desc    Unattend event by id
// @access  Private
router.post('/unattend/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Profile.findOne({ user: req.user.id })
    .then(profile => {
      Event.findById(req.params.id)
        .then(event => {
          if (event.attendees.filter(attendee => attendee.user.toString() === req.user.id).length === 0) {
            return res.status(400).json({ notAttending: 'User not attending this event' });
          }

          // Get remove index
          const removeIndex = event.attendees
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          // Remove user id to attendees array
          event.attendees.splice(removeIndex, 1);

          event.save().then(event => res.json(event));
        })
        .catch(err => res.status(404).json({ eventNotFound: 'No event found' }))
    })
});

// @route   POST api/events/comment/:id
// @desc    Add comment to event
// @access  Private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateCommentInput(req.body);

  // Check validation
  if (!isValid) {
    // If any errors, send 400 with errors object
    return res.status(400).json(errors);
  }

  Event.findById(req.params.id)
    .then(event => {
      const newComment = {
        text: req.body.text,
        name: req.body.name,
        user: req.user.id
      }

      // Add to comment array
      event.comments.push(newComment);

      event.save().then(event => res.json(event));
    })
    .catch(err => res.status(404).json({ eventNotFound: 'No event found'}))
});

// @route   DELETE api/events/comment/:id/:comment_id
// @desc    Remove comment from event
// @access  Private
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  Event.findById(req.params.id)
    .then(event => {
      // Check to see if comment exists
      if (event.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
        return res.status(404).json({ commentNotFound: 'Comment does not exist'});
      }

      // Get remove index
      const removeIndex = event.comments
        .map(item => item._id.toString())
        .indexOf(req.params.comment_id);

      // Remove from comment array
      event.comments.splice(removeIndex, 1);

      event.save().then(event => res.json(event));
    })
    .catch(err => res.status(404).json({ eventNotFound: 'No event found'}))
});

module.exports = router;