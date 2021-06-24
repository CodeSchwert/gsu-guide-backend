const Availability = require('../models/availabilitySchema');

/**
 * Project a mongoose availability document to a POJO with correct properties.
 * @param {Object} event a mongoose document object
 * @returns {Object} POJO with projected event id and no __v property
 */
const projectEvent = (event) => {
  if (!event) {
    throw new Error('Availability event required.');
  }
  if (!event._doc) {
    throw new Error('event must be a mongoose document object.');
  }

  const projection = { id: event._id, ...event._doc };
  delete projection._id;
  delete projection.__v;

  return projection;
};

const getAvailability = async () => {
  try {
    const availabilities = await Availability.find({});

    const results = availabilities.map(a => projectEvent(a));

    return results;

  } catch (e) {
    console.error(e);
    throw e;
  }
};

const addAvailability = async (event) => {
  try {
    if (!event) {
      throw new Error('Availability event required.');
    }

    const newEvent = await Availability.create(event);
    const results = projectEvent(newEvent);

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

    const updatedEvent = await Availability.findByIdAndUpdate(id, event, {
      new: true // return the updated document
    });

    if (!updatedEvent) { // event not found
      return null;
    }

    const results = projectEvent(updatedEvent);
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
