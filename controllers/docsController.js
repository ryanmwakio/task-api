exports.getIndex = (req, res, next) => {
  return res.render("index", {
    url: process.env.URL,
  });
};
