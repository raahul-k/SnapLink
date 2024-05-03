const ShortUrl = require("../models/url");
const User = require("../models/user");

exports.getResult = async (req, res, next) => {
  if (req.user) {
    await ShortUrl.create({ fullUrl: req.body.fullUrl, urlId: req.user._id });
  } else {
    await ShortUrl.create({ fullUrl: req.body.fullUrl, urlId: req.sessionID });
  }

  res.redirect("/");
};

exports.deleteUrl = async (req, res, next) => {
  const id = req.body.id;
  await ShortUrl.deleteOne({ _id: id });
  res.redirect("/");
};

exports.getOriginalUrl = async (req, res, next) => {
  const id = req.params.id;
  const result = await ShortUrl.findOne({
    shortUrl: `snaplink.vercel.app/${id}`,
  });

  if (result) {
    res.redirect(result.fullUrl);
  } else {
    res.status(404).send("404 not found");
  }
};
