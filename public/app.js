var $scrapeTerm = $("#scrapeTerm");
var savedTitle = "";
var savedLink = "";
function displayResults(scrapedArticles) {
  // First, empty the table
  $("tbody").empty();

  // Then, for each entry of that json...
  scrapedArticles.forEach(function (article) {
    // Append each of the animal's properties to the table
    var tr = $("<tr id='tableEntry'>").append(
      $("<td id='savedTitle'>").text(article.title),
      $("<td id='savedLink'>").text(article.link),
      $("<button id= 'saveBttn'>save</button>")
    );

    $("#scrapedData").append(tr);
  });
}

$(document).on("click", "#saveBttn", function () {
  savedTitle = $(this).parent("tr").text();
  var html = `<tr><td>${savedTitle}</td> <td><button id="remove">-</button></td></tr>`;
  $("#savedArticles").append(html);
});

$.getJSON("/all", function (data) {
  // Call our function to generate a table body
  displayResults(data);
});
