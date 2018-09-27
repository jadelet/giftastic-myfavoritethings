var topics = ["motorcycles", "tim burton", "camping", "hiking", "fishing", "Chuck Bartowski", "Office Space", "Lord of the Rings", "pianos"];

function showFavorites() {
  $("#favorites-view").empty();

  for (var i = 0; i < topics.length; i++) {

    var a = $("<button>");

    a.addClass("favorites");

    a.attr("data-name", topics[i]);

    a.text(topics[i]);

    $("#favorites-view").append(a);
  }
}


$("#add-favorites").on("click", function (event) {

  event.preventDefault();

  var favoriteInput = $("#favorites-input").val().trim();

  topics.push(favoriteInput);
  showFavorites();
  $(".favorites").on("click", callGiphy);
});

showFavorites();

$(".favorites").on("click", callGiphy);

function callGiphy() {
  console.log("Button clicked")

  var favoritesGifs = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    favoritesGifs + "&api_key=6mwldFoAeaR4pL1gvMFM0z6qKW0T6gX3&limit=10";

  $.ajax({
      url: queryURL,
      method: "GET"
    })
    .then(function (response) {
      var results = response.data;
      console.log(response)
      for (var i = 0; i < results.length; i++) {
        if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

          var thingDiv = $("<div>");

          var rating = results[i].rating;

          console.log(rating)

          var p = $("<p>").text("Rating: " + rating);

          var thingImg = $("<img>");

          thingImg.attr("src", results[i].images.fixed_height.url);

          thingDiv.append(p);
          thingDiv.append(thingImg);

          $("#gifs-appear-here").prepend(thingDiv);
          showFavorites();
        }
      }
    });
}