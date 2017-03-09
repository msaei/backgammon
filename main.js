// javascript code comes here
let intPos = [0, 2, 0, 0, 0, 0, -5, 0, -3, 0, 0, 0, 5, -5, 0, 0, 0, 3, 0, 5, 0, 0, 0, 0, -2, 0, 0 , 0];
let testPos = [0, 0, -3, -3, -3, -3, -3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 3, 3, 3, 3, 0, 0, 0 , 0];
var rooms = [];
var die1, die2;
var player = 1;
var moveCounter = 0;
var maxMoves = 0;
var allBlueHome = false;
var allRedHome = false;
$(document).ready(function(){
	initBoard();
	loadPos(testPos);
	throwDice();
	$('.confirm').click(function(){
		throwDice();
	});

	$('#passDice').click(function(){
		var wannaPass = confirm('are you want to pass dice?');
		if (wannaPass) {
			throwDice();
		}
	});
 });

function init() {

	initBoard();
	loadPos(rooms);

	gameFlow();
}

function gameFlow() {
	throwDice();
}

function droped(event, ui) {
	var startRoom = ui.draggable.parent().parent().data('num');
	var dropRoom = $(this).data('num')
	
	if (moveIsAlowed(startRoom, dropRoom)) {
		var hitHappened = false;
		var newElement = '<div class="' + ui.draggable.attr('class') + '"></div>';
		//alert($(this).data('num'));
		//alert(ui.draggable.parent().parent().data('num'));
		ui.draggable.remove();


		if(rooms[dropRoom] * player == -1) {
			//hit happend
			hitHappened = true;
			if (player == 1 ){
				$(this).children().children().appendTo('#topBar .bottom');
			}else {
				$(this).children().children().appendTo('#bottomBar .top');
			}
			
			
		} else {
			
		}

		$(this).children().append(newElement);
		$(this).children().children().draggable({
			revert: true ,
			stack: '.checker',
			helper: 'original'
		}); 

		regMove(startRoom, dropRoom, hitHappened);
	}

}

function moveIsAlowed(started, droped) {
	// check if right players checker moved
	if (rooms[started] * player > 0) {
		// check if die one number moved
		if(started + die1 * player == droped) {
			// check if drop room blocked width opponent
			if(rooms[droped] * player > -2) {
				if(doubleDice) {
					if($('.die1').css('opacity') == 1){
						$('.die1').css('opacity',0.9);
					} else {
						die1 = 100;
						$('.die1').css('opacity',0.5)
					}
				} else {
					die1 = 100;
					$('.die1').css('opacity',0.5);
				}
				return true;
			}
			
		}
		// check if die one number moved
		if(started + die2 * player == droped) {
			// check if drop room blocked width opponent
			if(rooms[droped] * player > -2) {
				if(doubleDice) {
					if($('.die2').css('opacity') == 1){
						$('.die2').css('opacity',0.9);
					} else {
						die2 = 100;
						$('.die2').css('opacity',0.5)
					}
				} else {
					die2 = 100;
					$('.die2').css('opacity',0.5);
				}
				
				return true;
			}
		}
	}
	return false;
}

function regMove(started, droped, hitted) {
	
	rooms[started] = rooms[started] - player;
	if(hitted) {
		rooms[droped] = player;

		if (player == 1) {
			rooms[25] = rooms[25] - player;
		}else {
			rooms[0] = rooms[0] - player;
		}
		
		
	} else {
		rooms[droped] = rooms[droped] + player;
	}
	moveCounter++;

	if (player == -1) {
		$('#rightArea .undo').show();
		if(moveCounter == maxMoves) {
			$('#rightArea .confirm').show();
		}
		
	} else {
		$('#leftArea .undo').show();
		if(moveCounter == maxMoves) {
			$('#leftArea .confirm').show();
		}
	}
	

	console.log(rooms);
}

