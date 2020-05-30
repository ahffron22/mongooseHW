var express = require("express");
var mongojs = require("mongojs");
var axios = require("axios");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var app = express();
var logger = require("morgan");

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

var databaseUrl = "articleScraper";
var collections = ["scrapedArticles"];

var MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/scrapedArticles";

mongoose.connect(MONGODB_URI);

var db = mongojs(databaseUrl, collections);

db.on("error", function (error) {
  console.log("Database Error:", error);
});

axios.get("https://old.reddit.com/r/webdev").then(function (response) {
  var $ = cheerio.load(response.data);

  $("p.title").each(function (i, element) {
    var title = $(element).text();

    var link = $(element).children().attr("href");

    if (title && link) {
      // Insert the data in the scrapedData db
      db.scrapedArticles.insert(
        {
          title: title,
          link: link,
        },
        function (err, inserted) {
          if (err) {
            // Log the error if one is encountered during the query
            console.log(err);
          } else {
            // Otherwise, log the inserted data
            console.log(inserted);
          }
        }
      );
    }
  });
});
app.get("/all", function (req, res) {
  // Query: In our database, go to the animals collection, then "find" everything
  db.scrapedArticles.find().limit(10, function (error, found) {
    // Log any errors if the server encounters one
    if (error) {
      console.log(error);
    }
    // Otherwise, send the result of this query to the browser
    else {
      res.json(found);
    }
  });
});

// Listen on port 3000
app.listen(3000, function () {
  console.log("App running on port 3000!");
});
