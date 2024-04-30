const User = require("../models/user");
const bcrypt = require("bcryptjs");
const ShortUrl = require("../models/url");

exports.getLogin = (req, res, next) => {
  console.log(req.session.isLoggedIn);
  res.render("login", {
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log("Wrong credentials");
        return res.redirect("/auth/login");
      }
      bcrypt
        .compare(password, user.password)
        .then((doMatch) => {
          if (doMatch) {
            req.session.isLoggedIn = true;
            req.session.user = user;
            return req.session.save((err) => {
              console.log(err);
              console.log("Succesfully logged in");

              console.log(`${ShortUrl.length} need to be saved`);
              //Now that we are logged in, look for urls that are not saved, and then save them.
              ShortUrl.updateMany({ userId: null }, { userId: user._id }).then(
                () => {
                  res.redirect("/");
                }
              );
            });
          } else {
            console.log("Wrong password, try again");
            return res.redirect("/auth/login");
          }
        })
        .catch((err) => {
          console.log("Something went wrong", err);
          res.redirect("/auth/login");
        });
    })
    .catch((err) => {
      console.log("User not found", err);
      res.redirect("/");
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};

exports.getSignup = (req, res, next) => {
  res.render("signup", {
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postSignup = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email })
    .then((userDoc) => {
      if (userDoc) {
        console.log("A user with this email already exists, login instead");
        return res.redirect("/auth/signup");
      }
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const user = new User({
            name: name,
            email: email,
            password: hashedPassword,
          });
          return user.save();
        })
        .then((result) => {
          console.log("User details saved successfully");
          res.redirect("/auth/login");
        });
    })
    .catch((err) => {
      console.log("Error while looking for user in database");
    });
};
