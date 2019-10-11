const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateEventInput(data) {
  let errors = {};

  data.start = !isEmpty(data.start) ? data.start : '';
  data.end = !isEmpty(data.end) ? data.end : '';
  data.subject = !isEmpty(data.subject) ? data.subject : '';
  data.title = !isEmpty(data.title) ? data.title : '';

  if (Validator.isEmpty(data.start)) {
    errors.start = 'Starting date and time is required';
  }
  if (Validator.isEmpty(data.end)) {
    errors.end = 'Ending date and time is required';
  }
  if (Validator.isEmpty(data.subject)) {
    errors.subject = 'Subject is required';
  }
  if (Validator.isEmpty(data.title)) {
    errors.title = 'Title is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  }
}