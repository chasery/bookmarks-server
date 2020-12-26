const express = require("express");
const { v4: uuid } = require("uuid");
const logger = require("../logger");
const bookmarks = require("../store");

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route("/bookmarks")
  .get((req, res) => {
    // Handle request to get all bookmarks
    res.json(bookmarks);
  })
  .post(bodyParser, (req, res) => {
    // Handle request to create a new bookmark
  });

bookmarksRouter
  .route("/bookmarks/:id")
  .get((req, res) => {
    // Handle request to get given boomark
    const { id } = req.params;
    const bookmark = bookmarks.find((b) => b.id == id);

    if (!bookmark) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res.status(404).send("Bookmark Not Found");
    }

    res.json(bookmark);
  })
  .delete((req, res) => {
    // Handle request to delete given bookmark
    const { id } = req.params;
    const bookmarkIndex = bookmarks.findIndex((b) => b.id == id);

    if (bookmarkIndex === -1) {
      logger.error(`Bookmark with id ${id} not found.`);
      return res.status(404).send("Not found");
    }

    bookmarks.splice(bookmarkIndex, 1);

    logger.info(`Bookmark with id ${id} deleted.`);

    res.status(204).end();
  });

module.exports = bookmarksRouter;
