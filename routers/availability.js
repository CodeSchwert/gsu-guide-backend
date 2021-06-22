const { Router } = require('express');

const availabilityRouter = (dataRepo) => {
  const router = Router();

  router.get('/', async (req, res) => {
    try {
      const availabilityEvents = await dataRepo.getAvailability();

      console.log(availabilityEvents); // delete me!

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

      // TODO -- check times are between 7am-10pm

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

      // TODO -- check times are between 7am-10pm

      const updatedEvent = await dataRepo.updateAvailability(id, event);

      return res.status(200).json(updatedEvent);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  return router;
};

module.exports = availabilityRouter;
