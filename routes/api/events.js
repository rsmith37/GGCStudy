const express = require('express');
const router = express.Router();

// @route   GET api/events/test
// @desc    Tests events route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Events Works"}));

module.exports = router;