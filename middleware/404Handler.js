const handler = (req, res) => {
  return res.status(404).json({ error: `URL ${req.baseUrl} not found` });
};

module.exports = handler;
