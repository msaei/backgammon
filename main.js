// javascript code comes here

$(document).ready(function(){
	 audio = document.createElement("audio");
        //audio.src="https://kahimyang.com/resources/sound/click.mp3";
     audio.src="sounds/roll.wav";
     audio.volume=0.40;
     audio.autoPlay=false;
     audio.preLoad=true;       
 
        //$(".playSound").click(function() {
            
	initBoard();
	loadPos(testPos);
	startDice();

	$('#gameStatusBoard').click(function(){
		console.log("clicked");
		$.ajax({
		url: "http://m3hd1.com/getdice.php",
		type: "GET",
		error: function(xhr){
            alert("An error occured: " + xhr.status + " " + xhr.statusText);
        },
		success: function(response){
			alert(response);
			$("#gameStatusBoard").html( "die1: " + response.die1 +
				"<br> die2: " + response.die2 );


		}
	});
	});

	//throwDice();
	$('.confirm').click(function(){
		throwDice();
	});
	$('.die1').click(function(){
		setActiveDie('die1');
	});

	$('.die2').click(function(){
		setActiveDie('die2');
	});

	$('.undo').click(function(){
		retrivePosFromStack();
	});

	$('.room').click(function(){
		//roomClicked($(this).data('num'));
		var startRoom = $(this).data('num');
		var hop = (activeDie == 'die1' ? die1 : die2);
		var destRoom = startRoom + player*hop;
		checkerMoved(startRoom, destRoom);
	});

	$('#topBar').click(function(){
		roomClicked(25);
	});

	$('#bottomBar').click(function(){
		roomClicked(0);
	});

	$('.room, #topBar, #bottomBar').mouseover(function(){

		showDestRoom(this);
	});



	$('.room, #topBar, #bottomBar').mouseout(function(){

		$('.edge').css('color', 'white');
		$('#redHome').css('background', 'brown');
		$('#blueHome').css('background', 'brown');

	});

	$('#passDice').click(function(){
		var wannaPass = confirm('are you want to pass dice?');
		if (wannaPass) {
			throwDice();
		}
	});
 });

function showDestRoom(obj) {
	
	if ($(obj).attr("id") == 'topBar') {
		//topBar hoverd
	} else if ($(obj).attr("id") == 'bottomBar') {
		//bottomBar hoverd
	} else {
		//one off rooms hoverd
		var roomNumber = $(obj).data("num");
		var indicator;
		var hop = (activeDie == 'die1' ? die1 : die2);
		var destRoom = roomNumber + player*hop;
		if(moveIsPossible(roomNumber, destRoom)) {
		indicator  = '#ind' + destRoom;
		if (destRoom > 24) {$('#redHome').css('background', 'green');}
		if (destRoom < 1) {$('#blueHome').css('background', 'green');}
		//console.log(indicator);
		$(indicator).css('color', 'green');}
	}

}


function droped(event, ui) {
	var startRoom = ui.draggable.parent().parent().data('num');
	var dropRoom = $(this).data('num')
	//checkerMoved(startRoom, destRoom);
	 takePicOfElements();
	
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
		if(started + die1 * player == droped ) {
			// check if drop room blocked width opponent
			if(rooms[droped] * player > -2) {
				if(doubleDice) {
					if($('.die1').css('opacity') == 1){
						$('.die1').css('opacity',0.9);
					} else {
						picOfElements.die = die1;
						die1 = 0.1;
						setActiveDie('die2');
						$('.die1').css('opacity',0.5)
					}
				} else {
					picOfElements.die = die1;
					die1 = 0.1;
					setActiveDie('die2');
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
						picOfElements.die = -die2;
						die2 = 0.1;
						setActiveDie('die1');
						$('.die2').css('opacity',0.5)
					}
				} else {
					picOfElements.die = -die2;
					die2 = 0.1;
					setActiveDie('die1');
					$('.die2').css('opacity',0.5);
				}
				
				return true;
			}
		}
	}
	return false;
}

function compactCheckers(roomId){
	var elementId = "#room" + roomId ;

	var count = $(elementId).children().children().length;
	for(i=0; i<count; i++){
		var topVal;
		if(roomId < 13){
			topVal = -i * Math.floor(240/count) - 40;
			$(elementId ).children().find('div:eq(' + i + ')')
			.css('position', 'absolute')
			.css('top', topVal +'px')
			.css('zIndex', i);
		} else {
			topVal = i * Math.floor(240/count);
			$(elementId ).children().find('div:eq(' + i + ')')
			.css('position', 'absolute')
			.css('top', topVal +'px')
			.css('zIndex', i);
		}
	}
	//$(elementId ).children().find('div:eq(' + (count -1) + ')').html(count);
}

