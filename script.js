$("#movie-search-button").on("click", function(event){
    var title = ("#movie-search").val();
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
        $("#div").append(title);
        $("#div").append(poster);
        $("#div").append(plot);
    });
    })

$("#game-search-button").on("click", function(event){
    var dates = ("#game-dates").val();
    if (("#genres").val() !== ""){
        $.ajax({
            url: "https://api.rawg.io/api/genres?ordering=-added",
            method: "GET"
        }).then(function(response) {
            console.log(response);
        });
    }
    
    $.ajax({
        url: "https://api.rawg.io/api/games?dates=" + dates + "&ordering=-added",
        method: "GET"
    }).then(function(response) {
		console.log(response);
	});

})