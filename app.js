const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const ShortUrl = require("./models/url");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const publicPath = path.join(__dirname, "public");
require("dotenv").config();
const User = require("./models/user");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore(
  {
    uri: process.env.MONGODB_URL,
    collection: "sessions",
  },
  (error) => {
    if (error) {
      console.log("Error initialising mongodb store");
    } else {
      console.log("Mongodb store set up successfully");
    }
  }
);

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(publicPath));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("No user found: ", err);
    });
});

app.use(userRoutes);
app.use("/auth", authRoutes);

app.get("/", async (req, res, next) => {
  let shortUrls = [];
  let name;
  if (req.user) {
    name = req.user.name;
    shortUrls = await ShortUrl.find({ userId: req.user._id });
  } else {
    shortUrls = await ShortUrl.find({ userId: undefined });
  }
  res.render("index", {
    shortUrls: shortUrls,
    isAuthenticated: req.session.isLoggedIn,
    name: name,
  });
});

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => {
    app.listen(1100, () => {
      console.log("Server is listening on port 1100");
    });
  })
  .catch((err) => {
    console.log("Error while connecting to database: ", err);
  });
