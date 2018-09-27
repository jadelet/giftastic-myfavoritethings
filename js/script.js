var topics = ["Chuck Bartowski", "Sarah Walker", "John Casey", "Morgan Grimes", "Bryce Larkin", "Lester Patel", ];
var state = $(this).attr("data-state");
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

          console.log(results[i]);

          var thingImg = $("<img>");    
          thingImg.attr("src", results[i].images.fixed_height_still.url);
          thingImg.attr("data-still", results[i].images.fixed_height_still.url);
          thingImg.attr("data-animate", results[i].images.fixed_height.url);
          thingImg.attr("data-state", "still");
          thingImg.addClass("gif");
        

          thingDiv.append(p);
          thingDiv.append(thingImg);

          $("#gifs-appear-here").prepend(thingDiv);
        

          $(".gif").on("click", function() {
            var state = $(this).attr("data-state");
            
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
          })
        }
      }  
      
    });
}
 