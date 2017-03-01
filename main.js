// javascript code comes here

$( init );

function init() {

	$('.checker').draggable({
		revert: true ,
		stack: '.checker',
		helper: 'original'
	});

	$(".room").droppable({ 
		accept: '.checker',
		hoverClass: 'hoverd',
		drop: droped
	});
}

function droped(event, ui) {
	//ui.draggable.remove();
	//var newElement = ui.draggable.clone();
	var newElement = '<div class="' + ui.draggable.attr('class') + '"></div>';
	ui.draggable.remove();
	$(this).children().append(newElement);
	$('.checker').draggable({
		revert: true ,
		stack: '.checker',
		helper: 'original'
	});

}