const mongoose = require('mongoose');
const Availability = require('../models/availabilitySchema');

const getAvailability = async () => {
  try {
    const pipeline = [
      { $match: {} },                   // match/find all documents
      { $addFields: { id: '$_id' } },   // alias id field from _id
      { $project: { _id: 0, __v: 0 } }  // don't return _id or __v
    ];

    const results = await Availability.aggregate(pipeline);

    return results;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

module.exports = {
  getAvailability
};
