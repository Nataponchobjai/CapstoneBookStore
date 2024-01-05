let db = require("./db")

let listBooks = function(req, res) {
  let sql = "SELECT BookID, BookTitle FROM Books";
  db.query(sql, function(error, results) {
    if (error) {
      console.error("Failed to get entries:", error);
      res.sendStatus(500);
    } else {
      res.json(results);
    }
  });
};


let showBook = function(req, res) {
  let BookID = req.params.id;
  let sql = "SELECT * FROM Books WHERE BookID = ?";
  let params = [BookID];

  db.query(sql, params, function(error, results) {
    if (error) {
      console.error("Could not fetch entry", error);
      res.sendStatus(500);
    } else if (results.length == 0) {
      console.error("Book not found for id:", BookID);
      res.sendStatus(404);
    } else if (results.length > 1) {
      console.error("Fetched more than 1 results for id", BookID);
      res.sendStatus(500);
    } else {
      res.json(results[0]);
    }
  });
};


let createBook = function(req, res) {
  let title = req.body.BookTitle;
  let sql = 'INSERT INTO Books (BookTitle) VALUE (?)';
  let params = [title];

  db.query(sql, params, function(error, results) {
    if (error) {
      console.error("Couldn't add entry to the database", error);
      console.log("results are", results);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};


let updateBook = function(req, res) {
  let BookID = req.params.id;
  let title = req.body.BookTitle;
  let sql = "UPDATE Books SET BookTitle = ? WHERE BookID = ?";
  let params = [title, BookID];
  db.query(sql, params, function(error, result) {
    if (error) {
      console.error("Couldn't update book", error);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};


let deleteBook = function(req, res) {
  let BookID = req.params.id;
  let sql = "DELETE FROM Books WHERE BookID = ?";
  let params = [BookID];
  db.query(sql, params, function(error, result) {
    if (error) {
      console.error("Could not delete entry", error);
      res.sendStatus(500);
    } else {
      res.sendStatus(204);
    }
  });
};


let addGenres = function(req, res) {};
let updateGenres = function(req, res) {};

module.exports = {
  listBooks,
  showBook,
  createBook,
  updateBook,
  deleteBook,
  addGenres,
  updateGenres
};

