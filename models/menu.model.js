"use strict";
const db = require("../models/db-conn");
const path = require("path");

function getAll() {
  let sql = "SELECT * FROM menu;";
  const data = db.all(sql);
  return data;
};

function getAllByCategory(category) {
  let sql = "SELECT * FROM menu WHERE category =? ORDER BY name;";
  const data = db.all(sql, category);
  return data;
};

function getOneById(id) {
  let sql = "SELECT * FROM MENU WHERE id =? ;";
  const item = db.get(sql, id);
  return item;
};

function createNew(params) {
  let sql =
    'INSERT INTO menu ("id","name","category","subcategory","price","cost") ' +
    "VALUES(?, ?, ?, ?, ?, ?);";
  const item = db.run(sql, params);
  return item;
};

function search(params) {
  let sql = 'SELECT * FROM menu WHERE name LIKE ?;';
  let menu = db.all(sql, params);
  return menu;
};

function deleteById(id) {
  let sql = 'DELETE FROM MENU WHERE id =?';
  const response = db.run(sql, id);
  return response;
};

function update(params) {
  let sql = 'UPDATE menu SET name =?, category =?,subcategory =?,price =?,cost =? WHERE id =?;';
  const response = db.run(sql, params);
  return response;
};



module.exports = {
  getAll,
  getAllByCategory,
  getOneById,
  createNew,
  search,
  deleteById,
  update,
};
