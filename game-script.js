$("#gameSearch").on("click", function(event){
    var dates = ("#title").val();
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