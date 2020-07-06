var buttons = false;
var nextURL = "";
var prevURL = "";
var curPage = 1;
var queryURL = "https://api.rawg.io/api/games?ordering=relevance";

function queryCall(){
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
$("#gameSearch").on("click", function(event){
    event.preventDefault();
    $("#pageTag").text("Page " + curPage);
    var title = $("#title").val();
    var genre = $("#genre").val()
    var firstDate = $("#firstDate").val()
    var secondDate = $("#secondDate").val()
    var genre = $("#genre").val()
    var resultsNum = $("#resultsNum").val();
    var searchBy = $("#searchBy").val();
    queryURL = "https://api.rawg.io/api/games?ordering=relevance";
    if (genre !== "Genre"){
        genre = genre.replace(" ", "-");
        queryURL += "&genres=" + genre.toLowerCase();
    }
    if (title !== ""){
        title = title.replace(" ", "+");
        queryURL += "&search=" + title;         
    }
    if (firstDate === "" && secondDate === ""){
        queryURL += "&dates=1950-01-01,2020-07-01";
        $("#error").text("");
    }
    else if (firstDate.length !== 10 || secondDate.length !== 10){
        $("#error").text("Please enter a valid year of the format yyyy-mm-dd");
        return;
    }
    else if (firstDate !== "" && secondDate !== ""){
        queryURL += "&dates=" + firstDate + "," + secondDate;
        $("#error").text("");
    }
    else if (firstDate !== ""){
        queryURL += "&dates=" + firstDate + ",2020-07-01";
        $("#error").text("");
    }
    else if (secondDate !== ""){
        queryURL += "&dates=1950-01-01," + secondDate;
        $("#error").text("");
    }
    else {
        queryURL += "&dates=1950-01-01,2020-07-01";
        $("#error").text("");
    }
    if (resultsNum === ""){
        resultsNum = 20;
        $("#error").text("");
    }
    else if (resultsNum > 40 || resultsNum <= 0){
        $("#error").text("Please enter a valid results number from 1-40");
        return;
    }
    else if (resultsNum !== ""){
        queryURL += "&page_size=" + resultsNum;
        $("#error").text("");
    }
    else {
        resultsNum = 20;
        $("#error").text("");
    }
    if (searchBy == "Alphabetically(A-Z)"){
        queryURL += "&ordering=name";
    }
    else if (searchBy == "Alphabetically(Z-A)"){
        queryURL += "&ordering=-name";
    }
    else if (searchBy == "Release Date(new-old)"){
        queryURL += "&ordering=-released";
    }
    else if (searchBy == "Release Date(old-new)"){
        queryURL += "&ordering=released";
    }
    else if (searchBy == "Rating"){
        queryURL += "&ordering=-rating";
    }
    console.log(queryURL);
    queryCall();
    if (buttons === false){
        var next = $("<button>");
        next.text("Next Page");
        next.attr("class", "nextPage");
        var prev = $("<button>");
        prev.text("Previous Page");
        prev.attr("class", "prevPage");
        $("#pages").append(prev, next);
        buttons = true;
    }
})

$("#pages").on("click", "button.nextPage", function(event){
    curPage += 1;
    queryURL = nextURL;
    $("#pageTag").text("Page " + curPage);
    window.scrollTo(0, 0);
    queryCall();
})

$("#pages").on("click", "button.prevPage", function(event){
    curPage -= 1;
    $("#pageTag").text("Page " + curPage);
    queryURL = prevURL;
    window.scrollTo(0, 0);
    queryCall();
});


$("#randomButton").on("click", function(event){
    event.preventDefault();
    var title = $("#title").val();
    var genre = $("#genre").val()
    var firstDate = $("#firstDate").val()
    var secondDate = $("#secondDate").val()
    var genre = $("#genre").val()
    var resultsNum = $("#resultsNum").val();
    var searchBy = $("#searchBy").val();
    queryURL = "https://api.rawg.io/api/games?ordering=relevance";
    if (genre !== "Genre"){
        genre = genre.replace(" ", "-");
        queryURL += "&genres=" + genre.toLowerCase();
    }
    if (title !== ""){
        title = title.replace(" ", "+");
        queryURL += "&search=" + title;         
    }
    if (firstDate === "" && secondDate === ""){
        queryURL += "&dates=1950-01-01,2020-07-01";
        $("#error").text("");
    }
    else if (firstDate.length !== 10 || secondDate.length !== 10){
        $("#error").text("Please enter a valid year of the format yyyy-mm-dd");
        return;
    }
    else if (firstDate !== "" && secondDate !== ""){
        queryURL += "&dates=" + firstDate + "," + secondDate;
        $("#error").text("");
    }
    else if (firstDate !== ""){
        queryURL += "&dates=" + firstDate + ",2020-07-01";
        $("#error").text("");
    }
    else if (secondDate !== ""){
        queryURL += "&dates=1950-01-01," + secondDate;
        $("#error").text("");
    }
    else {
        queryURL += "&dates=1950-01-01,2020-07-01";
        $("#error").text("");
    }
    if (resuiltsNum === ""){
        resultsNum = 20;
        $("#error").text("");
    }
    else if (resultsNum > 40 || resultsNum <= 0){
        $("#error").text("Please enter a valid results number from 1-40");
        return;
    }
    else if (resultsNum !== ""){
        queryURL += "&page_size=" + resultsNum;
        $("#error").text("");
    }
    else {
        resultsNum = 20;
        $("#error").text("");
    }
    if (searchBy == "Alphabetically(A-Z)"){
        queryURL += "&ordering=name";
    }
    else if (searchBy == "Alphabetically(Z-A)"){
        queryURL += "&ordering=-name";
    }
    else if (searchBy == "Release Date(new-old)"){
        queryURL += "&ordering=-released";
    }
    else if (searchBy == "Release Date(old-new)"){
        queryURL += "&ordering=released";
    }
    else if (searchBy == "Rating"){
        queryURL += "&ordering=-rating";
    }
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        $("#results").empty();
        console.log(response);
        var ran = Math.floor(Math.random() * response.results.length) + 1 
        var div = $("<div>");
        var gameTitle = $("<h2>");
        gameTitle.text(response.results[ran].name);
        var poster = $("<img>");
        poster.css("width", "500px");
        poster.attr("src", response.results[ran].background_image);
        var gameGenre = $("<ul>");
        if(response.results[ran].genres.length > 0){
            gameGenre.text("Genres: ");
            for(var j=0; j<response.results[ran].genres.length; j++){
                var li = $("<li>");
                li.text(response.results[ran].genres[j].name);
                gameGenre.append(li);
            }
        }
        var gamePlatforms = $("<ul>");
        if(response.results[ran].platforms !== null){
            gamePlatforms.text("Platforms: ");
            for(var j=0; j<response.results[ran].platforms.length; j++){
                var li = $("<li>");
                li.text(response.results[ran].platforms[j].platform.name);
                gamePlatforms.append(li);
            }
        }
        var releaseDate = $("<p>");
        var rating = $("<p>");
        rating.text("Rating: " + response.results[ran].rating);
        releaseDate.text("Release Date: " + response.results[ran].released);
        div.append(gameTitle, poster, gameGenre, gamePlatforms, releaseDate, rating);
        $("#results").append(div);
        nextURL = response.next
        prevURL = response.previous
    });
})