// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var request = require("request");
var cheerio = require("cheerio");

// Require all models
var db = require("../models");

module.exports = function (app) {
  // A GET route for scraping the echoJS website
  app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with request
    //request("http://www.echojs.com/", function(error, response, html) {
    request("https://www.nytimes.com/", function (error, response, html) {
      // Then, we load that into cheerio and save it to $ for a shorthand selector
      var $ = cheerio.load(html);

      // Now, we grab every h2 within an article tag, and do the following:
      $("article div div a div").each(function (i, element) {
        // Save an empty result object
        //var $ref = $(this).parent().attr("href");
        var $h2 = $(this).children("h2");
        var p1Text = $h2.parent().parent().next().children("p").text();
        var p2Text = $h2.parent().next("p").text();
        var h2Text = $h2.text();
        var $ref = $h2.parent().parent().attr("href");

        if (h2Text) {

          if (p1Text || p2Text) {

            var result = {};
            result.title = h2Text;
            if (p1Text) result.summary = p1Text;
            if (p2Text) result.summary = p2Text;
            if ($ref) result.link = $ref;
            console.log(result);
          };
        };

        // Create a new Article using the `result` object built from scraping

        db.Article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            return res.json(err);
          });

      });

      // If we were able to successfully scrape and save an Article, send a message to the client
      res.send("Scrape Complete");
    });
  });
  
  app.get("/", function(req, res) {
    res.render("index");
  });
  
};
