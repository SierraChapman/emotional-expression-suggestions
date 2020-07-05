var buttons = false;
var nextURL = "";
var prevURL = "";
var queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=ed2eb23526f1f24fbea2ca4d8a1e10fc&language=en-US&include_adult=false&page=1";

function querySearch(){
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#results").empty();
        console.log(response);
        for(var i=0; i<response.results.length; i++){ 
            var div = $("<div>");
            var gameTitle = $("<h2>");
            gameTitle.text(response.results[i].name);
            var poster = $("<img>");
            poster.css("width", "200px");
            poster.attr("src", response.results[i].background_image);
            var gameGenre = $("<ul>");
            if(response.results[i].genres.length > 0){
                gameGenre.text("Genres: ");
                for(var j=0; j<response.results[i].genres.length; j++){
                    var li = $("<li>");
                    li.text(response.results[i].genres[j].name);
                    gameGenre.append(li);
                }
            }
            var gamePlatforms = $("<ul>");
            if(response.results[i].platforms !== null){
                gamePlatforms.text("Platforms: ");
                for(var j=0; j<response.results[i].platforms.length; j++){
                    var li = $("<li>");
                    li.text(response.results[i].platforms[j].platform.name);
                    gamePlatforms.append(li);
                }
            }
            var releaseDate = $("<p>");
            var rating = $("<p>");
            rating.text("Rating: " + response.results[i].rating);
            releaseDate.text("Release Date: " + response.results[i].released);
            div.append(gameTitle, poster, gameGenre, gamePlatforms, releaseDate, rating);
            $("#results").append(div);
        }
        nextURL = response.next
        prevURL = response.previous
    });
}

$("#movieSearch").on("click", function(event) {
    event.preventDefault();
    var year = $("#year").val()
    var genre = $("#genre").attr("value");
    console.log(genre);
    var searchBy = $("#searchBy").val();
    queryURL = "https://api.themoviedb.org/3/discover/movie?api_key=ed2eb23526f1f24fbea2ca4d8a1e10fc&language=en-US&include_adult=false&page=1";
    if (genre !== "Genre"){
        queryURL += "&with_genres=" + genre;
    }
    if(year !== ""){
        queryURL += "&year=" + year;
    }
    if (searchBy == "Alphabetically(A-Z)"){
        queryURL += "&sort_by=original_title.asc";
    }
    else if (searchBy == "Alphabetically(Z-A)"){
        queryURL += "&sort_by=original_title.desc";
    }
    else if (searchBy == "Release Date(new-old)"){
        queryURL += "&sort_by=primary_release_date.desc";
    }
    else if (searchBy == "Release Date(old-new)"){
        queryURL += "&sort_by=primary_release_date.asc";
    }
    else if (searchBy == "Revenue"){
        queryURL += "&sort_by=revenue.desc";
    }
    querySearch();
  });

$("#movieTitleSearch").on("click", function(event){
    event.preventDefault();
    var title = $("#title").val();
    $.ajax({
        url: "https://www.omdbapi.com/?t=" + title  +"&y=&plot=short&apikey=trilogy",
        method: "GET"
    }).then(function(response) {
        var title = $("<h2>");
        var poster = $("<img>");
        var plot = $("<p>");
        poster.attr("src", response.Poster);
        title.text(response.Title);
        plot.text(response.Plot);
        $("#results").append(title, poster, plot);
    });
})
