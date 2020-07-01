$("#gameSearch").on("click", function(event){
    event.preventDefault();
    var title = $("#title").val();
    var genre = $("#genre").val()
    var firstDate = $("#firstDate").val()
    var secondDate = $("#secondDate").val()
    var genre = $("#genre").val()
    var queryURL = "https://api.rawg.io/api/games?ordering=-added"
    if (genre !== "None" || genre !== "Genre"){
        queryURL += "&genre=" + genre;
    }
    if (title !== ""){
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
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
		console.log(response);
	});

})