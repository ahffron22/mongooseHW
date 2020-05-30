// Require mongoose library
var mongoose = require("mongoose");

// Get the schema constructor
var Schema = mongoose.Schema;

// Use the Schema constructor to create a new IdiomSchema object
var ArticleSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  article: {
    type: String,
    required: true,
    unique: true,
  },
  link: {
    type: String,
    required: false,
  },
});

// Create model from schema using model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Idiom model
module.exports = Article;