function dropedToHome(event, ui) {
	var startRoom = ui.draggable.parent().parent().data('num');
	var dropRoom = $(this).attr('id');
	//alert(startRoom + ' to ' + dropRoom);
	if (dropHomeIsAllowed(startRoom, dropRoom)){
		var newElement = '<div class="homedChecker"></div>';
		if (ui.draggable.hasClass("red")){
			newElement = '<div class="homedChecker red"></div>';
		}
		ui.draggable.remove();
		$(this).children().append(newElement);
		regDropHome(startRoom);

	}

}

function regDropHome(startRoom) {
	rooms[startRoom] = rooms[startRoom] - player;
	if (player==1) {
		rooms[26]+= 1;
	} else {
		rooms[27]-= 1;
	}

	moveCounter++;

	if (player == -1) {
		$('#rightArea .undo').show();
		if(moveCounter == maxMoves) {
			$('#rightArea .confirm').show();
		}
		
	} else {
		$('#leftArea .undo').show();
		if(moveCounter == maxMoves) {
			$('#leftArea .confirm').show();
		}
	}
	

	console.log(rooms);

}

function dropHomeIsAllowed (fromRoom, homeId) {
	var checkerInHome = 0;

	// check if current players moving own checker
	if (rooms[fromRoom] * player > 0) {
		if(player == 1 && homeId == "redHome"){
			//check if all checker in home ready to go
			checkerInHome = 0;
			for(i=19; i<25; i++){
				checkerInHome += rooms[i];
			}
			checkerInHome += rooms[26];
			if(checkerInHome== 15){

				if(fromRoom + die1 * player == 25) {
					if(doubleDice) {
						if($('.die1').css('opacity') == 1){
							$('.die1').css('opacity',0.9);
						} else {
							die1 = 0.1;
							$('.die1').css('opacity',0.5)
						}
					} else {
						die1 = 0.1;
						$('.die1').css('opacity',0.5);
					}
				return true;
			
				}

				if(fromRoom + die2 * player == 25) {
					if(doubleDice) {
						if($('.die2').css('opacity') == 1){
							$('.die2').css('opacity',0.9);
						} else {
							die2 = 0.1;
							$('.die2').css('opacity',0.5)
						}
					} else {
						die2 = 0.1;
						$('.die2').css('opacity',0.5);
					}
				return true;
			
				}
			} 
		}

		if(player == -1 && homeId == "blueHome" ){
			//check if all checker in home ready to go

			checkerInHome = 0;
			for(i=1; i<7; i++){
				checkerInHome += rooms[i];
			}
			checkerInHome += rooms[27];
			if(checkerInHome== -15){
				if(fromRoom + die1 * player == 0) {
					if(doubleDice) {
						if($('.die1').css('opacity') == 1){
							$('.die1').css('opacity',0.9);
						} else {
							die1 = 0.1;
							$('.die1').css('opacity',0.5)
						}
					} else {
						die1 = 0.1;
						$('.die1').css('opacity',0.5);
					}
				return true;
			
				}

				if(fromRoom + die2 * player == 0) {
					if(doubleDice) {
						if($('.die2').css('opacity') == 1){
							$('.die2').css('opacity',0.9);
						} else {
							die2 = 0.1;
							$('.die2').css('opacity',0.5)
						}
					} else {
						die2 = 0.1;
						$('.die2').css('opacity',0.5);
					}
				return true;
			
				}
			} 
		}

	}
	return false;
}


