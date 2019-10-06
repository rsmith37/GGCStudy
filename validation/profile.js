const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.handle = !isEmpty(data.handle) ? data.handle : '';
  data.major = !isEmpty(data.major) ? data.major : '';
  data.year = !isEmpty(data.year) ? data.year : '';

  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = 'Handle must be 2 to 40 characters'
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = 'Handle field is required';
  }
  if (Validator.isEmpty(data.major)) {
    errors.major = 'Handle field is required';
  }
  if (Validator.isEmpty(data.year)) {
    errors.year = 'Handle field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}