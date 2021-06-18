const errorHandler = (err, req, res, next) => {
  const error = err.message ? err.message : "Something broke!";

  console.error("errorHandler", error);

  return res.status(500).json({ error });
};

module.exports = errorHandler;
