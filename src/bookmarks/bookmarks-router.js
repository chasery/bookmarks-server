const express = require("express");
const { v4: uuid } = require("uuid");
const logger = require("../logger");

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route("/bookmarks")
  .get((req, res) => {
    // Handle request to get all bookmarks
  })
  .post(bodyParser, (req, res) => {
    // Handle request to create a new bookmark
  });

bookmarksRouter
  .route("/bookmarks/:id")
  .get((req, res) => {
    // Handle request to get given boomark
  })
  .delete(bodyParser, (req, res) => {
    // Handle request to delete given bookmark
  });

module.exports = bookmarksRouter;
