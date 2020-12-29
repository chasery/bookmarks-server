const { expect } = require("chai");
const knex = require("knex");
const supertest = require("supertest");
const app = require("../src/app");
const { makeBookmarksArray } = require("./bookmarks-fixtures");

describe("Bookmarks Endpoint", () => {
  let db;

  before("make knex instance", () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
  });

  after("disconnect from db", () => db.destroy());

  before("clean the table", () => db("bookmarks").truncate());

  afterEach("cleanup", () => db("bookmarks").truncate());

  describe("GET /bookmarks", () => {
    context("Given there are no bookmarks", () => {
      it("should return an empty array with a 200 status", () => {
        return supertest(app)
          .get("/bookmarks")
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, []);
      });
    });
    context("Given there are bookmarks in the database", () => {
      const testBookmarks = makeBookmarksArray();

      beforeEach("insert bookmarks", () => {
        return db.into("bookmarks").insert(testBookmarks);
      });

      it("should return an array of bookmarks", () => {
        return supertest(app)
          .get("/bookmarks")
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, testBookmarks);
      });
    });
  });

  describe("GET /bookmarks/:id", () => {
    context("given no bookmarks", () => {
      it("should return a 404", () => {
        const id = 123456;
        return supertest(app)
          .get(`/bookmarks/${id}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(404, { error: { message: `Bookmark doesn't exist.` } });
      });
    });
    context("given there are bookmarks", () => {
      const testBookmarks = makeBookmarksArray();

      beforeEach("insert bookmarks", () => {
        return db.into("bookmarks").insert(testBookmarks);
      });

      it("should return a bookmark", () => {
        const id = 2;
        const expectedBookmark = testBookmarks[id - 1];
        return supertest(app)
          .get(`/bookmarks/${id}`)
          .set("Authorization", `Bearer ${process.env.API_TOKEN}`)
          .expect(200, expectedBookmark);
      });
    });
  });
});
