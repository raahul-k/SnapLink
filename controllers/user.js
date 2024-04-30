const ShortUrl = require("../models/url");
const User = require("../models/user");

exports.getResult = async (req, res, next) => {
  if (req.user) {
    await ShortUrl.create({ fullUrl: req.body.fullUrl, userId: req.user._id });
  } else {
    await ShortUrl.create({ fullUrl: req.body.fullUrl });
  }

  res.redirect("/");
};

exports.deleteUrl = async (req, res, next) => {
  const id = req.body.id;
  console.log("Here's your id ", id);
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