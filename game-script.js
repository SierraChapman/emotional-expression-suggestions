$("#gameSearch").on("click", function(event){
    console.log("yes");
    event.preventDefault();
    var title = $("#title").val();
    var genre = $("#genre").val()
    var firstDate = $("#firstDate").val()
    var secondDate = $("#secondDate").val()
    var genre = $("#genre").val()
    var resultsNum = $("#resultsNum").val();
    var searchBy = $("#searchBy").val();
    var queryURL = "https://api.rawg.io/api/games?&ordering=relevance"
    if (genre !== "None" || genre !== "Genre"){
        queryURL += "&genre=" + genre;
    }
    if (title !== ""){
        title = title.replace(" ", "+");
        queryURL += "&search=" + title;         
    }
    if (firstDate !== "" && secondDate !== ""){
        queryURL += "&dates=" + firstDate + "," + secondDate;
    }
    else if (firstDate !== ""){
        queryURL += "&dates=" + firstDate + ",2020-07-01";
    }
    else if (secondDate !== ""){
        queryURL += "&dates=1950-01-01," + secondDate;
    }
    if (resultsNum !== ""){
        queryURL += "&page_size=" + resultsNum;
    }
    if (searchBy == "Alphabetically(A-Z)"){
        queryURL += "&ordering=name";
    }
    else if (searchBy == "Alphabetically(Z-A)"){
        queryURL += "&ordering=-name";
    }
    else if (searchBy == "Release Date(new-old)"){
        queryURL += "&ordering=released";
    }
    else if (searchBy == "Release Date(old-new)"){
        queryURL += "&ordering=-created";
    }
    else if (searchBy == "Rating"){
        queryURL += "&ordering=created";
    }
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
            // var releaseDate = $("<p>");
            // releaseDate.text(response.results.
            div.append(gameTitle, poster, gameGenre, gamePlatforms);
            $("#results").append(div);
        }
	});

})