//importing mongoose
var mongoose = require('mongoose'),
//using mongoose to create schema
  Schema = mongoose.Schema;

//author schema creation format
var AuthorSchema = new Schema({
  name: String,
  alive: String,
  image: String
});

//author schema model creation
var Author = mongoose.model('Author', AuthorSchema);

//exporting this author's model to be used outside of this file
module.exports = Author;