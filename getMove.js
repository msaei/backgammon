function getRandomQuote(){
	
	$.ajax({
		url: "http://api.forismatic.com/api/1.0/",
		dataType: "jsonp",
		data: "method=getQuote&format=jsonp&lang=en&jsonp=?",
		success: function(response){
			//alert(response.quoteText);
			$("#quote").html( response.quoteText +
				"<br> \- " + response.quoteAuthor + "</p>");


		}
	});

}

$(document).ready(function(){
	getRandomQuote();
});
