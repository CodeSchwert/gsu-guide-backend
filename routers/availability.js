const { Router } = require('express');
const data = require('../mockData/db.json');

const availabilityRouter = (dataRepo) => {
  const router = Router();

  router.get('/', async (req, res) => {
    const availabilityEvents = await dataRepo.getAvailability();
    console.log(availabilityEvents);
    return res.status(200).json(availabilityEvents);
  });

  router.post('/', async (req, res, next) => {
    try {
      const event = req.body;

      if (!event) {
        return res
          .status(400)
          .json({ error: 'Availability event object required.' });
      }

      const newEvent = await dataRepo.addAvailability(event);

      return res.status(201).json(newEvent);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  router.patch('/:id', (req, res) => {
    return res.status(200).json({
      params: req.params,
      body: req.body
    });
  });

  return router;
};

module.exports = availabilityRouter;
