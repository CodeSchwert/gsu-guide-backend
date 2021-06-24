const BaseJoi = require('joi');
const JoiTimezone = require('joi-tz');

const Joi = BaseJoi.extend(JoiTimezone);

const schema = Joi.object({
  id: Joi.string(),

  title: Joi.string()
    .required()
    .error(new Error('Availability Title is required.')),

  start: Joi.date()
    .iso()
    .required()
    .error(
      new Error('Availability start time must be an ISO 8601 date format.')
    ),

  end: Joi.date()
    .iso()
    .required()
    .error(new Error('Availability end time must be an ISO 8601 date format.')),

  timezone: Joi.timezone()
    .required()
    .error(new Error('Availability timezone must be a valid timezone.'))
});

module.exports = schema;
