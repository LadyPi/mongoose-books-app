//imports mongoose for access to its capabilities
var mongoose = require("mongoose");
//mongoose is being connected to book app database to be used with mongod
mongoose.connect("mongodb://localhost/book-app");


// models are being imported here and exported out for use
// by requiring we are importing and by adding exports we are allowing for exports outside of file
module.exports.Book = require("./book.js");
module.exports.Author = require("./author.js");
