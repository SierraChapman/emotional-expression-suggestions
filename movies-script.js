console.log("yes");
$("#movieSearch").on("click", function(event) {
    event.preventDefault();
    var year = $("#year").val()
    var movie = $("#movie-input").val();
    var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=ed2eb23526f1f24fbea2ca4d8a1e10fc&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1";

    $.ajax({
    url: queryURL,
    method: "GET"
    }).then(function(response) {
      console.log(response)

      var p = $("<p>");
      p.text(JSON.stringify(response));
      $("#movie-view").append(p);
    });
  });