// javascript code comes here
var rooms = [0, 2, 0, 0, 0, 0, -5, 0, -3, 0, 0, 0, 5, -5, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, -2, 0];
$( init );

function init() {
	
	initBoard();


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

function initBoard() {
	
	//top left bar add to board
	$('<div class="bar"></div>').appendTo('#gameBoard');

	//rooms 13-18 add to board
	for(i=1; i<7; i++) {
		$('<div class="room"></div>').appendTo('#gameBoard');
	}

	//top middle bar add to board
	$('<div class="bar"></div>').appendTo('#gameBoard');

	//rooms 19-24 add to board
	for(i=1; i<7; i++) {
		$('<div class="room"></div>').appendTo('#gameBoard');
	}

	//top right bar add to board
	$('<div class="bar"></div>').appendTo('#gameBoard');

	//break div to go bottom side of board
	$('<div class="break"></div>').appendTo('#gameBoard');

	//bottom left board add to board
	$('<div class="bar"></div>').appendTo('#gameBoard');

	//room 7-12 add board
	for(i=1; i<7; i++) {
		$('<div class="room"></div>').appendTo('#gameBoard');
	}

	//middle bar add to board
	$('<div class="bar"></div>').appendTo('#gameBoard');

	//room 1-6 add to board
	for(i=1; i<7; i++) {
		$('<div class="room"></div>').appendTo('#gameBoard');
	}

	//bottom right bar add to board
	$('<div class="bar"></div>').appendTo('#gameBoard');
}