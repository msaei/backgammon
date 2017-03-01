// javascript code comes here

$( init );

function init() {

	$('.checker').draggable({
		revert: true

	});

	$(".room").droppable({ 
		accept: '.checker',
		hoverClass: 'hoverd'
	});
}