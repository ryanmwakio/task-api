exports.serverError = (req, res, next) => {
  res.status(500).json({
    state: "error",
    message: "sorry server error,we are working on it",
  });
};
