const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
function getBooks() {
  return new Promise((resolve, reject) => {
    resolve(books);
  });
}

public_users.get('/',function (req, res) {
  getBooks().then((books) => res.send(books));
});

// Get book details based on ISBN
function getByISBN(isbn) {
  return new Promise((resolve, reject) => {
    let isbnNum = parseInt(isbn);
    if (books[isbnNum]) {
      resolve(books[isbnNum]);
    } else {
      reject({status:404, message:`ISBN ${isbn} not found`});
    }
  })
}

public_users.get('/isbn/:isbn', function (req, res) {
  getByISBN(req.params.isbn)
      .then(
          result => res.send(result),
          error => res.status(error.status).json({message: error.message})
      );
});
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    getBooks()
    .then((bookEntries) => Object.values(bookEntries))
    .then((books) => books.filter((book) => book.author === author))
    .then((filteredBooks) => res.send(filteredBooks));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  
  return res.status(300).json({message: "Yet to be implemented"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.general = public_users;