function regMove(started, droped, hitted) {
	
	savePosInStack(started, droped, hitted);
    
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
		if(rooms[droped]>6 || rooms[droped]<-6) {
		compactCheckers(droped);}
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
	

	//console.log(rooms);
}

function dropedToHome(event, ui) {
	var startRoom = ui.draggable.parent().parent().data('num');
	var dropRoom = $(this).attr('id');
	takePicOfElements();

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

	savePosInStack(startRoom, (player==1 ? 26 : 27), false);
	//alert(positionStack[0].posArr);
	rooms[startRoom] = rooms[startRoom] - player;
	if (player==1) {
		rooms[26]+= 1;
		if(rooms[26] == 15) { alert("red wins!");}
	} else {
		rooms[27]-= 1;
		if(rooms[27] == -15) { alert("blue wins!");}
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

function takePicOfElements() {
	picOfElements.die1Opacity = $('.die1').css('opacity');
	picOfElements.die2Opacity = $('.die2').css('opacity');
	picOfElements.undoLeftDisplay = $('#leftArea .undo').css('display');
	picOfElements.undoRighttDisplay = $('#rightArea .undo').css('display');
	picOfElements.confirmLeftDisplay = $('#leftArea .confirm').css('display');
	picOfElements.confirmRighttDisplay = $('#rightArea .confirm').css('display');
	picOfElements.die1 = die1;
	picOfElements.die2 = die2;
	picOfElements.activeDie = activeDie;
	//console.log(picOfElements);

}

function savePosInStack(moveFrom, moveTo, heat) {
	//create json object of position from elements
	
	var posObj = {};
	posObj.movedFrom = moveFrom;
	posObj.movedTo = moveTo;
	posObj.heated = heat;
	posObj.die1Opacity = picOfElements.die1Opacity;
	posObj.die2Opacity = picOfElements.die2Opacity;
	posObj.undoLeftDisplay = picOfElements.undoLeftDisplay;
	posObj.undoRighttDisplay = picOfElements.undoRighttDisplay;
	posObj.confirmLeftDisplay = picOfElements.confirmLeftDisplay;
	posObj.confirmRighttDisplay = picOfElements.confirmRighttDisplay;
	posObj.die = picOfElements.die;
	posObj.die1 = picOfElements.die1;
	posObj.die2 = picOfElements.die2;
	posObj.activeDie = picOfElements.activeDie;

	//posObj.num = moveCounter;
	positionStack.push(posObj);
	console.log(positionStack);
	console.log(rooms);

	//push object to stack array
}

function retrivePosFromStack() {
	//pop position object from stack
	var posObj = positionStack.pop();
	//change elements according to position obj
	
	
	$('.die1').css('opacity', posObj.die1Opacity);
	$('.die2').css('opacity', posObj.die2Opacity);
	$('#leftArea .undo').css('display', posObj.undoLeftDisplay);
	$('#rightArea .undo').css('display', posObj.undoRighttDisplay);
	$('#leftArea .confirm').css('display', posObj.confirmLeftDisplay);
	$('#rightArea .confirm').css('display', posObj.confirmRighttDisplay);
	setActiveDie(posObj.activeDie);
	if(posObj.movedTo > 24){
		//put a checker back to room which started before
		addCheckerTo('red', posObj.movedFrom);
		// remove a checker from redHome
		removeCheckerFromHome('red');
	} else if (posObj.movedTo < 1) {
		//put a checker back to room which started before
		addCheckerTo('blue', posObj.movedFrom);
		//remove a checker from blue home
		removeCheckerFromHome('blue');
	} else {
	//put a checker back to room which started before
	addCheckerTo((player == 1 ? 'red' : 'blue'), posObj.movedFrom);
	//take off the last checker which moved to before
	removeCheckerFrom((player == 1 ? 'red' : 'blue'), posObj.movedTo);
	if (posObj.heated) {
		//bring back hited checker to ex place
		addCheckerTo((player == -1 ? 'red' : 'blue'), posObj.movedTo);
		if (player == 1) {
			//take the hited checker off bar
			removeCheckerFrom('blue', 25)
		}else {
			//take the hited checker off bar
			removeCheckerFrom('red', 0)
		}
	}
	}
	//loadPos(rooms);
	console.log(rooms);
	
	die1 = posObj.die1;
	die2 = posObj.die2;
	moveCounter--;

}


function dropHomeIsAllowed (fromRoom, homeId) {
	var checkerInHome = 0;

	// check if current players moving own checker
	if (rooms[fromRoom] * player > 0) {
		if(player == 1 && homeId == "redHome"){
			//check if all checker in home ready to go
			checkerInHome = 0;
			for(i=19; i<25; i++){
				if(rooms[i]>0){
				checkerInHome += rooms[i];}
			}
			checkerInHome += rooms[26];
			if(checkerInHome== 15){

				if((fromRoom + die1 * player == 25) || (isLastChecker(fromRoom) && (fromRoom + die1 > 25))) {
					if(doubleDice) {
						if($('.die1').css('opacity') == 1){
							$('.die1').css('opacity',0.9);
						} else {
							picOfElements.die = die1;
							die1 = 0.1;
							$('.die1').css('opacity',0.5)
						}
					} else {
						picOfElements.die = die1;
						die1 = 0.1;
						$('.die1').css('opacity',0.5);
					}
				return true;
			
				}

				if((fromRoom + die2 * player == 25) || (isLastChecker(fromRoom) && (fromRoom + die2 > 25))){
					if(doubleDice) {
						if($('.die2').css('opacity') == 1){
							$('.die2').css('opacity',0.9);
						} else {
							picOfElements.die = -die2;
							die2 = 0.1;
							$('.die2').css('opacity',0.5)
						}
					} else {
						picOfElements.die = -die2;
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
				if(rooms[i]<0){
				checkerInHome += rooms[i];}
			}
			checkerInHome += rooms[27];
			if(checkerInHome== -15){
				if((fromRoom + die1 * player == 0) || (isLastChecker(fromRoom) && (fromRoom - die1 < 0))){
					if(doubleDice) {
						if($('.die1').css('opacity') == 1){
							$('.die1').css('opacity',0.9);
						} else {
							picOfElements.die = die1;
							die1 = 0.1;
							$('.die1').css('opacity',0.5)
						}
					} else {
						picOfElements.die = die1;
						die1 = 0.1;
						$('.die1').css('opacity',0.5);
					}
				return true;
			
				}

				if ((fromRoom + die2 * player == 0) || (isLastChecker(fromRoom) && (fromRoom - die2 < 0))) {
					if(doubleDice) {
						if($('.die2').css('opacity') == 1){
							$('.die2').css('opacity',0.9);
						} else {
							picOfElements.die = -die2;
							die2 = 0.1;
							$('.die2').css('opacity',0.5)
						}
					} else {
						picOfElements.die = -die2;
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

function isLastChecker(roomId) {
	if (player == 1) {
		for(i=19; i<roomId; i++) {
			if (rooms[i] > 0) { return false;}
		}
	}else{
		for(i=6; i>roomId; i--) {
			if (rooms[i] < 0) { return false;}
		}
	}
	return true;
}

function undoMove() {

}

function startDice() {
	do {
	die1 = Math.floor(Math.random() * 6 + 1);
	die2 = Math.floor(Math.random() * 6 + 1);}
	while (die1 == die2);

	$('.die1').css('backgroundImage', diePics[die1]);
	$('.die2').css('backgroundImage', diePics[die2]);

	$('#rightArea .die1').show();
	$('#rightArea .die2').hide();
	$('#leftArea .die1').hide();
	$('#leftArea .die2').show();

	if (die1 > die2) {
		$("#gameStatusBoard").html('Blue starts the game!');
		player = -1;
	} else {
		$("#gameStatusBoard").html('Red starts the game!');
		player = 1;
	}
	setActiveDie((die2>die1 ? 'die2' : 'die1'));
	moveCounter = 0;
	positionStack = [];
	maxMoves = 2;
	doubleDice = false;

}

function setActiveDie(activeDieName){
	$('.die1 , .die2').removeClass('activeDie');
	if (activeDieName == 'die1' && $('.die1').css('opacity') > 0.5) {
		$('.die1').addClass('activeDie');
		activeDie = 'die1';
	} 
	if (activeDieName == 'die2' && $('.die2').css('opacity') > 0.5) {
		$('.die2').addClass('activeDie');
		activeDie = 'die2';
	}
}

function throwDice() {
	
	player = player * -1;
	moveCounter = 0;
	positionStack = [];
	//activeDie = "die1";
	die1 = Math.floor(Math.random() * 6 + 1);
	die2 = Math.floor(Math.random() * 6 + 1);
	$('.die1 , .die2').css('opacity', '1');
	setActiveDie((die2>die1 ? 'die2' : 'die1'));

	if (die1 == die2) { 
		maxMoves = 4;
		doubleDice = true;
	} else { 
		maxMoves = 2;
		doubleDice = false;
	}
	audio.play();
	$('.die1').css('backgroundImage', diePics[die1]);
	$('.die2').css('backgroundImage', diePics[die2]);
	

	$('.confirm').hide();
	$('.undo').hide();
	


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