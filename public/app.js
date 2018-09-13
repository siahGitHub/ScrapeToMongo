// Grab the articles as a json
$.getJSON("/articles", function(data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page
    //$("#articles").append("<p data-id='" + data[i]._id + "'>" + data[i].title + "<br />" + data[i].summary + data[i].link + "</p>");
    //$("#title").append("<p>" + data[i].title+ "</p>");
    //$("#summary").append("<p data-id='" + data[i]._id + "'>" + data[i].summary+ "</p>");
    $("#feeds").append('<div class="panel panel-primary">'+
    //'<div class="panel-heading"><div id="title">'+
    '<div class="panel-heading">'+
    '<p data-id="' + data[i]._id + '">' +
    data[i].title+'</p></div>'+
    '<button type="button" class="btn btn-success">Edit</button>'+
    '<button type="button" class="btn btn-warning">Delete</button>'+
    '<div class="panel-body"><div id="summary">'
    + data[i].summary+
    '</div></div>');
    /*
    <div class="panel-heading">
        <div id="title"></div>
      </div>
      <div class="panel-body">
        <div id="summary"></div>
      </div>
    </div>
    */
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function() {
  // Empty the notes from the note section
  $("#notes").empty();
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function(data) {
      console.log(data);
      /*
      $(".note-modal").append("<h2>" + data.title + "</h2>"+
      "<input id='titleinput' name='title' >"+
      "<textarea id='bodyinput' name='body'></textarea>"+
      "<button data-id='" + data._id + "' id='savenote'>Save Note</button>"
    );*/
      // The title of the article
      $("#notes").append(
        '<div class="panel panel-primary">'+
    '<div class="panel-heading">Add Note</div>'+
    '<div class="panel-body"><div id="summary">'+
    '<input id="titleinput" name="title" >'+
    '<textarea id="bodyinput" name="body"></textarea>' +
    '<div><button class="btn btn-success" data-id="' + data._id + '" id="savenote">Save Note</button>'+
    '</div></div></div>');
      //"<h2>" + data.title + "</h2>");
      // An input to enter a new title
      //$("#notes").append("<input id='titleinput' name='title' >");
      // A textarea to add a new note body
      //$("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      // A button to submit a new note, with the id of the article saved to it
      //$("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");

      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
      }
    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function() {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function(data) {
      // Log the response
      console.log(data);
      // Empty the notes section
      $("#notes").empty();
    });

  // Also, remove the values entered in the input and textarea for note entry
  $("#titleinput").val("");
  $("#bodyinput").val("");
});

// When you click the savenote button
$(document).on("click", "#scrape", function() {
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    // With that done
    .then(function(data) {
      // Log the response
      $(".scrape-modal").append("<p>"+ data + "</p>")
      console.log(data);
    });
  });