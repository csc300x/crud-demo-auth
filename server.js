"use strict";
const express = require("express");
const app = express();
const path = require("path");
const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//auth
const session = require('express-session');
const passport = require('passport');
require("./auth/passport");
app.use(session({
  secret: 'secret_key',
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth', require('./auth/auth.route'));

//views
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

//routes
const menuRouter = require("./routes/menu.route");
app.use("/menu", menuRouter);


//Home Page
app.get("/", (req, res) => {
  req.session.returnTo = req.originalUrl;
  res.render("index", { title: 'Home Page', user: req.user });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log("App listening at http://localhost:" + PORT);
});
