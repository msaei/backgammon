$(document).ready(function(){
	$('#test').click(function(){
		console.log("clicked");
		$.ajax({
		url: "getdice.php",
		type: "GET",
		error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
		success: function(response){
			//alert(response);
			console.log( "die1: " + response.die1 +
				"<br> die2: " + response.die2 );


		}
	});

});
});