const { Router } = require('express');
const moment = require('moment-timezone');

/**
 * Check the event time period is within an acceptable time period, 7am-10pm
 * @param {Object} event
 * @returns {Boolean}
 */
const isValidTimePeriod = (event) => {
  const { start, end, timezone } = event;
  const startDateTime = moment(start).tz(timezone);
  const endDateTime = moment(end).tz(timezone);

  // time must be 7am-10pm on the same day!
  if (startDateTime.date() !== endDateTime.date()) {
    return false;
  }
  // check the time is valid - 7am-10pm
  if (startDateTime.hour() < 7 || endDateTime.hour() > 10) {
    return false;
  }

  return true;
};

const availabilityRouter = (dataRepo) => {
  const router = Router();

  router.get('/', async (req, res) => {
    try {
      const availabilityEvents = await dataRepo.getAvailability();

      return res.status(200).json(availabilityEvents);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  router.post('/', async (req, res, next) => {
    try {
      const event = req.body;

      if (!event) {
        return res
          .status(400)
          .json({ error: 'Availability event object required.' });
      }

      // check times are between 7am-10pm
      const validTime = isValidTimePeriod(event);

      if (!validTime) {
        return res
          .status(400)
          .json({ error: 'Availability must be between 7am-10pm.' });
      }

      const newEvent = await dataRepo.addAvailability(event);

      return res.status(201).json(newEvent);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  router.patch('/:id', async (req, res, next) => {
    try {
      const event = req.body;
      const { id } = req.params;

      if (!event) {
        return res
          .status(400)
          .json({ error: 'Availability event object required.' });
      }
      if (!id) {
        return res
          .status(400)
          .json({ error: 'Availability event id required.' });
      }

      // check times are between 7am-10pm
      const validTime = isValidTimePeriod(event);

      if (!validTime) {
        return res
          .status(400)
          .json({ error: 'Availability must be between 7am-10pm.' });
      }

      const updatedEvent = await dataRepo.updateAvailability(id, event);

      return res.status(200).json(updatedEvent);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res
          .status(400)
          .json({ error: 'Availability event id required.' });
      }

      const deletedEvent = await dataRepo.deleteAvailability(id);

      if (deletedEvent) {
        return res.status(200).json({ success: 'Availability event deleted.' });
      } else {
        return res.status(204).end();
      }
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  return router;
};

module.exports = availabilityRouter;
