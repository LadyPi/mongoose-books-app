// server.js
// SERVER-SIDE JAVASCRIPT

//require express in our app
var express = require('express');
 bodyParser = require('body-parser');
 var db = require('./models');

// generate a new express app and call it 'app'
var app = express();

// serve static files in public
app.use(express.static('public'));

// body parser config to accept our datatypes
app.use(bodyParser.urlencoded({ extended: true }));

// define a root route: localhost:3000/
app.get('/', function (req, res) {
 res.sendFile('views/index.html' , { root : __dirname});
});

// get all books
app.get('/api/books', function (req, res) {
 // send all books as JSON response
 db.Book.find()
   // populate fills in the author id with all the author data
   .populate('author')
   .exec(function(err, books){
     if (err) { return console.log("index error: " + err); }
     res.json(books);
   });
});

// // get one book
// app.get('/api/books/:id', function (req, res) {
//   // find one book by its id
//   db.Book.findById(req.params.id, function(err, book){
//     if (err) { return console.log("show error: " + err); }
//     res.json(book);
//   });
// });

// create new book
app.post('/api/books', function (req, res) {
 // create new book with form data (`req.body`)
 var newBook = new db.Book({
   title: req.body.title,
   image: req.body.image,
   releaseDate: req.body.releaseDate,
 });


// // delete book
// app.delete('/api/books/:id', function (req, res) {
//   // get book id from url params (`req.params`)
//   console.log(req.params)
//   var bookId = req.params.id;

//   db.Book.findOneAndRemove({ _id: bookId }, function (err, deletedBook) {
//     res.json(deletedBook);
//   });
// });

// adds author to a book if author already exists
 db.Author.findOne({name: req.body.author}, function(err, author){
   newBook.author = author;
   // anew book to database
   newBook.save(function(err, book){
     if (err) {
       return console.log("create error: " + err);
     }
     console.log("created ", book.title);
     res.json(book);
   });
 });

});


//characters route
// Create a character associated with a book
  app.post('/api/books/:book_id/characters', function (req, res) {
    // Get book id from url params (`req.params`)
    var bookId = req.params.book_id;
    db.Book.findById(bookId)
      .populate('author') // Reference to author
      // now we can worry about saving that character
      .exec(function(err, foundBook) {
        console.log(foundBook);
        if (err) {
          res.status(500).json({error: err.message});
        } else if (foundBook === null) {
          // Is this the same as checking if the foundBook is undefined?
          res.status(404).json({error: "No Book found by this ID"});
        } else {
          // push character into characters array
          foundBook.characters.push(req.body);
          // save the book with the new character
          foundBook.save();
          res.status(201).json(foundBook);
        }
      }
    );
  });








app.listen(process.env.PORT || 3000, function () {
 console.log('Example app listening at http://localhost:3000/');
});