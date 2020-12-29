const express = require("express");
const { v4: uuid } = require("uuid");
const { isWebUri } = require("valid-url");
const logger = require("../logger");
// const bookmarks = require("../store");
const BookmarksService = require("../bookmarks-service");

const bookmarksRouter = express.Router();
const bodyParser = express.json();

bookmarksRouter
  .route("/bookmarks")
  .get((req, res, next) => {
    // Handle request to get all bookmarks
    const knexInstance = req.app.get("db");

    BookmarksService.getAllBookmarks(knexInstance)
      .then((bookmarks) => {
        res.json(bookmarks);
      })
      .catch(next);
  })
  .post(bodyParser, (req, res) => {
    // Handle request to create a new bookmark (Title, URL, Rating, Description)
    // Req input is Title, URL, and Rating
    for (const field of ["title", "url", "rating"]) {
      if (!req.body[field]) {
        logger.error(`${field} is required`);
        return res.status(400).send(`'${field}' is required`);
      }
    }

    const { title, url, rating, description } = req.body;

    // Url validation
    if (!isWebUri(url)) {
      logger.error(`Invalid url '${url}' supplied`);
      return res.status(400).send(`'url' must be a valid URL`);
    }

    // Rating validaiton
    if (!Number.isInteger(rating) || rating < 0 || rating > 5) {
      logger.error(`Invalid rating '${rating}' supplied`);
      return res.status(400).send(`'rating' must be a number between 0 and 5`);
    }

    const bookmark = {
      id: uuid(),
      title,
      url,
      rating,
      description,
    };

    bookmarks.push(bookmark);

    logger.info(`Bookmark with id ${bookmark.id} created`);

    res
      .status(201)
      .location(`http://localhost:8000/bookmarks/${bookmark.id}`)
      .json(bookmark);
  });

bookmarksRouter
  .route("/bookmarks/:id")
  .get((req, res, next) => {
    // Handle request to get given boomark
    const knexInstance = req.app.get("db");

    BookmarksService.getBookmarkById(knexInstance, req.params.id)
      .then((bookmark) => {
        if (!bookmark) {
          return res.status(404).json({
            error: { message: "Bookmark doesn't exist." },
          });
        }
        res.json(bookmark);
      })
      .catch(next);
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
