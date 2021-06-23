const Availability = require('../models/availabilitySchema');

const queryAvailability = async (query = {}) => {
  try {
    const pipeline = [
      { $match: query }, // match/find all documents
      { $addFields: { id: '$_id' } }, // alias id field from _id
      { $project: { _id: 0, __v: 0 } } // don't return _id or __v
    ];

    const results = await Availability.aggregate(pipeline);

    return results;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const getAvailability = () => {
  const results = queryAvailability();
  return results;
};

const addAvailability = async (event) => {
  try {
    if (!event) {
      throw new Error('Availability event required.');
    }

    // TODO -- Add Joi object validation on `event`

    const newEvent = await Availability.create(event);

    // TODO -- project newEvent in JS rather than make another DB query
    const results = queryAvailability({ _id: newEvent._id });

    return results;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const updateAvailability = async (id, event) => {
  try {
    if (!event) {
      throw new Error('Availability event required.');
    }
    if (!id) {
      throw new Error('Availability event id required.');
    }

    // TODO -- Add Joi object validation on `event`

    const updatedEvent = await Availability.findByIdAndUpdate(id, event, {
      new: true // return the updated document
    });

    // TODO -- project newEvent in JS rather than make another DB query
    const results = queryAvailability({ _id: updatedEvent._id });

    return results;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const deleteAvailability = async (id) => {
  try {
    if (!id) {
      throw new Error('Availability event id required.');
    }

    const deletedEvent = await Availability.findByIdAndDelete(id);

    return deletedEvent ? true : null;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  getAvailability,
  addAvailability,
  updateAvailability,
  deleteAvailability
};
