"use strict";
const express = require("express");
const router = express.Router();

const menucontroller = require("../controllers/menu.controller");

router.get("/all", ensureAuth, menucontroller.getAll);
router.get("/category/:category", ensureAuth, menucontroller.getAllByCategory);
router.get("/item/:id", ensureAuth, menucontroller.getOneById);
router.post("/new", ensureAuth, menucontroller.createNew);
router.get("/search", ensureAuth, menucontroller.searchByName);
router.delete("/delete/:id", ensureAuth, menucontroller.deleteById);
router.put("/update/:id", ensureAuth, menucontroller.update)


function ensureAuth(req, res, next) {
 req.session.returnTo = req.originalUrl;
  if (!req.isAuthenticated()) {
    return res.redirect('/auth/login');
  }
  //console.log("$$$$$" + req.session.returnTo)
  next();
}

module.exports = router;
