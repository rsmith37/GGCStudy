const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Profile input validation
const validateProfileInput = require('../../validation/profile');

// Load Profile Model
const Profile = require('../../models/Profile');

// Load User Model
const User = require('../../models/User');

// @route   GET api/profiles/test
// @desc    Tests profiles route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Profiles Works"}));

// @route   GET api/profiles
// @desc    Get current users profile
// @access  Private
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body);

  Profile.findOne({ user: req.user.id })
    .populate('user', 'name')
    .then(profile => {
      if (!profile) {
        errors.noprofile = 'No profile exists for user';
        return res.status(404).json(errors);
      }
      res.json(profile);
    })
    .catch(err => res.status(404).json(err));
  }
)

// @route   GET api/profiles/all
// @desc    Get all profiles
// @access  Private
router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    Profile.find()
    .populate('user', 'name')
    .then(profiles => {
      if (!profiles) {
        errors.noprofiles = 'There are no profiles';
        return res.status(404).json(errors)
      }

      res.json(profiles);
    })
    .catch(err => res.status(404).json({ profiles: 'There are no profiles' }))      
  }
)

// @route   GET api/profiles/handle/:handle
// @desc    Get profile by handle
// @access  Private
router.get(
  '/handle/:handle', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    Profile.findOne({ handle: req.params.handle })
      .populate('user', 'name')
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this handle';
          return res.status(404).json(errors);
        }

        res.json(profile)
      })
      .catch(err => res.status(404).json(err))
  }
)

// @route   GET api/profiles/user/:user_id
// @desc    Get profile by user_id
// @access  Private
router.get(
  '/user/:user_id', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    Profile.findOne({ user: req.params.user_id })
      .populate('user', 'name')
      .then(profile => {
        if (!profile) {
          errors.noprofile = 'There is no profile for this user';
          return res.status(404).json(errors);
        }

        res.json(profile)
      })
      .catch(err => res.status(404).json({profile: 'There is no profile for this user'}))
  }
)

// @route   POST api/profiles
// @desc    Create or edit user profile
// @access  Private
router.post(
  '/', 
  passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      // Return any errors with 400 status
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.handle) profileFields.handle = req.body.handle;
    if (req.body.major) profileFields.major = req.body.major;
    if (req.body.year) profileFields.year = req.body.year;
    if (req.body.bio) profileFields.bio = req.body.bio;
  
    Profile.findOne({ user: req.user.id })
      .then(profile => {
        if (profile) {
          // Update
          Profile.findOneAndUpdate(
            { user: req.user.id }, 
            { $set: profileFields }, 
            { new: true })
            .then(profile => res.json(profile));
        } else{
          // Create

          // Check if handle exists
          Profile.findOne({ handle: profileFields.handle })
            .then(profile => {
              if (profile) {
                errors.handle = 'Handle already exists';
                return res.status(400).json(errors);
              }

              // Save Profile
              new Profile(profileFields)
                .save()
                .then(profile => res.json(profile));
            })
        }
      })
  }
)

module.exports = router;