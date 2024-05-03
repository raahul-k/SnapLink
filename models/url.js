const mongoose = require("mongoose");
const crypto = require("crypto");
const User = require("../models/user");

const generateRandomString = (length) => {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") // convert to hexadecimal format
    .slice(0, length); // return desired length
};

const urlSchema = new mongoose.Schema({
  urlId: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  fullUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    default: function () {
      return `snaplink.vercel.app/${generateRandomString(6)}`;
    },
  },
});

module.exports = mongoose.model("Shorturl", urlSchema);
