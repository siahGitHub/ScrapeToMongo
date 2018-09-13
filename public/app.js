// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page

    $("#feeds").append('<div class="panel panel-primary">' +
      '<div class="panel-heading">' +
      '<p data-id="' + data[i]._id + '">' +
      data[i].title + '</p></div>' +
      '<button type="button" class="btn btn-success">Edit</button>' +
      '<button type="button" class="btn btn-warning">Delete</button>' +
      '<div class="panel-body"><div id="summary">'
      + data[i].summary +
      '</div></div>');
  }
});


// Whenever someone clicks a p tag
$(document).on("click", "p", function () {
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
    .then(function (data) {
      console.log(data);

      // The title of the article
      $("#notes").append(
        '<div class="panel panel-primary">' +
        '<div class="panel-heading">Add Note</div>' +
        '<div class="panel-body"><div id="summary">' +
        '<input id="titleinput" name="title" >' +
        '<textarea id="bodyinput" name="body"></textarea>' +
        '<div><button class="btn btn-success" data-id="' + data._id + '" id="savenote">Save Note</button>' +
        '<button class="btn btn-danger" data-id="' + data._id + '" id="editnote">Edit Note</button>' +
        '</div></div></div>');


      // If there's a note in the article
      if (data.note) {
        // Place the title of the note in the title input
        $("#titleinput").val(data.note.title);
        $("#titleinput").prop("disabled", true);
        // Place the body of the note in the body textarea
        $("#bodyinput").val(data.note.body);
        $("#bodyinput").prop("disabled", true);
      }
    });
});

//When you click editnote button
$(document).on("click", "#editnote", function () {
  $("#titleinput").prop("disabled", false);
  $("#bodyinput").prop("disabled", false);
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
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
    .then(function (data) {
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
$(document).on("click", "#scrape", function () {
  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
    // With that done
    .then(function (data) {
      // Log the response
      $(".scrape-modal").append("<p>" + data + "</p>")
      console.log(data);
    });
});