//importing mongoose
var mongoose = require('mongoose'),
//using mongoose to create schema
  Schema = mongoose.Schema;

//book schema creation format
var BookSchema = new Schema({
  title: String,
  author: {
  	type: Schema.Types.ObjectId,
  	ref: "Author",
  	characters: [String]
  // releaseDate: String
},
	image: String,
	releaseDate: String
});


//Character Schema creation format
var CharacterSchema = new Schema({
  name: String,
});




//book schema model creation
var Book = mongoose.model('Book', BookSchema);

//exporting this book's model to be used outside of this file
module.exports = Book;
