// javascript code comes here

$( init );

function init() {

	$('.checker').draggable({
		revert: true ,
		stack: '.checker'
	});

	$(".room").droppable({ 
		accept: '.checker',
		hoverClass: 'hoverd'
	});
}