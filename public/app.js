function displayResults(scrapedArticles) {
  $("tbody").empty();

  scrapedArticles.forEach(function (article) {
    var tr = $("<tr>").append(
      $("<td>").text(article.title),
      $("<td>").text(article.link)
    );

    $("tbody").append(tr);
  });
}

function setActive(selector) {
  $("th").removeClass("active");
  $(selector).addClass("active");
}

// 1: On Load
// ==========

// $.getJSON("/all", function (data) {
//   displayResults(data);
// });

// 2: Button Interactions
// ======================

// $("#savedArticlesBttn").on("click", function () {
//   $.getJSON("/savedArticles", function (data) {
//     displayResults(data);
//   });
// });

// $("#name-sort").on("click", function () {
//   setActive("#animal-name");

//   $.getJSON("/name", function (data) {
//     displayResults(data);
//   });
// });
