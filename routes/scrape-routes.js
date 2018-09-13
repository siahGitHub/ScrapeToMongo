// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var request = require("request");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

module.exports = function(app) {
  // A GET route for scraping the echoJS website
app.get("/scrape", function(req, res) {
  // First, we grab the body of the html with request
  //request("http://www.echojs.com/", function(error, response, html) {
  request("https://www.nytimes.com/", function(error, response, html) {
    // Then, we load that into cheerio and save it to $ for a shorthand selector
    var $ = cheerio.load(html);

    // Now, we grab every h2 within an article tag, and do the following:
    //$("article h2").each(function(i, element) {
    $("article div div").each(function(i, element) {
      // Save an empty result object
      var result = {};

      // Add the text and href of every link, and save them as properties of the result object
      result.title = $(this)
        .children("span.balancedHeadline")
        .text();
      result.link = $(this)
        .children()
        .attr("href");
console.log(result.link);
      // Create a new Article using the `result` object built from scraping
      /*
      db.Article.create(result)
        .then(function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, send it to the client
          return res.json(err);
        });
        */
    });

    // If we were able to successfully scrape and save an Article, send a message to the client
    //res.render("index", "Scrape Complete");
    res.send("Scrape Complete");
  });
});

  // Render 404 page for any unmatched routes
  /*
  app.get("*", function(req, res) {
    res.render("404");
  });
  */
};