function initBoard() {
	
	//top left bar add to board
	$('<div class="bar"></div>').appendTo('#gameBoard');

	//rooms 13-18 add to board
	for(i=13; i<19; i++) {
		$('<div class="room"><div class="top"></div></div>')
		.data('num', i)
		.attr('id', 'room'+i)
		.appendTo('#gameBoard');
	}

	//top middle bar add to board
	$('<div id="topBar" class="bar"><div class="bottom"></div></div>')
	.data('num', 25)
	.appendTo('#gameBoard');

	//rooms 19-24 add to board
	for(i=19; i<25; i++) {
		$('<div class="room"><div class="top"></div></div>')
		.data('num', i)
		.attr('id', 'room'+i)
		.appendTo('#gameBoard');
	}

	//top right bar add to board
	$('<div id="redHome" class="bar"><div class="top"></div></div>').appendTo('#gameBoard');

	//break div to go bottom side of board
	$('<div class="break"></div>').appendTo('#gameBoard');

	//add middle point of left bar
	$('<div class="midbar"></div>').appendTo('#gameBoard');
	//add left middle area
	$('<div id="leftArea" class="midroom"><div class="die1"></div><div class="die2"></div><div class="confirm"> Confirm </div><div class="undo"> Undo </div></div>').appendTo('#gameBoard');
	//add middle point of middle bar
	$('<div id="passDice" class="midbar"></div>').appendTo('#gameBoard');
	//add right middle area
	$('<div id="rightArea" class="midroom"><div class="die1"></div><div class="die2"></div><div class="confirm"> Confirm </div><div class="undo"> Undo </div></div>').appendTo('#gameBoard');
	//add middle point of right bar
	$('<div class="midbar"></div>').appendTo('#gameBoard');

	//break div to go bottom side of board
	$('<div class="break"></div>').appendTo('#gameBoard');

	//bottom left board add to board
	$('<div class="bar"></div>').appendTo('#gameBoard');

	//room 7-12 add board
	for(i=12; i>6; i--) {
		$('<div class="room"><div class="bottom"></div></div>')
		.data('num', i)
		.attr('id', 'room'+i)
		.appendTo('#gameBoard');
	}

	//middle bar add to board
	$('<div id="bottomBar" class="bar"><div class="top"></div></div>')
	.data('num', 0)
	.appendTo('#gameBoard');

	//room 1-6 add to board
	for(i=6; i>0; i--) {
		$('<div class="room"><div class="bottom"></div></div>')
		.data('num', i)
		.attr('id', 'room'+i)
		.appendTo('#gameBoard');
	}

	//bottom right bar add to board
	$('<div id="blueHome" class="bar"><div class="bottom"></div></div>').appendTo('#gameBoard');


	// make rooms dropable
	$(".room").droppable({ 
		accept: '.checker',
		hoverClass: 'hoverd',
		drop: droped
	});
	//make home bar dropable
	$("#blueHome, #redHome").droppable({ 
		accept: '.checker',
		hoverClass: 'hoverd',
		drop: dropedToHome
	});
}

function loadPos(posArr) {
	rooms = posArr;
	for(i=1; i<25; i++) {
		checkerCount = posArr[i];
		roomId = '#room' + i ;
		checker = (checkerCount > 0 ? '<div class="checker red"></div>' : '<div class="checker blue"></div>');
		count = (checkerCount > 0 ? checkerCount : -checkerCount);
		
		for (j=0; j < count; j++) {
				$(roomId).children().append(checker);
		}	
	}

	//make checkers draggable
	$('.checker').draggable({
		revert: true ,
		stack: '.checker',
		helper: 'original'
	});

}

function throwDice() {
	
	player = player * -1;
	moveCounter = 0;
	die1 = Math.floor(Math.random() * 6 + 1);
	die2 = Math.floor(Math.random() * 6 + 1);
	
	if (die1 == die2) { maxMoves = 4;} else { maxMoves = 2;}

	$('.die1').html(die1);
	$('.die2').html(die2);

	$('.confirm').hide();
	$('.undo').hide();
	$('.die1 , .die2').css('opacity', '1');


	if (player == -1) {
		$('#rightArea .die1').show();
		$('#rightArea .die2').show();
		$('#leftArea .die1').hide();
		$('#leftArea .die2').hide();
		
	} else {
		$('#leftArea .die1').show();
		$('#leftArea .die2').show();
		$('#rightArea .die1').hide();
		$('#rightArea .die2').hide();
	}
	

}