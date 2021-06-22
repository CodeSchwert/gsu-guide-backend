const { Router } = require('express');
const data = require('../mockData/db.json');

const availabilityRouter = (dataRepo) => {
  const router = Router();

  router.get('/', async (req, res) => {
    // const availabilityEvents = await dataRepo.getAvailability(); -- from the future uwu
    return res.status(200).json(data.availability);
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
