const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  major: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  },
  bio: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now()
  }
});

module.exports = profile = mongoose.model('profile', ProfileSchema);